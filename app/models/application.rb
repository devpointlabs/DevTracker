class Application < ApplicationRecord
  belongs_to :user
  belongs_to :company
  has_many :interviews, dependent: :destroy
  has_many :offers, dependent: :destroy
  has_many :calls, dependent: :destroy

  def self.all_data(user)
    select('
      applications.id, 
      applications.submission_date,
      applications.title, 
      applications.status, 
      applications.user_id, 
      applications.created_at, 
      applications.updated_at, 
      applications.posting_url,
      applications.city,
      applications.state,
      c.id AS company_id, 
      c.name AS company_name,
      c.website_url AS company_url
      ')
    .joins('INNER JOIN companies c ON c.id = applications.company_id')
    .where('applications.user_id = ?', user)
    .order('applications.updated_at desc')
  end

  def self.single_record(application_id, user)
    select('
      applications.id, 
      applications.submission_date,
      applications.title, 
      applications.status, 
      applications.user_id, 
      applications.created_at, 
      applications.updated_at, 
      applications.posting_url,
      applications.city,
      applications.state,
      c.id AS company_id, 
      c.name AS company_name,
      c.website_url AS company_url
      ')
    .joins('INNER JOIN companies c ON c.id = applications.company_id')
    .where('applications.user_id = ?', user)
    .where('applications.id = ?', application_id)
    .order('applications.updated_at desc')
  end
end


