class PlatformsController < ApplicationController


    def index 
        
    end 


    def new 
        @platform = Platform.new 
    end 

    def create
        @platform = Platform.create(platform_params) 
    end 

    def show
        @posts = current_user.posts.where(platform_id: params[:id])
        @platform_id = Platform.find_by(id: params[:id])
        @platform = @platform_id.name 
        respond_to do |f| 
            f.html {render :show} 
            f.json {render json: @posts, each_serializer: PlatformSerializer }
        end 
    end

    def instagram
        @platform_id = Platform.find(2)
        @posts = current_user.posts.where(platform_id: 2)
    end 

    def twitter 
        @platform_id = Platform.find(1)
        @posts = current_user.posts.where(platform_id: 1)
    end 

    def youtube 
        @platform_id = Platform.find(3)
        @posts = current_user.posts.where(platform_id: 3)
    end 

    private 

    def platform_params 
        params.require(:platform).permit(:name) 
    end 


end
