import { PropertyKey } from './../../common/enum/common-enum';
import { JobsColNum } from '../../common/enum/sheet-enum';
import { Jobs } from '../../common/interface/sheet-interface';
import { SheetService } from './sheetService';
/**
 * 求人情報のSpreadsheetを扱うためのクラス
 */
export class JobsSheetService extends SheetService {
  constructor() {
    super(
      PropertiesService.getScriptProperties().getProperty(PropertyKey.JobsSheetID),
      PropertiesService.getScriptProperties().getProperty(PropertyKey.JobsSheetName)
    );
  }

  /**
   * Jobs型から string[] への変換
   * @param data Jobs
   * @returns string[]
   */
  private transform(data: Jobs): String[] {
    return [data.organization, data.title, data.url];
  }

  /**
   * シートからSpeakerのデータを全て返す。
   * @returns Jobs[]
   */
  allData(): Jobs[] {
    return this.getNoHeaderData()
      .filter((content: { [key: string]: any }) => {
        return content['value'][JobsColNum.organization] != '';
      })
      .map((element: { [key: string]: any }) => {
        const jobs: Jobs = {
          rowIdx: parseInt(element['rowIdx']),
          sponsor_grade: element['value'][JobsColNum.sponsor_grade],
          order: element['value'][JobsColNum.order],
          organization: element['value'][JobsColNum.organization],
          title: element['value'][JobsColNum.title],
          url: element['value'][JobsColNum.url]
        };
        return jobs;
      });
  }
}
