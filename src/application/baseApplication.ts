import { JobObject } from '../common/interface/common-interface';
import { QueueService } from '../service/queue/queueService';

export class BaseApplication {
  private queueName: string;
  private queue: QueueService;

  constructor(queueName: string) {
    this.queueName = queueName;
    this.queue = new QueueService();
  }

  /**
   * ユーザの登録処理のQueueを取得する
   * @returns SpeakerJob
   */
  public getQueue(): JobObject {
    const jsonStr = JSON.parse(this.queue.getJobQueue(this.queueName));
    const result: JobObject = { url: jsonStr['url'] };
    return result;
  }

  /**
   * SpeakerのYAML出力処理をQueueに追加する
   */
  public addQueue(url: string): void {
    const job: JobObject = { url: url };
    this.queue.addJobQueue(this.queueName, JSON.stringify(job));
  }

  /**
   * SpeakerYAMLの出力処理がQueueに入っているか確認する
   * @returns boolean
   */
  public hasNext(): boolean {
    return this.queue.hasNext(this.queueName);
  }
}
