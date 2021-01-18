class Api::UsersController < ApplicationController
  def user_todo_list
    # ユーザ情報を取得してインスタンス変数に格納しておく。
    @users = User.all(); # <= 追加する処理
  end
end
