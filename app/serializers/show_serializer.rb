class ShowSerializer < ActiveModel::Serializer
  attributes :id, :pretty_start, :pretty_end, :description, :name

end
