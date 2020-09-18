class Article < ApplicationRecord
  extend Enumerize

  has_many :comments, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  has_one_attached :image

  enumerize :visibility, in: %i[public draft], default: :draft

  accepts_nested_attributes_for :comments, allow_destroy: true
  accepts_nested_attributes_for :taggings, allow_destroy: true
  accepts_nested_attributes_for :image_attachment, allow_destroy: true

  validates :title, presence: true
end
