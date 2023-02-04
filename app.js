// http Webでデータをやり取りするための約束事を使ってやり取りを行う機能
const http = require("http");
// fs ファイルにアクセスして内容を読み込んだり、亜フィルに書き出したりといった機能
const fs = require("fs");
// URLのテキストから特定の値を取り出す
const url = require("url");

// htmlファイルの読み込み
// readFileSync 指定したファイルの内容を読み込む
const html = fs.readFileSync("./index.html", "UTF-8");

// createServer serverオブジェクトを作成
const server = http.createServer((req, res) => {
  // parse アクセスしたURLのテキストを分解し、部分ごとに分解したオブジェクトを作成
  const address = url.parse(req.url);
  // writeHead ヘッダー情報を出力
  // 第一引数にステータス番号、第二引数に出力するヘッダー情報をオブジェクトにまとめたものを書く
  // "Content-Type": "text/html" 送信されるコンテンツがHTMLであることを知らせる
  res.writeHead(200, { "Content-Type": "text/html" });
  // パスごとの分岐
  // pathname URLのパス(/より後ろのテキスト)
  switch (address.pathname) {
    // "/"だったときは
    case "/":
      // write クライアントに出力を行う。何度でも呼び出し書き出せる
      res.write(html);
      break;
    // case以外のパスが来たらNO PAGEを出力
    default:
      res.write("<html><body><h1>NO PAGE.</h1></body></html>");
  }
  // 出力を終了
  res.end();
});
server.listen(3000);
console.log("Start server http://localhost:3000/");

// 自分の手作業で表示までさせるのはかなり手間がかかる
