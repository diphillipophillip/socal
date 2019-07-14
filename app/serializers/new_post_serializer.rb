class NewPostSerializer < ActiveModel::Serializer
  attributes :id, :name, :pretty_start, :pretty_end, :description, :platform, :published
  belongs_to :user
  belongs_to :platform
end
