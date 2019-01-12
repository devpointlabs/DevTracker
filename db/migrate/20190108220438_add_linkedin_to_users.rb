class AddLinkedinToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :linkedin, :string, default: ""
  end
end
