import { FileName } from './../common/enum/common-enum';
import { Queue } from '../common/enum/common-enum';
import { BaseApplication } from './baseApplication';
import { Staff } from '../common/interface/sheet-interface';
import { StaffSheetService } from './../service/spreadsheet/staffSheetService';
import { URLUtils } from '../utils/URLUtils';
import { YAMLUtils } from '../utils/YAMLUtils';

export class StaffApplication extends BaseApplication {
  private sheet: StaffSheetService;
  private keys: string[] = [
    'name',
    'organization',
    'title',
    'twitter',
    'github',
    'facebook',
    'link',
    'profile_image_url'
  ];

  constructor() {
    super(Queue.staff);
    this.sheet = new StaffSheetService();
  }

  /**
   * 作成するファイル名を返す
   */
  getFileName(): string {
    return FileName.staff;
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Staff[] {
    return this.sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = ['organizers:'];
    const blockArray: string[] = this.sheet.allData().reduce((pre: string[], cur: Staff) => {
      const block: { [key: string]: string } = {};
      this.keys.forEach((key: string) => {
        if (key === 'profile_image_url') {
          block[key] = URLUtils.staffImageURL(cur[key].replace(/\r?\n/g, ''));
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
