class CreateInterviews < ActiveRecord::Migration[5.2]
  def change
    create_table :interviews do |t|
      t.date :date
      t.string :title
      t.text :notes
      t.belongs_to :application, foreign_key: true

      t.timestamps
    end
  end
end
