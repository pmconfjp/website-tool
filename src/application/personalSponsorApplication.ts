import { FileName } from './../common/enum/common-enum';
import { PersonalSponsor } from '../common/interface/sheet-interface';
import { PersonalSponsorSheetService } from './../service/spreadsheet/PersonalSponsorSheetService';
import { Queue } from '../common/enum/common-enum';
import { BaseApplication } from './baseApplication';
import { URLUtils } from '../utils/URLUtils';
import { YAMLUtils } from '../utils/YAMLUtils';
/**
 * 個人スポンサーのYAMLファイルを作成するクラス
 */
export class PersonalSponsorApplication extends BaseApplication {
  private sheet: PersonalSponsorSheetService;
  private keys: string[] = ['name', 'logo_image_url', 'url'];

  constructor() {
    super(Queue.personalSponsor);
    this.sheet = new PersonalSponsorSheetService();
  }

  /**
   * 作成するファイル名を返す
   */
  getFileName(): string {
    return FileName.personalSponsor;
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): PersonalSponsor[] {
    return this.sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = ['personals:'];
    const blockArray: string[] = this.sheet
      .allData()
      .reduce((pre: string[], cur: PersonalSponsor) => {
        const block: { [key: string]: string } = {};
        this.keys.forEach((key: string) => {
          if (key === 'logo_image_url') {
            block[key] = cur[key]
              ? cur[key].replace(/\r?\n/g, '')
              : URLUtils.personalDefaultImageURL();
          } else if (cur[key]) {
            block[key] = cur[key].replace(/\r?\n/g, '');
          }
        });
        pre.push(YAMLUtils.transferBlockIncludeEmptyField(this.keys, block, [YAMLUtils.indent]));
        return pre;
      }, []);
    return result.concat(blockArray).join('\n');
  }
}
