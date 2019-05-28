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
        @user = User.create(user_params)
        if @user.valid?
            session[:user_id] = @user.id 
            redirect_to user_path(@user)
            
        else
            render "users/new"
        end 
    end 

    def signin 
        render :login
    end 

    def login 
        @user = User.find_by_email(user_params[:email]) 
        return redirect_to :root unless @user && @user.authenticate(user_params[:password])
        session[:user_id] = @user.id 
        redirect_to posts_path
    end 

  

    private 

        def user_params 
            params.require(:user).permit(:email, :password)
        end 

    

end
