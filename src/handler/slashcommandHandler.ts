import { Queue } from './../common/enum/common-enum';
import { QueueApplication } from './../application/queueApplication';
import { FileName } from '../common/enum/common-enum';
/**
 * Slackから `slashcommand`　が実行された時に処理を行うhandler
 * slackには3sec以内に応答を返さないとTimeoutする仕様があるので、
 * ここではファイルの作成処理は行わずにscriptキャッシュに処理対象を指定して応答を返す
 */
export class SlashCommandHandler {
  /** 実行されたslashコマンドの格納先 */
  private command: string;
  /**
   * 返却する先のURL(現在は利用していない)
   * slashコマンド実行時に対象の投稿があったチャンネルに返答するためのURLが
   * requestの情報に含まれているが、今回はファイルアップロードAPIを叩くので利用していない
   */
  private responseURL: string;
  /** 処理対象のファイル名 */
  private fileName: string;

  constructor(e: any) {
    this.command = e.parameter.command;
    this.responseURL = e.parameter.response_url;
  }

  /**
   * slashコマンドのリクエストから必要な情報を取得して、
   * ScriptCacheに情報を格納して、レスポンスを返す
   */
  execute() {
    const queueApp = new QueueApplication();
    const queueTargetArray: string[] = this.handleQueue[this.command]();
    queueTargetArray.forEach((ele: string) => queueApp.addQueue(ele, this.responseURL));
    return this.payload();
  }

  /**
   * Slackのslashコマンドから必要なQueueを返す
   * caseで書いても良かったがexecuteの見通しが悪くなるので分けた
   */
  private handleQueue = {
    '/parts-all': (): string[] => {
      this.fileName = '全てのファイル';
      return [
        Queue.corporateSponsor,
        Queue.jobs,
        Queue.keynote,
        // Queue.schedule,
        // Queue.session,
        Queue.speaker,
        Queue.staff
      ];
    },
    '/parts-keynote': (): string[] => {
      this.fileName = FileName.speaker;
      return [Queue.keynote];
    },
    '/parts-speaker': (): string[] => {
      this.fileName = FileName.speaker;
      return [Queue.speaker];
    },
    '/parts-staff': (): string[] => {
      this.fileName = FileName.staff;
      return [Queue.staff];
    },
    '/parts-jobs': (): string[] => {
      this.fileName = FileName.jobs;
      return [Queue.jobs];
    },
    '/parts-corporate-sponsor': (): string[] => {
      this.fileName = FileName.corporateSponsor;
      return [Queue.corporateSponsor];
    }
  };

  /**
   * 処理の受付メッセージのpayloadを返す
   */
  private payload() {
    return {
      attachments: [
        {
          color: '#ff8c00',
          title: this.fileName + 'の出力処理を受け付けました'
        }
      ]
    };
  }
}
