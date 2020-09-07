class AddVisibilityToArticles < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :visibility, :string
  end
end
