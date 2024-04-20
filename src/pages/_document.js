import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <script src="http://colorserver2019.colorplus.de:49153/socket.io/socket.io.js" /> */}
        <script src="http://10.10.10.3:8082/socket.io/socket.io.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
