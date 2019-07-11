class PostsController < ApplicationController 

    before_action :set_post, except: [:new, :create, :index, :published, :logout]


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
        respond_to do |f| 
            f.html {render :show}
            f.json {render json: @post, serializer: ShowSerializer} 
        end 
    end 

    def edit 
        
    end 

    def update 
        @post.update(post_params)  
        redirect_to post_path(@post) 
    end 

    def destroy 
        @post.destroy 
        redirect_to posts_path
    end 

    def published  
        @published_posts = if params[:search]
            current_user.posts.published.where('name LIKE ?', "%#{params[:search]}%")
          else
            current_user.posts.published
          end
        if @published_posts.length != 0
            respond_to do |f| 
                f.html { render 'posts/published' }
                f.json { render json: @published_posts, each_serializer: PublishedIndexSerializer} 
            end 
        else 
        @error = "Post Not Found"
            respond_to do |f| 
                f.html { render 'posts/published' }
                f.json { render json: {statusText: @error}, status: :not_found } 
            end 
        end 
        
    end 

    def logout 
        session.delete :user_id 
        redirect_to :root 
    end 

    private 

    def set_post 
        @post = Post.find(params[:id])
    end 

    def post_params 
        params.require(:post).permit(:name, :description, :start_time, :end_time, :published, :platform_id) 
    end 
    

end 