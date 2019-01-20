class RemoveZipFromApplications < ActiveRecord::Migration[5.2]
  def change
    remove_column :applications, :zip, :string
  end
end
