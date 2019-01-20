class RemoveNotesFromApplications < ActiveRecord::Migration[5.2]
  def change
    remove_column :applications, :notes, :text
  end
end
