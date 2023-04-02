-- blogデータベースにアクセスするユーザーblogを作成し、パスワードを設定
CREATE USER blog WITH PASSWORD 'p@ssw0ord';

-- blogデータベースへの権限をblogユーザーに付与
GRANT ALL PRIVILEGES ON DATABASE blog TO blog;
