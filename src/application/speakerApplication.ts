import { FileName } from './../common/enum/common-enum';
import { URLUtils } from './../utils/URLUtils';
import { YAMLUtils } from '../utils/YAMLUtils';
import { SpeakerSheetService } from '../service/spreadsheet/speakerSheetService';
import { Speaker } from '../common/interface/sheet-interface';
import { Queue } from '../common/enum/common-enum';
import { BaseApplication } from './baseApplication';
/**
 * SpeakerのYAMLファイルを作成するクラス
 */
export class SpeakerApplication extends BaseApplication {
  private sheet: SpeakerSheetService;
  private keys: string[] = ['name', 'organization', 'title', 'profile_image_url', 'profile'];

  constructor() {
    super(Queue.speaker);
    this.sheet = new SpeakerSheetService();
  }

  /**
   * 作成するファイル名を返す
   */
  getFileName(): string {
    return FileName.speaker;
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Speaker[] {
    return this.sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = ['normals:'];
    const blockArray: string[] = this.sheet.allData().reduce((pre: string[], cur: Speaker) => {
      const block: { [key: string]: string } = {};
      this.keys.forEach((key: string) => {
        if (key === 'profile_image_url') {
          block[key] = URLUtils.speakerImageURL(cur.rowIdx, '.jpg');
        } else if (cur[key]) {
          block[key] = cur[key].replace(/\r?\n/g, '');
        }
      });
      pre.push(YAMLUtils.transferBlockExcludeEmptyField(this.keys, block, [YAMLUtils.indent]));
      return pre;
    }, []);
    return result.concat(blockArray).join('\n');
  }
}
