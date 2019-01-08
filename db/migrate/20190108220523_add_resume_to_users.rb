class AddResumeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :resume, :string
  end
end
