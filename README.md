# GeminiDesk – Gemini Web Sidebar (VS Code Extension)

GeminiDesk は、VS Code の右サイドバーに Gemini Web を常時表示するための拡張機能です。エディタで作業しながら、調査・整理専用の AI として Gemini を活用できます。

## Features

- サイドバーに「Gemini」ビューを追加
- WebView で https://gemini.google.com を表示
- エディタと同時表示が可能
- コマンド「Open GeminiDesk Sidebar」で表示・フォーカス

## Requirements

- VS Code 1.87 以降
- インターネット接続

## Usage

1. VS Code でコマンドパレットを開きます (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. `Open GeminiDesk Sidebar` を実行すると、GeminiDesk のサイドバーを開きます。
3. 必要に応じて右サイドバーへ移動し、常時表示できます。

## Development

```bash
npm install
npm run compile
```

`F5` で Extension Development Host を起動できます。

## Notes

- この拡張は Gemini API を利用しません。
- 認証はブラウザ内で手動で行ってください。
- VS Code WebView の仕様により、一部の Web 機能が制限される場合があります。

## License

MIT
