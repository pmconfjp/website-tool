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
    return sheet
      .allData()
      .filter((staff: Staff) => {
        return staff.profile_image_url;
      })
      .sort((a: Staff, b: Staff) => {
        if (a.kana <= b.kana) {
          return -1;
        } else {
          return 1;
        }
      });
  }

  /**
   * YAMLのテキストに変換する
   */
  toFileContent(): string {
    let result: string[] = ['organizers:'];
    const blockArray: string[] = this.getAll().reduce((pre: string[], cur: Staff) => {
      const name: string = cur.name;
      const organization: string = cur.organization;
      const title: string = cur.title;
      const twitter: string = cur.twitter ? cur.twitter : '';
      const github: string = cur.github ? cur.github.replace(/不要/g, '') : '';
      const facebook: string = cur.facebook ? cur.facebook : '';
      const link: string = cur.link ? cur.link : '';
      const profile_image_url: string = URLUtils.staffImageURL(cur.profile_image_url);
      const block: { [key: string]: string } = {
        name: name,
        organization: organization,
        title: title,
        twitter: twitter,
        github: github,
        facebook: facebook,
        link: link,
        profile_image_url: profile_image_url
      };
      pre.push(
        YAMLUtils.transferBlockExcludeEmptyField(Object.keys(block), block, [YAMLUtils.indent])
      );
      return pre;
    }, []);
    return result.concat(blockArray).join('\n');
  }
}
