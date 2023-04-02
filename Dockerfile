# ベースイメージを選択
FROM postgres:latest

RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
  && echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen ja_JP.utf8

# 環境変数を設定
ENV LANG=ja_JP.utf8
ENV TZ=UTC
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=blog
ENV BLOG_USER=blog
ENV BLOG_PASSWORD=p@ssw0ord

# 初期スクリプトを追加
COPY init.sql /docker-entrypoint-initdb.d/
