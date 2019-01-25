class RemoveWorkphoneFromContact < ActiveRecord::Migration[5.2]
  def change
    remove_column :contacts, :workphone, :string
  end
end
