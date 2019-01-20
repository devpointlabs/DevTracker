class RemoveCityFromCompanies < ActiveRecord::Migration[5.2]
  def change
    remove_column :companies, :city, :string
  end
end
