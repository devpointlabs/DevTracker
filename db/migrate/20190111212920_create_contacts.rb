class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :job
      t.string :title
      t.string :email
      t.string :linkedin
      t.string :workphone
      t.string :personal_phone
      t.string :note_box
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
