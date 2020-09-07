class Article < ApplicationRecord
  extend Enumerize

  has_many :comments, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  enumerize :visibility, in: %i[public draft], default: :draft

  accepts_nested_attributes_for :comments, allow_destroy: true

  validates :title, presence: true
end
