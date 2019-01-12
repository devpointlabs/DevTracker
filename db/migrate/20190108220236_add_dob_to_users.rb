class AddDobToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :dob, :date, default: "01-01-01"
  end
end
