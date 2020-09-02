class Comment < ApplicationRecord
  belongs_to :article

  validates :name, :body, presence: true
end
