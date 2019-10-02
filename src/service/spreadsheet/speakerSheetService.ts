import { PropertyKey } from './../../common/enum/common-enum';
import { SpeakerColNum } from '../../common/enum/sheet-enum';
import { Speaker } from '../../common/interface/sheet-interface';
import { SheetService } from './sheetService';
/**
 * SpeakerのSpreadsheetを扱うためのクラス
 */
export class SpeakerSheetService extends SheetService {
  constructor() {
    super(
      PropertiesService.getScriptProperties().getProperty(PropertyKey.SpeakerSheetID),
      PropertiesService.getScriptProperties().getProperty(PropertyKey.SpeakerSheetName)
    );
  }

  /**
   * Speaker型から string[] への変換
   * @param data Speaker
   * @returns string[]
   */
  private transform(data: Speaker): String[] {
    return [data.name, data.organization, data.title, data.profile_image_url, data.profile];
  }

  /**
   * シートからSpeakerのデータを全て返す。
   * @returns Speaker[]
   */
  allData(): Speaker[] {
    return this.getNoHeaderData()
      .filter((content: { [key: string]: any }) => {
        return content['value'][SpeakerColNum.name] != '';
      })
      .map((element: { [key: string]: any }) => {
        const spealer: Speaker = {
          rowIdx: parseInt(element['rowIdx']),
          name: element['value'][SpeakerColNum.name],
          kana: element['value'][SpeakerColNum.kana],
          organization: element['value'][SpeakerColNum.organization],
          title: element['value'][SpeakerColNum.title],
          profile_image_url: element['value'][SpeakerColNum.profile_image_url],
          profile: element['value'][SpeakerColNum.profile],
          session_title: element['value'][SpeakerColNum.session_title],
          session_page: element['value'][SpeakerColNum.session_page]
        };
        return spealer;
      });
  }
}
