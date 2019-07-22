class EditFormSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :platform, :published, :pretty_start, :pretty_end, :formatted_start_time, :formatted_end_time


  def formatted_start_time 
    object.start_time.strftime("%Y-%m-%dT%H:%M")
  end 

  def formatted_end_time
    object.end_time.strftime("%Y-%m-%dT%H:%M")
  end 



end
