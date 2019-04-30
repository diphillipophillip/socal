class PlatformsController < ApplicationController


    def new 
        @platform = Platform.new 
    end 

    def create
        @platform = Platform.create(platform_params) 
    end 

    def show 
    end 

    private 

    def platform_params 
        params.require(:platform).permit(:name) 
    end 


end
