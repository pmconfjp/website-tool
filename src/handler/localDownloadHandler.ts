import { CorporateSponsorApplication } from './../application/corporateSponsorApplication';
import { JobsApplication } from './../application/jobsApplication';
import { StaffApplication } from './../application/staffApplication';
import { SpeakerApplication } from './../application/speakerApplication';
/**
 * ローカルにファイルをダウンロードする処理のhandler
 */
export class LocalDownloadHandler {
  private type: string;
  constructor(type: string) {
    this.type = type;
  }

  /**
   * ローカルにファイルコンテントを返す
   */
  getFileContent(): string {
    const app:
      | SpeakerApplication
      | StaffApplication
      | JobsApplication
      | CorporateSponsorApplication = this.handleApplication[this.type]();
    return app.toFileContent();
  }

  /**
   * ローカルにファイル名を返す
   */
  getFileName(): string {
    const app:
      | SpeakerApplication
      | StaffApplication
      | JobsApplication
      | CorporateSponsorApplication = this.handleApplication[this.type]();
    return app.getFileName();
  }

  /**
   * 指定された文字列から処理を行うApplicationクラスを返す
   */
  private handleApplication = {
    speaker: (): SpeakerApplication => {
      return new SpeakerApplication();
    },
    staff: (): StaffApplication => {
      return new StaffApplication();
    },
    jobs: (): JobsApplication => {
      return new JobsApplication();
    },
    corporateSponsor: (): CorporateSponsorApplication => {
      return new CorporateSponsorApplication();
    }
  };
}
