class AddEmploymentStatusToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :employment_status, :string, default: ""
  end
end
