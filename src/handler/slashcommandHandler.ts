import { FileName } from '../common/enum/common-enum';
import { PersonalSponsorApplication } from './../application/personalSponsorApplication';
import { SpeakerApplication } from '../application/speakerApplication';
import { StaffApplication } from '../application/staffApplication';
import { JobsApplication } from '../application/jobsApplication';
import { CorporateSponsorApplication } from '../application/corporateSponsorApplication';
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
    const appArray = this.handleApplication[this.command]();
    appArray.forEach(
      (
        element:
          | SpeakerApplication
          | StaffApplication
          | JobsApplication
          | CorporateSponsorApplication
          | PersonalSponsorApplication
      ) => element.addQueue(this.responseURL)
    );
    return this.payload();
  }

  /**
   * Slackのslashコマンドから必要なApplicationを返す
   * caseで書いても良かったがexecuteの見通しが悪くなるので分けた
   */
  private handleApplication = {
    '/parts-all': (): (
      | SpeakerApplication
      | StaffApplication
      | JobsApplication
      | CorporateSponsorApplication
      | PersonalSponsorApplication)[] => {
      this.fileName = '全てのファイル';
      return [
        new SpeakerApplication(),
        new StaffApplication(),
        new JobsApplication(),
        new CorporateSponsorApplication(),
        new PersonalSponsorApplication()
      ];
    },
    '/parts-speaker': (): SpeakerApplication[] => {
      this.fileName = FileName.speaker;
      return [new SpeakerApplication()];
    },
    '/parts-staff': (): StaffApplication[] => {
      this.fileName = FileName.staff;
      return [new StaffApplication()];
    },
    '/parts-jobs': (): JobsApplication[] => {
      this.fileName = FileName.jobs;
      return [new JobsApplication()];
    },
    '/parts-corporate-sponsor': (): CorporateSponsorApplication[] => {
      this.fileName = FileName.corporateSponsor;
      return [new CorporateSponsorApplication()];
    },
    '/parts-personal-sponsor': (): PersonalSponsorApplication[] => {
      this.fileName = FileName.personalSponsor;
      return [new PersonalSponsorApplication()];
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
