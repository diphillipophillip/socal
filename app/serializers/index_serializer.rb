class IndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :pretty_start, :pretty_end, :platform, :description, :published
end
