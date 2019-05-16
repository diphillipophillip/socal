class SessionsController < ApplicationController


    def create
      @user = User.find_or_create_by(uid: auth['uid']) do |u|
        u.name = auth['info']['name']
        if auth['info']['email']  
          u.email = "#{SecureRandom.alphanumeric}@facebook.com" 
        end 
        u.image = auth['info']['image']
        u.password = "#{rand(+1000000)}"
        
      end
      
      session[:user_id] = @user.id
   
      render 'users/show'
    end
   
    private
   
    def auth
      request.env['omniauth.auth']
    end
  end