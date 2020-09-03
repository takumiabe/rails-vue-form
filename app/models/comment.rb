class Comment < ApplicationRecord
  belongs_to :article

  has_many_attached :images

  accepts_nested_attributes_for :images_attachments, allow_destroy: true

  validates :name, :body, presence: true
end
