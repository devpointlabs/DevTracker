class RemoveJobFromContact < ActiveRecord::Migration[5.2]
  def change
    remove_column :contacts, :job, :string
  end
end
