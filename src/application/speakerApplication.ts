import { BaseApplication } from './baseApplication';
import { FileName, Queue } from './../common/enum/common-enum';
import { URLUtils } from './../utils/URLUtils';
import { YAMLUtils } from '../utils/YAMLUtils';
import { SpeakerSheetService } from '../service/spreadsheet/speakerSheetService';
import { Speaker } from '../common/interface/sheet-interface';
/**
 * SpeakerのYAMLファイルを作成するクラス
 */
export class SpeakerApplication extends BaseApplication {
  constructor() {
    super(Queue.speaker, FileName.speaker);
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Speaker[] {
    const sheet = new SpeakerSheetService();
    return sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = ['normals:'];
    const blockArray: string[] = this.getAll().reduce((pre: string[], cur: Speaker) => {
      const block: { [key: string]: string } = {
        name: cur.name.replace(/\r?\n/g, ''),
        organization: cur.organization.replace(/\r?\n/g, ''),
        title: cur.title.replace(/\r?\n/g, ''),
        profile_image_url: URLUtils.speakerImageURL(cur.profile_image_url.replace(/\r?\n/g, '')),
        profile: cur.profile.replace(/\r?\n/g, '')
      };
      pre.push(
        YAMLUtils.transferBlockExcludeEmptyField(Object.keys(block), block, [YAMLUtils.indent])
      );
      return pre;
    }, []);
    return result.concat(blockArray).join('\n');
  }
}
