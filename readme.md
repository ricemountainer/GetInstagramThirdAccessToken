# 概要
Instagram Graph APIで使用する無期限アクセストークン(第三アクセストークン)を取得するためのツールです。
ついでにInstagram Business User IDも取得します。

# 準備するもの
- Facebook Appの第一アクセストークン
- Facebook AppのApp ID
- Facebook AppのApp Secret

# 使い方
1. `git clone https://github.com/rmblankslash/GetInstagramThirdAccessToken.git`
2. `npm install`
3. `npm start -- [Facebook Appの第一アクセストークン] [Facebook AppのApp ID] [Facebook AppのApp Secret]`
4. 第三アクセストークンとInstagram Business User IDが標準出力されます。
