import { PersonalSponsorApplication } from './../application/personalSponsorApplication';
import { CorporateSponsorApplication } from './../application/corporateSponsorApplication';
import { JobsApplication } from './../application/jobsApplication';
import { StaffApplication } from './../application/staffApplication';
import { SpeakerApplication } from './../application/speakerApplication';
import { JobObject } from '../common/interface/common-interface';
import { InCommingWebHooks } from '../service/inCommingWebHook/inCommingWebHookService';
/**
 * 非同期に各ファイルを作成するクラス
 * GASの定期実行で1分おきに実行されている
 * Slackからの作成依頼があった場合
 * Scriptキャッシュにデータが存在するので、対象のファイルを作成する
 */
export class TickHandler {
  /**
   * 定期実行処理
   */
  execute() {
    const icwh: InCommingWebHooks = new InCommingWebHooks();
    const instances = [
      new SpeakerApplication(),
      new StaffApplication(),
      new JobsApplication(),
      new CorporateSponsorApplication(),
      new PersonalSponsorApplication()
    ];

    instances
      .filter(app => {
        return app.hasNext();
      })
      .forEach(app => {
        const job: JobObject = app.getQueue();
        icwh.sendFile(app.getFileName(), app.toFileContent());
        // icwh.sendLazyMsg(job.url, this.payload());
      });
  }
}
