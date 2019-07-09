class PublishedIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :pretty_start, :pretty_end
end
