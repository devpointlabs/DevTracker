class AddCohortToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :cohort, :date, default: "01-01-01" 
  end
end
