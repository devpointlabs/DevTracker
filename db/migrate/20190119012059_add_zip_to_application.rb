class AddZipToApplication < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :zip, :string
  end
end
