class ApplicationController < ActionController::Base

    helper_method :current_user

    def logged_in? 
        !!current_user 
    end 

    def current_user 
        @current_user ||= User.find_by(id: session[:user_id])
    end 

    rescue_from OmniAuth::Strategies::Facebook::NoAuthorizationCodeError, with: :code_missing

    private 

    def code_missing 
        redirect_to 'welcome/home'
    end 
end
