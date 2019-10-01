import { BaseApplication } from './baseApplication';
import { FileName, Queue } from './../common/enum/common-enum';
import { JobsSheetService } from './../service/spreadsheet/jobsSheetService';
import { Jobs } from '../common/interface/sheet-interface';
import { YAMLUtils } from '../utils/YAMLUtils';
/**
 * 求人情報のYAMLファイルを作成するクラス
 */
export class JobsApplication extends BaseApplication {
  constructor() {
    super(Queue.jobs, FileName.jobs);
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Jobs[] {
    const sheet = new JobsSheetService();
    return sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   */
  toFileContent(): string {
    let result: string[] = [];
    const blockArray: string[] = this.getAll().reduce((pre: string[], cur: Jobs) => {
      const block: { [key: string]: string } = {
        organization: cur.organization.replace(/\r?\n/g, ''),
        title: cur.title.replace(/\r?\n/g, ''),
        url: cur.url.replace(/\r?\n/g, '')
      };
      pre.push(YAMLUtils.transferBlockExcludeEmptyField(Object.keys(block), block, []));
      return pre;
    }, []);
    return result.concat(blockArray).join('\n');
  }
}
