import { JobObject } from '../common/interface/common-interface';
import { QueueService } from '../service/queue/queueService';
import { Queue } from '../common/enum/common-enum';

export class QueueApplication {
  /**
   * ユーザの登録処理のQueueを取得する
   * @returns SpeakerJob
   */
  public getQueue(queueName: string): JobObject {
    const queue = new QueueService();
    const jsonStr = JSON.parse(queue.getJobQueue(queueName));
    const result: JobObject = { url: jsonStr['url'] };
    return result;
  }

  /**
   * SpeakerのYAML出力処理をQueueに追加する
   */
  public addQueue(queueName: string, url: string): void {
    const queue = new QueueService();
    const job: JobObject = { url: url };
    queue.addJobQueue(queueName, JSON.stringify(job));
  }

  /**
   * SpeakerYAMLの出力処理がQueueに入っているか確認する
   * @returns boolean
   */
  public hasNext(queueName: Queue): boolean {
    const queue = new QueueService();
    return queue.hasNext(queueName);
  }
}
