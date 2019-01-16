class Application < ApplicationRecord
  belongs_to :user
  belongs_to :company
  has_many :interviews, dependent: :destroy
  has_many :offers, dependent: :destroy

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

