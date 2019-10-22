import { SessionColNum } from './../../common/enum/sheet-enum';
import { Session, Staff } from './../../common/interface/sheet-interface';
import { PropertyKey } from '../../common/enum/common-enum';
import { SpeakerColNum } from '../../common/enum/sheet-enum';
import { Speaker } from '../../common/interface/sheet-interface';
import { SheetService } from './sheetService';
/**
 * SpeakerのSpreadsheetを扱うためのクラス
 */
export class SessionSheetService extends SheetService {
  constructor() {
    super(
      PropertiesService.getScriptProperties().getProperty(PropertyKey.SessionsSheetID),
      PropertiesService.getScriptProperties().getProperty(PropertyKey.SessionsSheetName)
    );
  }

  /**
   * Session型から string[] への変換
   * @param data Speaker
   * @returns string[]
   */
  private transform(data: Session): String[] {
    return [
      data.id,
      data.theme,
      data.title,
      data.description,
      data.venue,
      data.session_page_url,
      data.speakers.join('\n')
    ];
  }

  /**
   * シートからSessionのデータを全て返す。
   * IDが設定されているものだけが対象。
   * @returns Session[]
   */
  allData(): Session[] {
    return this.getNoHeaderData()
      .filter((content: { [key: string]: any }) => {
        return content['value'][SessionColNum.id] != '';
      })
      .map((element: { [key: string]: any }) => {
        // 複数人のスピーカーが設定されている場合の対応(一つのセルに改行区切り)
        const spkrsStr: string = element['value'][SessionColNum.speakers];
        const speakers: string[] = spkrsStr.split('\n');

        const session: Session = {
          rowIdx: parseInt(element['rowIdx']),
          id: element['value'][SessionColNum.id],
          time: element['value'][SessionColNum.time],
          staff: element['value'][SessionColNum.staff],
          theme: element['value'][SessionColNum.theme],
          organization: element['value'][SessionColNum.organiztion],
          speakers: speakers,
          title: element['value'][SessionColNum.title],
          description: element['value'][SessionColNum.description],
          session_page_url: '',
          venue: element['value'][SessionColNum.venue],
          output_flag: element['value'][SessionColNum.outputFlag] === '' ? false : true
        };
        return session;
      });
  }
}
