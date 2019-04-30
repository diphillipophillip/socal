Rails.application.routes.draw do
  resources :posts
  resources :platforms
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #root 'welcome#home'
  root 'users#new'
  get 'login' => 'users#signin'
  post 'login' => 'users#login'
end
