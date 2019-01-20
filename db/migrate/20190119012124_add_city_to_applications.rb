class AddCityToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :city, :string
  end
end
