import { BaseApplication } from './baseApplication';
import { FileName, Queue } from '../common/enum/common-enum';
import { URLUtils } from '../utils/URLUtils';
import { YAMLUtils } from '../utils/YAMLUtils';
import { Session } from '../common/interface/sheet-interface';
import { SessionSheetService } from '../service/spreadsheet/sessionSheetService';
/**
 * SpeakerのYAMLファイルを作成するクラス
 */
export class SessionApplication extends BaseApplication {
  constructor() {
    super(Queue.session, FileName.session);
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Session[] {
    const sheet = new SessionSheetService();
    return sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = [];
    const blockArray: string[] = this.getAll()
      .filter(val => {
        // 出力フラグが入っている
        return val.output_flag;
      })
      .reduce((pre: string[], cur: Session) => {
        const block: { [key: string]: string | string[] } = {
          id: cur.id,
          theme: cur.theme,
          title: cur.title,
          organization: cur.organization,
          desc: cur.description,
          venue: cur.venue,
          session_page_url: URLUtils.sessionPageURL(cur.id),
          speakers: cur.speakers
        };
        pre.push(YAMLUtils.transferBlockIncludeEmptyField(Object.keys(block), block, []));
        return pre;
      }, []);
    return result.concat(blockArray).join('\n');
  }
}
