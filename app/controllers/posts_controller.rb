class PostsController < ApplicationController 

    def new 
        @post = Post.new 
        @platform = Platform.find_by(id: params[:platform_id])
    end 

    def create 
        @post = current_user.posts.create(post_params)
        @post.images.attach(params[:post][:images]) unless params[:post][:images].blank?
        if @post.valid?
        redirect_to posts_path 
        else 
            render 'posts/new'
        end 
    end 

    def index 
        @posts = current_user.posts 
    end 

    def show 
        @post = Post.find(params[:id])
    end 

    def edit 
        @post = Post.find(params[:id])
    end 

    def update 
        @post = Post.find(params[:id])
        @post.update(post_params)  
        redirect_to post_path(@post) 
    end 

    def destroy 
        @post = Post.find(params[:id])
        @post.destroy 
        redirect_to posts_path
    end 

    def published 
        @published_posts = Post.published
        render 'posts/published'
    end 

    def logout 
        session.delete :user_id 
        redirect_to :root 
    end 

    private 

    def post_params 
        params.require(:post).permit(:name, :description, :start_time, :end_time, :published, :platform_id) 
    end 
    

end 