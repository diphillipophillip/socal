class PostsController < ApplicationController 


    def new 
        @post = Post.new 
    end 

    def create 
        @post = Post.create(post_params)
        current_user.posts << @post 
        @platform = Platform.find(params[:post][:platform_id]) 
        @platform.posts << @post
        redirect_to posts_path
    end 

    def index 
        @posts = current_user.posts
    end 

    def show 
        @post = Post.find(params[:id])
    end 

    private 

    def post_params 
        params.require(:post).permit(:name, :description, :start_time, :end_time, :published) 
    end 
    

end 