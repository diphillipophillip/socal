class Platform < ApplicationRecord
    has_many :posts 
    has_many :users, through: :posts


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
