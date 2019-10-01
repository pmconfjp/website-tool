import { CorporateSponsorApplication } from './../application/corporateSponsorApplication';
import { JobsApplication } from './../application/jobsApplication';
import { StaffApplication } from './../application/staffApplication';
import { SpeakerApplication } from './../application/speakerApplication';
import { JobObject } from '../common/interface/common-interface';
import { InCommingWebHooks } from '../service/inCommingWebHook/inCommingWebHookService';
import { QueueApplication } from '../application/queueApplication';
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
    const queue: QueueApplication = new QueueApplication();
    const instances = [
      new SpeakerApplication(),
      new StaffApplication(),
      new JobsApplication(),
      new CorporateSponsorApplication()
    ];

    instances
      .filter(app => {
        return queue.hasNext(app.getQueueName());
      })
      .forEach(app => {
        const job: JobObject = queue.getQueue(app.getQueueName());
        icwh.sendFile(app.getFileName(), app.toFileContent());
      });
  }
}
