/**
 * URLがらみの設定をするUTILクラス
 */
export class URLUtils {
  static speakerImageURL(rowNum: number, extention: string): string {
    const num: string = ('000' + rowNum).slice(-3);
    return '/assets/images/speakers/speaker' + num + extention;
  }

  static sponsorImageURL(rowNum: number, extention: string): string {
    const num: string = ('000' + rowNum).slice(-3);
    return '/assets/images/sponsors/sponsor' + num + extention;
  }

  static personalDefaultImageURL(): string {
    return '/assets/images/pmconf_ico.png';
  }

  static staffImageURL(image: string): string {
    return '/assets/images/profile_images/' + image;
  }
}
