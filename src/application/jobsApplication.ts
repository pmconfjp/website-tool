import { BaseApplication } from './baseApplication';
import { FileName, Queue } from './../common/enum/common-enum';
import { JobsSheetService } from './../service/spreadsheet/jobsSheetService';
import { Jobs } from '../common/interface/sheet-interface';
import { YAMLUtils } from '../utils/YAMLUtils';
import { SponsorGrade } from '../common/enum/sheet-enum';
/**
 * 求人情報のYAMLファイルを作成するクラス
 */
export class JobsApplication extends BaseApplication {
  constructor() {
    super(Queue.jobs, FileName.jobs);
  }

  /**
   * Spreadsheetのsponsorのグレードをymlの表記に変えるための連想配列
   */
  private gradeMap: { [key: string]: string } = {
    PLATINUM: SponsorGrade.platinam,
    GOLD: SponsorGrade.gold,
    SILVER: SponsorGrade.silver,
    BRONZE: SponsorGrade.bronze,
    LOGO: SponsorGrade.logo
  };

  /**
   * Spreadsheetからデータを取得
   */
  getAll(): Jobs[] {
    const sheet = new JobsSheetService();
    return sheet.allData();
  }

  /**
   * YAMLのテキストに変換する
   */
  toFileContent(): string {
    let result: string[] = [];
    const groupbyGradeList = this.groupbySponsorGrade();
    Object.keys(this.gradeMap).forEach((key: string) => {
      const target: Jobs[] = this.sortedList(groupbyGradeList[this.gradeMap[key]]);
      const blockArray: string[] = target.reduce((pre: string[], cur: Jobs) => {
        const block: { [key: string]: string } = {
          organization: cur.organization,
          title: cur.title,
          url: cur.url
        };
        pre.push(YAMLUtils.transferBlockExcludeEmptyField(Object.keys(block), block, []));
        return pre;
      }, []);
      result = result.concat(blockArray);
    });
    return result.join('\n');
  }

  /**
   * スポンサーのグレードでデータをまとめる
   */
  private groupbySponsorGrade(): { [key: string]: Jobs[] } {
    return this.getAll().reduce((pre: { [key: string]: Jobs[] }, cur: Jobs) => {
      const currentGrade: string = this.gradeMap[cur.sponsor_grade];
      if (!pre[currentGrade]) {
        pre[currentGrade] = [];
      }
      pre[currentGrade].push(cur);
      return pre;
    }, {});
  }

  /**
   * 表示順にソートする
   * @param sponsorList 単一のグレードに絞り込まれたリスト
   */
  private sortedList(list: Jobs[]): Jobs[] {
    return list.sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });
  }
}
