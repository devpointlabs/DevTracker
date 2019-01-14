class AddDateToTodo < ActiveRecord::Migration[5.2]
  def change
    add_column :todos, :date, :date
  end
end
