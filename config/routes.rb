Rails.application.routes.draw do
 
  get 'note/main'
  # Rails APIモードでは、ルーティングが特殊になる。
  namespace :api do
    put 'todos/switch_user'
  end
 
  namespace :api do
    get 'users/user_todo_list'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
