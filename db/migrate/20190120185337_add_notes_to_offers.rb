class AddNotesToOffers < ActiveRecord::Migration[5.2]
  def change
    add_column :offers, :notes, :text
  end
end
