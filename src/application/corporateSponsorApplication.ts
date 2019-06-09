import { Queue, FileName } from './../common/enum/common-enum';
import { URLUtils } from './../utils/URLUtils';
import { SponsorGrade } from '../common/enum/sheet-enum';
import { BaseApplication } from './baseApplication';
import { CorporateSponsor } from '../common/interface/sheet-interface';
import { YAMLUtils } from '../utils/YAMLUtils';
import { CorporateSponsorSheetService } from '../service/spreadsheet/CorporateSponsorSheetService';
/**
 * 企業スポンサー情報のYAMLファイルを作成するクラス
 */
export class CorporateSponsorApplication extends BaseApplication {
  private sheet: CorporateSponsorSheetService;
  private keys: string[] = ['grade', 'name', 'url', 'logo_image_url'];
  private gradeMap: { [key: string]: string } = {
    プラチナ: SponsorGrade.platinam,
    ゴールド: SponsorGrade.gold,
    シルバー: SponsorGrade.silver,
    ドリンク: SponsorGrade.drink,
    メディア: SponsorGrade.media,
    コミュニティー: SponsorGrade.community
  };

  constructor() {
    super(Queue.corporateSponsor);
    this.sheet = new CorporateSponsorSheetService();
  }

  /**
   * 作成するファイル名を返す
   */
  getFileName(): string {
    return FileName.corporateSponsor;
  }

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): CorporateSponsor[] {
    return this.sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   * @returns string
   */
  toFileContent(): string {
    let result: string[] = [];
    const groupbyGradeList = this.sheet
      .allData()
      .reduce((pre: { [key: string]: CorporateSponsor[] }, cur: CorporateSponsor) => {
        if (!pre[this.gradeMap[cur.grade]]) pre[this.gradeMap[cur.grade]] = [];
        pre[this.gradeMap[cur.grade]].push(cur);
        return pre;
      }, {});
    Object.keys(groupbyGradeList).forEach((key: string) => {
      result.push(this.transferBlock(key, groupbyGradeList[key]));
    });
    return result.join('\n');
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
        const block: { [key: string]: string } = {};
        this.keys.forEach((key: string) => {
          if (key === 'logo_image_url') {
            block[key] = URLUtils.sponsorImageURL(cur.rowIdx, '.jpg');
          } else if (key !== 'grade') {
            block[key] = cur[key].replace(/\r?\n/g, '');
          }
        });
        pre.push(
          YAMLUtils.transferBlockIncludeEmptyField(this.keys.slice(1), block, [YAMLUtils.indent])
        );
        return pre;
      },
      []
    );
    return result.concat(blockArray).join('\n') + '\n';
  }
}
