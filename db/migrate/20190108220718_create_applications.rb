class CreateApplications < ActiveRecord::Migration[5.2]
  def change
    create_table :applications do |t|
      t.date :submission_date
      t.text :notes
      t.string :title
      t.string :status
      t.belongs_to :user, foreign_key: true
      t.belongs_to :company, foreign_key: true

      t.timestamps
    end
  end
end
