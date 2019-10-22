import { BaseApplication } from './baseApplication';
import { FileName, Queue } from './../common/enum/common-enum';
import { URLUtils } from './../utils/URLUtils';
import { SponsorGrade } from '../common/enum/sheet-enum';
import { CorporateSponsor } from '../common/interface/sheet-interface';
import { YAMLUtils } from '../utils/YAMLUtils';
import { CorporateSponsorSheetService } from '../service/spreadsheet/CorporateSponsorSheetService';
/**
 * 企業スポンサー情報のYAMLファイルを作成するクラス
 */
export class CorporateSponsorApplication extends BaseApplication {
  constructor() {
    super(Queue.corporateSponsor, FileName.corporateSponsor);
  }

  /**
   * Spreadsheetのsponsorのグレードをymlの表記に変えるための連想配列
   */
  private gradeMap: { [key: string]: string } = {
    プラチナ: SponsorGrade.platinam,
    ゴールド: SponsorGrade.gold,
    シルバー: SponsorGrade.silver,
    ブロンズ: SponsorGrade.bronze,
    ロゴ: SponsorGrade.logo,
    ドリンク: SponsorGrade.drink
  };

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): CorporateSponsor[] {
    const sheet = new CorporateSponsorSheetService();
    return sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = [];
    const groupbyGradeList = this.groupbySponsorGrade();
    Object.keys(groupbyGradeList).forEach((key: string) => {
      result.push(this.transferBlock(key, this.sortedList(groupbyGradeList[key])));
    });
    return result.join('\n');
  }

  /**
   * スポンサーのグレードでデータをまとめる
   */
  private groupbySponsorGrade(): { [key: string]: CorporateSponsor[] } {
    return this.getAll().reduce(
      (pre: { [key: string]: CorporateSponsor[] }, cur: CorporateSponsor) => {
        const currentGrade: string = this.gradeMap[cur.grade];
        if (!pre[currentGrade]) {
          pre[currentGrade] = [];
        }
        pre[currentGrade].push(cur);
        return pre;
      },
      {}
    );
  }

  /**
   * 表示順にソートする
   * @param sponsorList 単一のグレードに絞り込まれたリスト
   */
  private sortedList(sponsorList: CorporateSponsor[]): CorporateSponsor[] {
    return sponsorList.sort((a, b) => {
      return a.display_order < b.display_order ? -1 : 1;
    });
  }

  /**
   * gardeごとのブロックを作成する
   * @param grade string
   * @param sponsors CorporateSponsor[]
   */
  private transferBlock(grade: string, sponsors: CorporateSponsor[]): string {
    const result: string[] = [grade + ':'];
    const blockArray: string[] = sponsors.reduce(
      (pre: string[], cur: CorporateSponsor): string[] => {
        if (cur.logo_image_url) {
          const block: { [key: string]: string } = {
            name: cur.name1,
            name2: cur.name2,
            url: cur.url1,
            url2: cur.url2,
            logo_image_url: URLUtils.sponsorImageURL(
              grade,
              cur.logo_image_url.replace(/\r?\n/g, '')
            )
          };
          pre.push(
            YAMLUtils.transferBlockExcludeEmptyField(Object.keys(block), block, [YAMLUtils.indent])
          );
        }
        return pre;
      },
      []
    );
    return blockArray.length > 0 ? result.concat(blockArray).join('\n') + '\n' : '';
  }
}
