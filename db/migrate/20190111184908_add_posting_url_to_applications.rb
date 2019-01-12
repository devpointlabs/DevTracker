class AddPostingUrlToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :posting_url, :string
  end
end
