import { FileName } from './../common/enum/common-enum';
import { Queue } from '../common/enum/common-enum';

/**
 * 基底applicationクラス
 * 共通して行う処理を記述する。
 */
export class BaseApplication {
  private queueName: Queue;
  private fileName: FileName;

  constructor(queueName: Queue, fileName: FileName) {
    this.queueName = queueName;
    this.fileName = fileName;
  }

  /**
   * 作成するファイル名を返す
   */
  getFileName(): FileName {
    return this.fileName;
  }

  /**
   * Queue名を返す
   */
  getQueueName(): Queue {
    return this.queueName;
  }
}
