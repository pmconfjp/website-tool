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
    data: { [key: string]: string | string[] },
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
    data: { [key: string]: string | string[] },
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
    data: { [key: string]: any },
    shiftR: string[]
  ): string {
    var toString = Object.prototype.toString;
    const arr: string[] = keys.reduce((p: string[], c: string, idx: number) => {
      if (includeFlug || data[c]) {
        switch (
          toString
            .call(data[c])
            .slice(8, -1)
            .toLowerCase()
        ) {
          case 'string':
            const trimedData = data[c].replace(/\r?\n/g, '').replace(/"/g, '\\"');
            if (includeFlug || trimedData) {
              p.push(`${shiftR.join()}${this.keyValDataBlock(idx, c, trimedData)}`);
            }
            break;
          case 'array':
            p.push(`${shiftR.join()}${this.listValDataBlock(idx, c, data[c])}`);
            break;
        }
      }
      return p;
    }, []);
    return arr.join('\n');
  }

  /**
   * `KEY: VALUE` 形式の値を設定する
   * @param idx idx
   * @param key key
   * @param value value
   */
  private static keyValDataBlock(idx: number, key: string, value: string): string {
    const line: string = `${key}: "${value}"`;
    return idx == 0 ? YAMLUtils.headMark + line : YAMLUtils.indent + line;
  }

  private static listValDataBlock(idx: number, key: string, values: string[]): string {
    const head: string = idx == 0 ? YAMLUtils.headMark : YAMLUtils.indent;
    const formatedArray: string[] = values.map((v: string) => {
      return `${head}${YAMLUtils.indent}${YAMLUtils.headMark}"${v
        .replace(/\r?\n/g, '')
        .replace(/"/g, '\\"')}"`;
    });
    formatedArray.unshift(`${head}${key}:`);
    return formatedArray.join('\n');
  }
}
