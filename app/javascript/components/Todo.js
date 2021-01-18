import React from "react"
import PropTypes from "prop-types"

class Todo extends React.Component {
  // コンストラクタです。
  constructor(props) {
    // おまじないです。
    super(props);

    // ドラッグ開始イベントハンドラをバインドします。
    this.onDragStart = this.onDragStart.bind(this);

  }

  // ドラッグ開始イベントハンドラ
  onDragStart(event) {
    // ドラッグを開始したら、現在のpropsに設定されたユーザIDとタスク情報をJSON形式のテキストデータに直してdataTransferにセットします。
    // text/plainですが、JSON.stringify()を使うことでハッシュデータを引き継ぐことができます。
    // (https://stackoverflow.com/questions/9533585/drag-drop-html-5-jquery-e-datatransfer-setdata-with-json)
    var dragData = { now_user_id: this.props.user_id, todo: this.props.todo };
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }

  // レンダラです。
  render () {
    return (
      <React.Fragment>

        <div id={"todo-" + this.props.todo.id} className="Todo" draggable="true" onDragStart={this.onDragStart} >
          <div className="TodoTitle">{this.props.todo.title}</div>
          <div className="TodoDescription">{this.props.todo.description}</div>
          <div className="TodoDueDate">{this.props.todo.due_date}</div>
        </div>

      </React.Fragment>
    );
  }
}

export default Todo