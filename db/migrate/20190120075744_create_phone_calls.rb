class CreatePhoneCalls < ActiveRecord::Migration[5.2]
  def change
    create_table :phone_calls do |t|
      t.date :date
      t.string :participants
      t.text :notes
      t.belongs_to :application, foreign_key: true

      t.timestamps
    end
  end
end
