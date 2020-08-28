class AddSortKeyToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :sort_key, :integer
  end
end
