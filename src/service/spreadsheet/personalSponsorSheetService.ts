import { PropertyKey } from './../../common/enum/common-enum';
import { PersonalSponsorColNum } from '../../common/enum/sheet-enum';
import { PersonalSponsor } from '../../common/interface/sheet-interface';
import { SheetService } from './sheetService';
/**
 * 個人スポンサーのSpreadsheetを扱うためのクラス
 */
export class PersonalSponsorSheetService extends SheetService {
  constructor() {
    super(
      PropertiesService.getScriptProperties().getProperty(PropertyKey.PersonalSponsorSheetID),
      PropertiesService.getScriptProperties().getProperty(PropertyKey.personalSponsorSheetName)
    );
  }

  /**
   * Jobs型から string[] への変換
   * @param data CorporateSponsor
   * @returns string[]
   */
  private transform(data: PersonalSponsor): String[] {
    return [data.name, data.logo_image_url, data.url];
  }

  /**
   * シートからSpeakerのデータを全て返す。
   * @returns Jobs[]
   */
  allData(): PersonalSponsor[] {
    return this.getNoHeaderData()
      .filter((content: { [key: string]: any }) => {
        return content['value'][PersonalSponsorColNum.logoImageUrl] != '';
      })
      .map((element: { [key: string]: any }) => {
        const sponsor: PersonalSponsor = {
          rowIdx: parseInt(element['rowIdx']),
          name: element['value'][PersonalSponsorColNum.name],
          url: element['value'][PersonalSponsorColNum.url],
          logo_image_url: element['value'][PersonalSponsorColNum.logoImageUrl]
        };
        return sponsor;
      });
  }
}
