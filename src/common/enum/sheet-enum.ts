/**
 * スポンサーのグレードを表現したenum
 */
export enum SponsorGrade {
  platinam = 'platinas',
  gold = 'golds',
  silver = 'silvers',
  drink = 'drinks',
  media = 'medias',
  community = 'communities',
  persomal = 'personals'
}

/**
 * Speaker情報のスプレッドシートのカラム番号のenum
 */
export enum SpeakerColNum {
  name = 3,
  organization = 1,
  title = 5,
  profile_image_url = -1,
  profile = 6
}

/**
 * スタッフ情報のスプレッドシートのカラム番号のenum
 */
export enum StaffColNum {
  name = 0,
  organization = 1,
  title = 2,
  twitter = 3,
  github = 4,
  facebook = 5,
  link = 6,
  profile_image_url = 7
}

/**
 * 求人情報のスプレッドシートのカラム番号のenum
 */
export enum JobsColNum {
  organization = 0,
  title = 1,
  url = 2
}

/**
 * 企業スポンサー情報のスプレッドシートのカラム番号のenum
 */
export enum CorporateSponsorColNum {
  grade = 0,
  name = 1,
  url = 2
}

/**
 * 個人スポンサー情報のスプレッドシートのカラム番号のenum
 */
export enum PersonalSponsorColNum {
  name = 0,
  logoImageUrl = 1,
  url = 2
}
