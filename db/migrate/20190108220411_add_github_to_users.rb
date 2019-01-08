class AddGithubToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :github, :string
  end
end
