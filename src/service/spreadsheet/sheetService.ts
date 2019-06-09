import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
/**
 * Spreadsheetの処理の基底クラス
 */
export class SheetService {
  private sheet: Sheet;

  constructor(key: string, sheetName: string) {
    this.sheet = SpreadsheetApp.openById(key).getSheetByName(sheetName);
  }

  /**
   * コンストラクタで指定したシートのヘッダー以外の全データを取得する。
   * @returns object `[{"rowIdx": 1, "value": ['val', val...]},{..}...]`
   */
  protected getNoHeaderData(): { [key: string]: any }[] {
    return this.sheet
      .getRange(2, 1, this.sheet.getLastRow(), this.sheet.getLastColumn())
      .getValues()
      .map((elem: string[], idx: number) => {
        return {
          rowIdx: `${idx + 2}`,
          value: elem
        };
      });
  }

  /**
   * 指定行に新規データを登録する
   * @param rowNum 対象行番号
   * @param data 登録するデータ
   */
  private setTargetRow(rowNum: number, data: string[]) {
    data.forEach((element: string, idx: number) => {
      // columnの指定が1から始まる為、+1している
      this.sheet.getRange(rowNum, idx + 1).setValue(element);
    });
  }

  /**
   * 最終行に指定のデータを挿入する。
   * @param row 追加したい行データ
   */
  protected addRow(row: string[]) {
    this.setTargetRow(this.sheet.getLastRow() + 1, row);
  }

  /**
   * 指定行のデータを更新する
   * @param rowNom 対象行
   * @param data 更新するデータ
   */
  protected updateRow(rowNom: number, data: string[]) {
    this.setTargetRow(rowNom, data);
  }

  /**
   * 指定されたカラムのデータを更新する。
   * @param rowNum number 行番号
   * @param colNum number 列番号
   * @param value string 設定する値
   */
  protected updateColumn(rowNum: number, colNum: number, value: string) {
    this.sheet.getRange(rowNum, colNum).setValue(value);
  }

  /**
   * 指定行のデータを削除する。
   * @param rowNom number 指定行番号
   */
  protected deleteRow(rowNom: number) {
    this.sheet.deleteRows(rowNom, 1);
  }
}
