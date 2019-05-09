class PlatformsController < ApplicationController


    def index 
        
    end 


    def new 
        @platform = Platform.new 
    end 

    def create
        @platform = Platform.create(platform_params) 
    end 

    def instagram 
        @posts = current_user.posts.where(platform_id: 2)
        
    end 

    def twitter 
        @posts = current_user.posts.where(platform_id: 1)
    end 

    def youtube 
        @posts = current_user.posts.where(platform_id: 3)
    end 

    def show

    end 

    private 

    def platform_params 
        params.require(:platform).permit(:name) 
    end 


end
