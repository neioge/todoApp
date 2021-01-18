# todo { id: 1, title: "hoge" ...}というような形で返します。
json.todo do
  json.id(@todo.id);
  json.title(@todo.title);
  json.work(@todo.work);
  json.due_date(@work.due_date.strftime("%Y-%m-%d %H:%M:%S"));
  json.user_id(@todo.user.id);
end
