# React用のAPIとしてrailsを使用する。
# ユーザーデータをJson形式で出力するためのテンプレートファイルとなる。
# jbuilder:RailsのGemfileにデフォルトで含まれている、JSON形式のデータを簡単に作成する事が出来るgemのこと
# JSON:JavaScript Object Notationの略でJavaScriptのオブジェクトの表記法をベースにしたデータフォーマットのこと。

# jbuilderでは好きな形でデータが出力できます。
json.users @users do | user |
  json.id(user.id);
  json.name(user.name);
  json.todos do
    user.todos.each do | todo |
      json.set! todo.id do
        json.id(todo.id);
        json.title(todo.title);
        json.work(todo.work);
        json.due_date(todo.due_date.strftime("%Y-%m-%d"));
      end
    end
  end
end

# こんなイメージのjsonデータになります。
# あとで、IDをキーにタスクデータを取得したいので、ちょっと変な形になってます。
# {
#   users: [ {
#        id: 1
#        name: "Not Assigned"
#        tasks: { 
#          "1" : { id: 1, title: "test001", work: ...},
#          "3" : { id: 3, title: "test003", work: ...}
#        }
#      }, {
#        id: 2
#        name: "Alice"
#        tasks: { 
#          "2" : { id: 2, title: "test002", work: ...}
#        }
#      }
#   ]
# }
