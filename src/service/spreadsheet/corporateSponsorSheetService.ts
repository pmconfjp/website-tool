import { PropertyKey } from './../../common/enum/common-enum';
import { CorporateSponsorColNum } from '../../common/enum/sheet-enum';
import { CorporateSponsor } from '../../common/interface/sheet-interface';
import { SheetService } from './sheetService';
/**
 * 企業スポンサーのSpreadシートを扱うためのクラス
 */
export class CorporateSponsorSheetService extends SheetService {
  constructor() {
    super(
      PropertiesService.getScriptProperties().getProperty(PropertyKey.CorporateSponsorSheetID),
      PropertiesService.getScriptProperties().getProperty(PropertyKey.CorporateSponsorSheetName)
    );
  }

  /**
   * Jobs型から string[] への変換
   * @param data CorporateSponsor
   * @returns string[]
   */
  private transform(data: CorporateSponsor): String[] {
    return [data.grade, data.name, data.logo_image_url, data.url, data.logo_image_url];
  }

  /**
   * シートからSpeakerのデータを全て返す。
   * @returns Jobs[]
   */
  allData(): CorporateSponsor[] {
    return this.getNoHeaderData()
      .filter((content: { [key: string]: any }) => {
        return content['value'][CorporateSponsorColNum.name] != '';
      })
      .map((element: { [key: string]: any }) => {
        const sponsor: CorporateSponsor = {
          rowIdx: parseInt(element['rowIdx']),
          grade: element['value'][CorporateSponsorColNum.grade],
          name: element['value'][CorporateSponsorColNum.name],
          url: element['value'][CorporateSponsorColNum.url],
          logo_image_url: ''
        };
        return sponsor;
      });
  }
}
