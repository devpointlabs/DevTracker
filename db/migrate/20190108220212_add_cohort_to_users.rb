class AddCohortToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :cohort, :string
  end
end
