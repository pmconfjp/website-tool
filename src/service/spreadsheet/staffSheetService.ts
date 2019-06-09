import { PropertyKey } from './../../common/enum/common-enum';
import { Staff } from '../../common/interface/sheet-interface';
import { SheetService } from './sheetService';
import { StaffColNum } from '../../common/enum/sheet-enum';
/**
 * スタッフ情報のSpreadsheetを扱うためのクラス
 */
export class StaffSheetService extends SheetService {
  constructor() {
    super(
      PropertiesService.getScriptProperties().getProperty(PropertyKey.StaffSheetID),
      PropertiesService.getScriptProperties().getProperty(PropertyKey.StaffSheetName)
    );
  }

  /**
   * Staff型から string[] への変換
   * @param data Staff
   * @returns string[]
   */
  private transform(data: Staff): string[] {
    return [
      data.name,
      data.organization,
      data.title,
      data.twitter,
      data.github,
      data.facebook,
      data.link,
      data.profile_image_url
    ];
  }

  /**
   * シートからStaffのデータを全て返す。
   * @returns Staff[]
   */
  allData(): Staff[] {
    return this.getNoHeaderData()
      .filter((content: { [key: string]: any }) => {
        return content['value'][StaffColNum.name] != '';
      })
      .map((element: { [key: string]: any }) => {
        const staff: Staff = {
          rowIdx: parseInt(element['rowIdx']),
          name: element['value'][StaffColNum.name],
          organization: element['value'][StaffColNum.organization],
          title: element['value'][StaffColNum.title],
          twitter: element['value'][StaffColNum.twitter],
          github: element['value'][StaffColNum.github],
          facebook: element['value'][StaffColNum.facebook],
          link: element['value'][StaffColNum.link],
          profile_image_url: element['value'][StaffColNum.profile_image_url]
        };
        return staff;
      });
  }
}
