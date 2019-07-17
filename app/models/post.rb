class Post < ApplicationRecord
    belongs_to :user 
    belongs_to :platform
    scope :published, -> { where(published: true) }
    has_many_attached :images
    validates :name, presence: true
    validates :description, presence: true, :length => {:within => 10..50}



    def pretty_start 
        if !start_time.nil?
            start_time.strftime("%b %d %Y %l:%M %p")
        else
            ""
        end
    end 


    def pretty_end 
        if !end_time.nil?
            end_time.strftime("%b %d %Y %l:%M %p")
        else
            ""
        end
    end 
    
end
