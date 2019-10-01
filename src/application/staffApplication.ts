import { BaseApplication } from './baseApplication';
import { FileName, Queue } from './../common/enum/common-enum';
import { Staff } from '../common/interface/sheet-interface';
import { StaffSheetService } from './../service/spreadsheet/staffSheetService';
import { URLUtils } from '../utils/URLUtils';
import { YAMLUtils } from '../utils/YAMLUtils';

export class StaffApplication extends BaseApplication {
  constructor() {
    super(Queue.staff, FileName.staff);
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Staff[] {
    const sheet = new StaffSheetService();
    return sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   */
  toFileContent(): string {
    let result: string[] = ['organizers:'];
    const blockArray: string[] = this.getAll().reduce((pre: string[], cur: Staff) => {
      const block: { [key: string]: string } = {
        name: cur.name.replace(/\r?\n/g, ''),
        organization: cur.organization.replace(/\r?\n/g, ''),
        title: cur.title.replace(/\r?\n/g, ''),
        twitter: cur.twitter ? cur.twitter.replace(/\r?\n/g, '') : '',
        github: cur.github ? cur.github.replace(/\r?\n/g, '') : '',
        facebook: cur.facebook ? cur.facebook.replace(/\r?\n/g, '') : '',
        link: cur.link ? cur.link.replace(/\r?\n/g, '') : '',
        profile_image_url: URLUtils.staffImageURL(cur.profile_image_url.replace(/\r?\n/g, ''))
      };
      pre.push(
        YAMLUtils.transferBlockExcludeEmptyField(Object.keys(block), block, [YAMLUtils.indent])
      );
      return pre;
    }, []);
    return result.concat(blockArray).join('\n');
  }
}
