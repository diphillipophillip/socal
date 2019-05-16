class Post < ApplicationRecord
    belongs_to :user 
    belongs_to :platform
    scope :published, -> { where(published: true) }
    has_many_attached :images
    validates :name, presence: true
    validates :description, presence: true, :length => {:within => 10..50}
    
end
