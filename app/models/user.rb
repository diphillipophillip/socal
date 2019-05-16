class User < ActiveRecord::Base 
    has_secure_password
    has_many :posts 
    has_many :platforms, through: :posts
    validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence: true, :length => {:within => 4..9}
end 