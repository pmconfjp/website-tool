import { SponsorGrade } from '../common/enum/sheet-enum';

/**
 * URLがらみの設定をするUTILクラス
 */
export class URLUtils {
  static speakerImageURL(image: string): string {
    return '/assets/images/speakers/' + image;
  }

  static sponsorImageURL(grade: string, fileName: string): string {
    let prefix: string = '/assets/images/sponsors/';
    switch (grade) {
      case SponsorGrade.platinam:
        return prefix + 'platina/' + fileName;
      case SponsorGrade.gold:
        return prefix + 'gold/' + fileName;
      case SponsorGrade.silver:
        return prefix + 'silver/' + fileName;
      case SponsorGrade.bronze:
        return prefix + 'bronze/' + fileName;
      case SponsorGrade.logo:
        return prefix + 'logo/' + fileName;
      case SponsorGrade.drink:
        return prefix + 'drink/' + fileName;
      default:
        // TODO: PMConfのデフォルト画像を入れる
        return '';
    }
  }

  static personalDefaultImageURL(): string {
    return '/assets/images/pmconf_ico.png';
  }

  static personalImageURL(image: string): string {
    return '/assets/images/sponsors/personal/' + image;
  }

  static staffImageURL(image: string): string {
    return '/assets/images/profile_images/' + image;
  }
}
