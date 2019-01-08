class CreateOffers < ActiveRecord::Migration[5.2]
  def change
    create_table :offers do |t|
      t.integer :salary
      t.boolean :accepted
      t.belongs_to :application, foreign_key: true

      t.timestamps
    end
  end
end
