# @errorsと言う名前の配列にエラー情報を入れてあるので、その中身を出力してあげます。
json.errors @errors do | msg |
  json.message(msg);
end
