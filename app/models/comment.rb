class Comment < ApplicationRecord
  extend Enumerize

  belongs_to :article

  has_many_attached :images

  enumerize :visibility, in: %i[public secret], default: :public

  accepts_nested_attributes_for :images_attachments, allow_destroy: true

  validates :name, :body, presence: true
end
