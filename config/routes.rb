Rails.application.routes.draw do
  resources :posts
  resources :platforms #do 
    #resources :posts, only: [:new]
  #end 
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #root 'welcome#home'
  root 'users#new'
  get 'login' => 'users#signin'
  post 'login' => 'users#login' 
  get 'published' => 'posts#published'
  get '/auth/facebook/callback' => 'sessions#create'
  get 'logout' => 'posts#logout' 
  get 'youtube' => 'platforms#youtube'
  get 'instagram' => 'platforms#instagram'
  get 'twitter' => 'platforms#twitter'
  
end
