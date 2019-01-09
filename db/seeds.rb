10.times do
  application = Application.new(
    submission_date: Faker::Date.between(2.days.ago, Date.today),
    notes: Faker::FamousLastWords,
    title: Faker::Job.title,
    status: false,
    company_id: Faker::Company.name,
  )
  application.save

10.times do
  company = Company.new(
    name: Faker::Company.name,
    city: Faker::Address.city,
    state: Faker::Address.state,
    zip: Faker::Address.zip,
    website_url: Faker::Internet.domain_name,
  )
  company.save

  5.times do
    interview = Interview.new(
      date: Faker::Date.forward(23),
      title: Faker::Job.title,
      notes: Faker::DumbAndDumber.quote,
      application_id: Faker::IDNumber.invalid,
    )
    interview.save

  15.times do
    offer = Offer.new(
      salary: Faker::Commerce.price,
      accepted: false,
      application_id: Faker::IDNumber.invalid,
    )
  offer.save

  20.times do
    user = User.new(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      nickname: Faker::Ancient.god,
      image: Faker::Placeholdit.image,
      email: Faker::Internet.email,
      cohort: Winter-18,
      dob: Faker::Date.birthday(18, 65),
      college_degree: Faker::Educator.course,
      employment_status: false,
      sex: Faker::Gender.binary_type,
      admin: false,
    )
    user.save
end