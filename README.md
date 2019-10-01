# website-tool
- PMConf WEBサイトパーツ作成スクリプト

## Tech Stack
- [google/clasp](https://github.com/google/clasp)
- [webpack](https://webpack.js.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [TSLint](https://palantir.github.io/tslint/)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)

## このプログラムでやってくれること
- 以下のファイルの作成
  - [x] speakers.yml
  - [x] staff.yml
  - [x] corporate-sponsor.yml
  - [x] personal-sponsor.yml
  - [x] jobs.yml
  - [ ] index.html.slim
  - [ ] 2019-11-XX-sessionXXXX.html.md

## 開発環境構築

### nodeが使える環境を作る
- [nodenv](https://github.com/nodenv/nodenv) あたりでやっておけば良さそう

### claspのインストール
- `clasp` を `npm` でインストールする

```
npm i @google/clasp -g
```

### リポジトリをcloneする

```
git clone git@github.com:pmconfjp/website-tool.git
```

### 依存ライブラリのインストール
- `npm` で開発に必要なライブラリをインストール

```
cd <this repository dir>
npm install
```

### claspにログイン(claspを初めてインストールした場合)
- デプロイのためにclaspにログインする必要がある 
- `npm bin -g` がPATHに入っていないなら設定してください
  - `export PATH=$PATH:$(npm bin -g)`
- ブラウザが開いて、色々と許可を求められるので設定
  - Gsuiteじゃない場合、左下にある **安全でないサイトを開く** みたいな感じのリンクをクリックしないといけない 

```
clasp login
```

### Google Apps Script API の設定
- 以下のURLの設定をONにする
  - https://script.google.com/home/usersettings

## コマンド
### ビルド
- ビルドのみを行いたい場合に実行する

```
npm run build
```

### デプロイ
- 既存のscriptを指定した場合、上書きするので注意

```
// ビルドとデプロイを一緒にやりたい場合
npm run deploy
```

```
// デプロイのみを行いたい場合
clasp push
```

## Script Propertyに設定
- セキュリティ的に表に出したくない情報は全てGASのプロパティとして保存している
  - プログラム実行前に画面で登録する必要がある
  - `[ファイル]`　-> `[プロジェクトのプロパティ]`　-> `[スクリプトのプロパティ]`
  - キー名はプログラム内で指定しているので、間違えないようにしてください
- GASそのもののキーは晒してしまうが、Googleの認証が挟まるので良しとする

## Spreadsheetからローカルにファイルダウンロードの対応
### scriptの設定
- 既にバージョンを設定している場合この作業は必要ない
  - `[ファイル]`　-> `[版を管理...]` で設定
  - `[ファイル]`　-> `[プロジェクトのプロパティ]` -> `[情報]`　の `スクリプトID` をコピー
### Spreadsheetの設定
- `[ツール]`　-> `[スクリプトエディタ]`
- `[リソース]` -> `[ライブラリ]` -> ライブラリを追加の欄にコピーした `スクリプトID` をペースト
- 作成したバージョンを指定する
- `コード.gs` に `/extra/gas/{対象のスクリプト}.gas` の内容を貼り付ける
- `[ファイル]`　-> `[新規作成]` -> `[HTMLファイル]`
- 作成したHTMLに `/extra/html/download.html` の内容をペースト
- 適当なオブジェクトを作成して `スクリプトを割当て` で　`main` を入力し設定
- 以降対象のオブジェクトをクリックするとダウンロードできる