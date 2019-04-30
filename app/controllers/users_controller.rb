class UsersController < ApplicationController

    def new 
        @user = User.new 
    end 

    def show 
        redirect_to :root unless logged_in? 
        @user = User.find(params[:id]) 
        @posts = @user.posts.all
    end 
    
    def index 
        
    end 
    

    def create 
        if params[:user][:email].empty? || params[:user][:password].nil? 
            redirect_to :root 
        else 
            @user = User.create(user_params)
            session[:user_id] = @user.id 
            redirect_to user_path(@user)
        end 
    end 

    def signin 
        render :login
    end 

    def login 
        @user = User.find_by_email(user_params[:email]) 
        return redirect_to :root unless @user.authenticate(user_params[:password])
        session[:user_id] = @user.id 
        redirect_to user_path(@user)
    end 

  

    private 

        def user_params 
            params.require(:user).permit(:email, :password)
        end 

    

end
