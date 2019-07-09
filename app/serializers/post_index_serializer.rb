class PostIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :end_time
end
