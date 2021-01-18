import React from "react"
import PropTypes from "prop-types"
import Todo from "./Todo"

// ユーザ毎の箱を表示します。
class UserBox extends React.Component {

  // コンストラクタです。
  constructor(props) {
    // おまじない。
    super(props);

    // 一つもタスクを持たないユーザの場合、user.todosがnullになってしまうため、
    // nullの場合は空のハッシュを割り当てています。
    var todos = this.props.user.todos ? this.props.user.todos : {};

    // タスクのリストをstateに突っ込みます。
    this.state = { todos: todos };

    // イベントハンドラのバインド
    this.onDrop = this.onDrop.bind(this);
    this.updateTodoList = this.updateTodoList.bind(this);
    this.preventDefault = this.preventDefault.bind(this);

    // Noteに対して、自身のupdateTodoList関数を登録します。
    // (これにより、タスクの所有者変更を通知してもらおうという算段です。)
    this.props.dropHandlerRegister(this.props.user.id, this.updateTodoList);

  }

  // ドラッグオーバー時の通常イベント処理を抑止するための処理です。
  // これやらないとドロップできないようです。
  preventDefault(event) {
    event.preventDefault();
  }

  // ドロップイベント処理
  onDrop(event) {
    // dataTransferにセットされたデータ(変更前ユーザIDと対象タスク情報)を取得します。
    var dropData = JSON.parse(event.dataTransfer.getData('text/plain'));

    // NoteのonTodoDropを呼び出してあげます。
    // こうすると、NoteからupdateTodoListが呼ばれるのでした。 
    this.props.onTodoDrop(dropData.now_user_id, this.props.user.id, dropData.todo);

  }

  // タスク一覧更新処理
  // prev_user_id: 以前のユーザID
  // next_user_id: 変更後のユーザID
  // todo: 対象タスク
  updateTodoList(prev_user_id, next_user_id, todo) {
    // ユーザIDが変わらない時は何もしません。
    if (prev_user_id == next_user_id) {
      return;
    }

    // 以前のユーザIDと自分のユーザIDが等しい時。
    // それは、自分からそのタスクを削除する時です。
    if (prev_user_id == this.props.user.id) {
      // 自分のタスクを押し付けたので、自分のタスク一覧から削除しよう。
      this.deleteTodo(todo.id);
    }

    // 変更後のユーザIDが自身のユーザIDの時。
    // それはあなたに仕事が押し付けられた時です。
    if (next_user_id == this.props.user.id) {
      // 押し付けられた仕事を自分のタスク一覧に追加しよう。
      this.addTodo(todo);
    } 

  }

  // タスク削除処理
  deleteTodo(todo_id) {
    var todos = this.state.todos;

    // 削除対象IDのタスクをリストから削除します。
    // タスク一覧をKey-Value形式で持ってたのはこのためです。
    // ハッシュにしておくことで検索する手間を省いてます。
    delete todos[todo_id];

    // stateを更新します。（これで再描画してもらおう)
    this.setState({todos: todos});

  }

  // タスク追加処理
  addTodo(todo) {
    var todos = this.state.todos;

    // イヤイヤながらタスクを追加します。
    todos[todo.id] = todo;

    // stateを更新します。（これで再描画してもらおう)
    this.setState({todos: todos});

  }

  // レンダラーです。
  render () {
    return (
      <React.Fragment>
        <div id={"user-" + this.props.user.id} className="UserBox" onDrop={this.onDrop} onDragOver={this.preventDefault} >
          <div className="UserName">{this.props.user.name}</div>
          <div className="TodoArea">
            { Object.keys(this.state.todos).map((key) => <Todo user_id={this.props.user.id} todo={ this.state.todos[key] } key={ key } /> ) }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserBox
