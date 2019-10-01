/**
 * 出力するファイル名を管理するためのenum
 */
export enum FileName {
  speaker = 'speakers.yml',
  keynote = 'keynote.yml',
  community = 'communities.yml',
  staff = 'staff.yml',
  jobs = 'jobs.yml',
  corporateSponsor = 'sponsors.yml',
  session = 'session{MMdd}.html.md',
  schedule = 'index.html.slim'
}

/**
 * 非同期で処理を行うためのQueueのキーを取り扱うenum
 */
export enum Queue {
  speaker = 'speaker-queue',
  keynote = 'keynote-queue',
  staff = 'staff-queue',
  jobs = 'job-queue',
  corporateSponsor = 'corporate-sponsor-queue',
  schedule = 'schedule-queue',
  session = 'session-queue'
}

/**
 * Google Apps Scriptのプロパティのキーを管理するenum
 * GASのプロパティを追加したらこのenumに追加してください。
 */
export enum PropertyKey {
  // Speaker Sheet INFO
  SpeakerSheetID = 'SpeakerSheetID',
  SpeakerSheetName = 'SpeakerSheetName',
  // Staff Sheet INFO
  StaffSheetID = 'StaffSheetID',
  StaffSheetName = 'StaffSheetName',
  // Jobs Sheet INFO
  JobsSheetID = 'JobsSheetID',
  JobsSheetName = 'JobsSheetName',
  // Corporate Sponsor Sheet INFO
  CorporateSponsorSheetID = 'CorporateSponsorSheetID',
  CorporateSponsorSheetName = 'CorporateSponsorSheetName',
  // Timetable Sheet INFO
  TimetableSheetID = 'TimetableSheetID',
  TimetableShhetName = 'TimetableShhetName',
  // Sessions Sheet INFO
  SessionsSheetID = 'SessionsSheetID',
  SessionsSheetName = 'SessionsSheetName',
  // Slack INFO
  SlackWebHookURL = 'SlackWebHookURL',
  SlackOAuthAccessToken = 'SlackOAuthAccessToken',
  SlackToken = 'SlackToken',
  fileUploadChannel = 'SlackFileUploadChannel'
}
