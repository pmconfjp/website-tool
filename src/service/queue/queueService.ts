/**
 * ScriptCacheを利用してQueueを実現するクラス
 */
export class QueueService {
  /** キャッシュの生存期間を秒で指定するための変数 */
  private expire = 60 * 60 * 24; // 24H
  /** ScriptCacheのオブジェクト */
  private cache: GoogleAppsScript.Cache.Cache;

  constructor() {
    this.cache = CacheService.getScriptCache();
  }

  /**
   * 任意のQueueに入っているかを確認する
   * @param queueKey string
   */
  hasNext(queueKey: string): boolean {
    const queue = this.cache.get(queueKey);
    return queue != null;
  }

  /**
   * Queueを登録する
   * @param queueKey string
   * @param job string
   */
  addJobQueue(queueKey: string, job: string): void {
    let queue = this.cache.get(queueKey);
    let jobs = queue == null ? [] : queue.split(';');
    jobs.push(job);
    this.cache.put(queueKey, jobs.join(';'), this.expire);
  }

  /**
   * Queueからjobを取得する
   * 方法がわからないので排他制御を全くしていない。。。
   * 平行実行したら簡単に壊れそう
   * @param queueKey string
   */
  getJobQueue(queueKey: string): string {
    let queue = this.cache.get(queueKey);
    if (queue == null) return '';
    const jobs: string[] = queue.split(';');
    const job: string = jobs.shift();
    const expireTime: number = jobs.length == 0 ? 0 : this.expire;
    this.cache.put(queueKey, jobs.join(';'), expireTime);
    return job;
  }
}
