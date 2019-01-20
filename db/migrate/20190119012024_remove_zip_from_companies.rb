class RemoveZipFromCompanies < ActiveRecord::Migration[5.2]
  def change
    remove_column :companies, :zip, :string
  end
end
