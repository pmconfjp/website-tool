/**
 * Speakerファイル作成に必要な情報のオブジェクト
 */
export interface Speaker {
  rowIdx?: number;
  id: string;
  name: string;
  kana: string;
  organization: string;
  title: string;
  profile_image_url: string;
  profile: string;
  session_title: string;
  session_id: string;
  speaker_type: string;
}

/**
 * Staffファイル作成に必要な情報のオブジェクト
 */
export interface Staff {
  rowIdx?: number;
  name: string;
  kana: string;
  organization?: string;
  title?: string;
  twitter?: string;
  github?: string;
  facebook?: string;
  link?: string;
  profile_image_url: string;
}

/**
 * 求人掲載ファイル作成に必要な情報のオブジェクト
 */
export interface Jobs {
  rowIdx?: number;
  sponsor_grade: string;
  order: number;
  organization: string;
  title: string;
  url: string;
}

/**
 * 企業スポンサーファイルの作成に必要な情報のオブジェクト
 */
export interface CorporateSponsor {
  rowIdx?: number;
  grade: string;
  type: string;
  display_order: number;
  name1: string;
  url1: string;
  name2: string;
  url2: string;
  logo_image_url: string;
}

export interface Session {
  rowIdx?: number;
  id: string;
  time: string;
  staff: string;
  theme: string;
  organization: string;
  title: string;
  description: string;
  venue: string;
  session_page_url: string;
  speakers: string[];
  output_flag: boolean;
}

/**
 * スケジュールファイル作成に必要な情報のオブジェクト
 */
export interface ScheduleLine {
  time: string;
  min: string;
  speaker?: Speaker['name'];
  icon?: Speaker['profile_image_url'];
  iconWidth?: number;
  iconHeight?: number;
  theme?: string;
  sessionTitle?: string;
  jobTitle?: Speaker['title'];
  organization?: Speaker['organization'];
}

/**
 * セッション詳細ファイル作成に必要な情報のオブジェクト
 */
export interface SessionDescription {
  title: string;
  description: string;
  theme: string;
  date: string;
  author: Speaker['name'];
  category: string;
  og_image_url: Speaker['profile_image_url'];
}
