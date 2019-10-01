/**
 * YAMLファイル作成のためのUTILクラス
 */
export class YAMLUtils {
  static headMark: string = '- ';
  static indent: string = '  ';

  /**
   * 空のデータを含まないブロックを返す
   * @param keys 出力対象フィールド名
   * @param data 出力対象データの連想配列
   * @param shiftR ブロックのインデント
   */
  static transferBlockExcludeEmptyField(
    keys: string[],
    data: { [key: string]: string },
    shiftR: string[]
  ): string {
    return this.transferBlock(false, keys, data, shiftR);
  }

  /**
   * 空のデータも含むブロックを返す
   * @param keys 出力対象フィールド名
   * @param data 出力対象データの連想配列
   * @param shiftR ブロックのインデント
   */
  static transferBlockIncludeEmptyField(
    keys: string[],
    data: { [key: string]: string },
    shiftR: string[]
  ): string {
    return this.transferBlock(true, keys, data, shiftR);
  }

  /**
   * ブロックの文字列を作成する
   * @param includeFlug 空データを含むかを判定するフラグ
   * @param keys 出力対象フィールド名
   * @param data 出力対象データの連想配列
   * @param shiftR ブロックのインデント
   */
  private static transferBlock(
    includeFlug: boolean,
    keys: string[],
    data: { [key: string]: string },
    shiftR: string[]
  ): string {
    const arr: string[] = keys.reduce((p: string[], c: string, idx: number) => {
      if (includeFlug || data[c]) {
        const line: string = c + ': ' + data[c];
        const d: string = idx == 0 ? YAMLUtils.headMark + line : YAMLUtils.indent + line;
        p.push(shiftR.join() + d);
      }
      return p;
    }, []);
    return arr.join('\n');
  }
}
