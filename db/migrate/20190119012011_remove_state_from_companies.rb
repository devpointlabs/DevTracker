class RemoveStateFromCompanies < ActiveRecord::Migration[5.2]
  def change
    remove_column :companies, :state, :string
  end
end
