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
    return [
      data.grade,
      data.type,
      data.display_order.toString(),
      data.name1,
      data.url1,
      data.name2,
      data.url2,
      data.logo_image_url
    ];
  }

  /**
   * シートからSpeakerのデータを全て返す。
   * @returns Jobs[]
   */
  allData(): CorporateSponsor[] {
    return this.getNoHeaderData()
      .filter((content: { [key: string]: any }) => {
        return content['value'][CorporateSponsorColNum.name1] != '';
      })
      .map((element: { [key: string]: any }) => {
        const sponsor: CorporateSponsor = {
          rowIdx: parseInt(element['rowIdx']),
          grade: element['value'][CorporateSponsorColNum.grade],
          type: element['value'][CorporateSponsorColNum.type],
          display_order: element['value'][CorporateSponsorColNum.displayOrder],
          name1: element['value'][CorporateSponsorColNum.name1],
          url1: element['value'][CorporateSponsorColNum.url1],
          name2: element['value'][CorporateSponsorColNum.name2],
          url2: element['value'][CorporateSponsorColNum.url2],
          logo_image_url: element['value'][CorporateSponsorColNum.logoImageURL]
        };
        return sponsor;
      });
  }
}
