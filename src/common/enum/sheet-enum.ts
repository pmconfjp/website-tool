/**
 * スポンサーのグレードを表現したenum
 */
export enum SponsorGrade {
  platinam = 'platinas',
  gold = 'golds',
  silver = 'silvers',
  bronze = 'bronze',
  logo = 'logo',
  drink = 'drinks'
}

/**
 * Speaker情報のスプレッドシートのカラム番号のenum
 */
export enum SpeakerColNum {
  id = 0,
  organization = 1,
  name = 2,
  kana = 3,
  title = 4,
  profile_image_url = 5,
  profile = 6,
  session_title = 7,
  session_id = 8,
  speaker_type = 9
}

/**
 * スタッフ情報のスプレッドシートのカラム番号のenum
 */
export enum StaffColNum {
  name = 0,
  kana = 1,
  romaji = 2,
  organization = 3,
  title = 4,
  mailaddress = 5,
  addMailingListAt = 6,
  addGoogleDriveAt = 7,
  addSlackAt = 8,
  addTrello = 9,
  addGithubAt = 10,
  addGoogleCalendarAt = 11,
  githubURL = 12,
  gmailAddress = 13,
  twitter = 14,
  facebook = 15,
  link = 16,
  profile_image_url = 17
}

/**
 * 求人情報のスプレッドシートのカラム番号のenum
 */
export enum JobsColNum {
  organization = 0,
  title = 1,
  url = 2,
  sponsor_grade = 3,
  order = 4
}

/**
 * 企業スポンサー情報のスプレッドシートのカラム番号のenum
 */
export enum CorporateSponsorColNum {
  grade = 0,
  type = 1,
  displayOrder = 2,
  name1 = 3,
  url1 = 4,
  name2 = 5,
  url2 = 6,
  logoImageURL = 7
}

export enum SessionColNum {
  id = 0,
  venue = 1,
  time = 2,
  outputFlag = 3,
  staff = 4,
  theme = 5,
  organiztion = 6,
  speakers = 7,
  title = 8,
  description = 9
}
