import React from "react"
import PropTypes from "prop-types"

// 自作コンポーネントはこのように呼び出せます。
import UserBox from "./UserBox"

class Note extends React.Component {
  // コンストラクタ
  constructor(props) {
    // おまじない
    super(props);

    // stateの初期化
    this.state = { users: {}, loading: true, dropHandlers: {}, need_render: false };

    // イベントハンドラのバインド
    this.dropHandlerRegister = this.dropHandlerRegister.bind(this);
    this.onTodoDrop = this.onTodoDrop.bind(this);

  }

  // コンポーネントがマウントされたらデータの取得にいきます。
  componentDidMount() {
    this.getData();
  }

  // need_renderがtrueの場合だけレンダリングを行うようにしました。
  shouldComponentUpdate(nextProps, nextState){
    if (nextState.need_render) {
      return true;
    }

    console.log("** skip rendering **");
    return false;

  }

  // propsで指定されたURLに向かってユーザ毎のタスク一覧をくださいとリクエストを投げます。
  getData() {
    fetch(this.props.user_todos_url)
      .then((response) => response.json())
      .then((json) => {
        // うまくいったら表示データを更新します。
        this.setState({users: json.users, loading: false, need_render: true});
      })
      .catch((response) => {
        console.log('** error **');
      })
  }

  // ユーザの変更をDBに通知します。
  callSwitchUser(todo_id, user_id) {
    var switch_info = { switch_info: { todo_id: todo_id, user_id: user_id } };

    // APIとして作成したswitch_userアクションを呼び出します。
    // propでもらったCSRFトークンをリクエストヘッダに含めることで、更新リクエストを可能としています。
    // エラー処理がログ吐くだけというお粗末なものですが、すいません。
    fetch(this.props.switch_user_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-CSRF-Token": this.props.secure_token
      },
      body: JSON.stringify(switch_info)
    })
    .then(response => response.json())
    .then(json => console.log(JSON.stringify(json)))
    .catch(error_response => console.log(error_response));

  }

  // 各UserBoxにTodoがドロップされた際の処理を登録する処理です。
  dropHandlerRegister(user_id, func) {
    var handlers = this.state.dropHandlers;

    // 該当ユーザIDのハンドラが存在しなければ、stateに追加します。
    // このstate変更による再レンダリングは不要なため、need_renerにはfalseを設定しておきます。
    if ( ! handlers[user_id] ) {
      handlers[user_id] = func;
      this.setState({dropHandlers: handlers, need_render: false});
    }

  }

  // Todoがドロップされた際のイベント処理です。
  onTodoDrop(prev_user_id, next_user_id, todo) {
    // 各UserBoxのハンドラを呼び出します。
    Object.keys(this.state.dropHandlers).map((key) => {
      this.state.dropHandlers[key](prev_user_id, next_user_id, todo);
    });

    // swich_userアクションを呼んで更新を反映します。
    this.callSwitchUser(todo.id, next_user_id);

  }

  // レンダラーです。
  // ユーザ毎にUserBoxを生成しています。
  // dropHandlerRegsterはonTodoDrop時に呼び出す関数を登録してもらうための関数です.
  // onTodoDropは、UserBox内でTodoがドロップされた時に呼び出(CallBack)してもらう関数です。
  // ちなみに、ループして同じコンポーネントをいくつも使う時は、key属性に一意の値を設定しなければなりませんので、ここではユーザIDを設定しています。
  render () {
    return (
      <React.Fragment>
        <div id="NoteTitle">{this.props.title}</div>
        { ! this.state.loading && this.state.users.map((user) => <UserBox user={user} key={user.id} dropHandlerRegister={this.dropHandlerRegister} onTodoDrop={this.onTodoDrop} /> )}
      </React.Fragment>
    );
  }
}

// この下に型チェック用の記述がありましたが、削除してしまいました。

export default Note

