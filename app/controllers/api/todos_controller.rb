class Api::TodosController < ApplicationController

  # タスク押し付け処理
  def switch_user
    # エラーメッセージを入れるための配列を用意しておきます。
    @errors = [];

    # 許可済みのパラメータを生成します。(switch_uesr_params()というprivateメソッドを追加しておきました。)
    suparam = switch_user_params();

    begin
      # タスクデータを取得
      @todo = Todo.find(suparam[:todo_id]);

      # ユーザデータを取得
      @user = User.find(suparam[:user_id]);

      # タスク所有者を変更
      @todo.user = @user;

      # タスクデータを更新
      if ! @todo.save then
        # 失敗したら、show_errorというテンプレートを使ってエラー情報を返すようにしました。
        @errors.push("failed to switch user: todo.save() faield");
        render :show_error
      end

    rescue => ex
      # 例外発生時もshow_errorというテンプレートを使って例外メッセージを返すようにしました。
      @errors.push("failed to switch user: an exception occurred.");
      @errors.push(ex.to_s);
      render :show_error
    end

  end

  private
    # todo_idとuser_idだけを許可済みパラメータとして返します。
    def switch_user_params()
      return params.require(:switch_info).permit(:todo_id, :user_id);
    end

end
