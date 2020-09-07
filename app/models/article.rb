class Article < ApplicationRecord
  extend Enumerize

  has_many :comments, dependent: :destroy

  enumerize :visibility, in: %i[public draft], default: :draft

  accepts_nested_attributes_for :comments, allow_destroy: true

  validates :title, presence: true
end
