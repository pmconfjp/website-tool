import { PropertyKey } from './../../common/enum/common-enum';
/**
 * incomminwebhookの処理をまとめたクラス
 */
export class InCommingWebHooks {
  /**
   * チャンネルにメッセージを送信する
   * @param url メッセージ送信先URL
   * @param payload 送信するメッセージのpayload
   */
  private sendMessageToSlack(url: string, payload: { [key: string]: string }) {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };
    try {
      UrlFetchApp.fetch(url, options);
    } catch (error) {
      Logger.log(JSON.stringify(error));
      return;
    }
  }

  /**
   * 指定のチャンネルにファイルをアップロードする
   * @param fileName アップロードするファイル名
   * @param fileContent アップロードするファイルの中身
   */
  private sendFileToSlack(fileName: string, fileContent: string, channel: string) {
    // TODO: 現状だとbotからの通知にならない
    const payload = {
      token: PropertiesService.getScriptProperties().getProperty(PropertyKey.SlackOAuthAccessToken),
      channels: channel,
      content: fileContent,
      filename: fileName,
      initial_comment: '*' + fileName + '* の出力が完了しました',
      title: fileName
    };
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      payload: payload
    };
    try {
      UrlFetchApp.fetch('https://slack.com/api/files.upload', options);
    } catch (error) {
      Logger.log(JSON.stringify(error));
      return;
    }
  }

  /**
   * 指定したpayloadでslackにメッセージを送信する
   * @param payload 送信するメッセージのpayload
   */
  sendMsg(payload: any) {
    this.sendMessageToSlack(
      PropertiesService.getScriptProperties().getProperty(PropertyKey.SlackWebHookURL),
      payload
    );
  }

  /**
   * 非同期で処理した際にメッセージを送信する
   * @param url 送信対象のUEL
   * @param payload 送信するメッセージのpayload
   */
  sendLazyMsg(url: string, payload: any) {
    this.sendMessageToSlack(url, payload);
  }

  /**
   * GoogleAppsScriptのプロパティに設定されたチャンネルにファイルをアップロードする
   * @param fileName アップロードするファイル名
   * @param fileContent アップロードするファイルの中身
   */
  sendFile(fileName: string, fileContent: string) {
    this.sendFileToSlack(
      fileName,
      fileContent,
      PropertiesService.getScriptProperties().getProperty(PropertyKey.fileUploadChannel)
    );
  }
}
