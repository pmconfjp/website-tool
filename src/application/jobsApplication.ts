import { FileName } from './../common/enum/common-enum';
import { JobsSheetService } from './../service/spreadsheet/jobsSheetService';
import { Queue } from '../common/enum/common-enum';
import { BaseApplication } from './baseApplication';
import { Jobs } from '../common/interface/sheet-interface';
import { YAMLUtils } from '../utils/YAMLUtils';
/**
 * 求人情報のYAMLファイルを作成するクラス
 */
export class JobsApplication extends BaseApplication {
  private sheet: JobsSheetService;
  private keys: string[] = ['organization', 'title', 'url'];

  constructor() {
    super(Queue.jobs);
    this.sheet = new JobsSheetService();
  }

  /**
   * 作成するファイル名を返す
   */
  getFileName(): string {
    return FileName.jobs;
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Jobs[] {
    return this.sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = [];
    const blockArray: string[] = this.sheet.allData().reduce((pre: string[], cur: Jobs) => {
      const block: { [key: string]: string } = {};
      this.keys.forEach((key: string) => {
        block[key] = cur[key].replace(/\r?\n/g, '');
      });
      pre.push(YAMLUtils.transferBlockExcludeEmptyField(this.keys, block, []));
      return pre;
    }, []);
    return result.concat(blockArray).join('\n');
  }
}
