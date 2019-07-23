class PlatformSerializer < ActiveModel::Serializer
  attributes :id, :name, :pretty_start, :pretty_end, :description, :published
end
