class Application < ApplicationRecord
  belongs_to :user
  belongs_to :company

  def self.all_data(user)
    select('
      applications.id, 
      applications.submission_date, 
      applications.notes, 
      applications.title, 
      applications.status, 
      applications.user_id, 
      applications.created_at, 
      applications.updated_at, 
      applications.posting_url, 
      c.id AS company_id, 
      c.name AS company_name, 
      c.city AS company_city, 
      c.state AS company_state, 
      c.zip AS company_zip, 
      c.website_url AS company_url
      ')
    .joins('INNER JOIN companies c ON c.id = applications.company_id')
    .where('applications.user_id = ?', user)
    .order('applications.updated_at desc')
  end
end


# create_table "applications", force: :cascade do |t|
#   t.date "submission_date"
#   t.text "notes"
#   t.string "title"
#   t.string "status"
#   t.bigint "user_id"
#   t.bigint "company_id"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.string "posting_url"
#   t.index ["company_id"], name: "index_applications_on_company_id"
#   t.index ["user_id"], name: "index_applications_on_user_id"
# end

# create_table "companies", force: :cascade do |t|
#   t.string "name"
#   t.string "city"
#   t.string "state"
#   t.string "zip"
#   t.string "website_url"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
# end

