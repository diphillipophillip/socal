class PostsController < ApplicationController 

    before_action :set_post, except: [:new, :create, :index, :published, :logout]


    def new 
        @post = Post.new 
        @platform = Platform.find_by(id: params[:platform_id])
    end 

    def create 
        @post = current_user.posts.create(params.require(:post).permit(:name, :description, :published, :platform_id, :start_time, :end_time))
        @post.images.attach(params[:post][:images]) unless params[:post][:images].blank?
        if @post.valid?
            respond_to do |f| 
                f.html {redirect_to posts_path }
                f.json {render json: @post}
            end 
            
        else 
            render 'posts/new'
        end 
       
    end 

    def index
        
        @posts = current_user.posts 
        respond_to do |f| 
            f.html {render 'posts/index'}
            f.json {render json: @posts, each_serializer: IndexSerializer}
        end 
    end 

    def show 
        @post = Post.find(params[:id]) 
        respond_to do |f| 
            f.html {render :show}
            f.json {render json: @post, serializer: ShowSerializer} 
        end 
    end 

    def edit 
        @post = Post.find(params[:id]) 
        respond_to do |f| 
            f.html {render :edit}
            f.json {render json: @post, serializer: EditFormSerializer} 
        end 
    end 

    def update 
        @post = Post.find_by(id: params[:id])
        @post.update(params.require(:data).permit(:name, :description, :platform_id, :start_time, :end_time)) 
        
        respond_to do |f| 
            f.html {render 'posts/index'}
            f.json {render json: @post} 
            
        end 
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
                f.json { render json: @published_posts, each_serializer: IndexSerializer} 
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