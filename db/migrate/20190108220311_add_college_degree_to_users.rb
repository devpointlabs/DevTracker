class AddCollegeDegreeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :college_degree, :string, default:  ""
  end
end
