import * as vscode from 'vscode';

const GEMINI_URL = 'https://gemini.google.com';

export function activate(context: vscode.ExtensionContext): void {
  const provider = new GeminiSidebarProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      GeminiSidebarProvider.viewType,
      provider,
      {
        webviewOptions: {
          retainContextWhenHidden: true
        }
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('geminidesk.openSidebar', async () => {
      await vscode.commands.executeCommand('workbench.view.extension.geminidesk');
      await vscode.commands.executeCommand('geminidesk.geminiView.focus');
    })
  );
}

class GeminiSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'geminidesk.geminiView';
  private view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      retainContextWhenHidden: true
    };

    webviewView.webview.html = this.getWebviewHtml(webviewView.webview);
  }

  private getWebviewHtml(webview: vscode.Webview): string {
    const nonce = getNonce();
    const csp = [
      "default-src 'none'",
      "img-src https: data:",
      "script-src 'nonce-" + nonce + "'",
      "style-src 'unsafe-inline'",
      "frame-src https://gemini.google.com"
    ].join('; ');

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="${csp}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GeminiDesk</title>
    <style>
      html,
      body {
        height: 100%;
        padding: 0;
        margin: 0;
        background-color: #1e1f24;
      }
      iframe {
        border: none;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <iframe
      src="${GEMINI_URL}"
      title="Gemini Web"
      allow="clipboard-read; clipboard-write"
    ></iframe>
    <script nonce="${nonce}"></script>
  </body>
</html>`;
  }
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < 32; index += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function deactivate(): void {
  void 0;
}
