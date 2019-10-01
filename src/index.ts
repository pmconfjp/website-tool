import { LocalDownloadHandler } from './handler/localDownloadHandler';
import { TickHandler } from './handler/tickHandler';
import { SlashCommandHandler } from './handler/slashcommandHandler';

/** グローバルに宣言する関数を設定する変数 */
declare var global: any;

/**
 * Slackコマンドのエンドポイント
 */
global.doPost = (e: any): GoogleAppsScript.Content.TextOutput => {
  checkToken(e.parameter.token);
  const handler = new SlashCommandHandler(e);
  const response = handler.execute();
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
};

/**
 * 定期実行のエンドポイント
 */
global.tick = () => {
  const handler = new TickHandler();
  handler.execute();
};

/**
 * ローカルにファイルをダウンロードに必要なファイルの中身を返す
 */
global.localDownloadData = (type: string): string => {
  const dl: LocalDownloadHandler = new LocalDownloadHandler(type);
  return dl.getFileContent();
};

/**
 * ローカルにファイルをダウンロードに必要なファイル名を返す
 */
global.localDownloadFileName = (type: string): string => {
  const dl: LocalDownloadHandler = new LocalDownloadHandler(type);
  return dl.getFileName();
};

// TODO: schedule
// TODO: session

// 正常なtokenかチェックする
const checkToken = (token: string) => {
  const slackToken: string = PropertiesService.getScriptProperties().getProperty('SlackToken');
  if (slackToken != token) {
    // エラーであること返してあげたほうが親切？
    throw new Error('Invalid token');
  }
};
