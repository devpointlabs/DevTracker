# 20.times do
#   user = User.create(
#     first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name,
#     nickname: Faker::Ancient.god,
#     image: Faker::Placeholdit.image,
#     email: Faker::Internet.email,
#     password: "password",
#     cohort: "Winter-18",
#     github: Faker::Internet.url,
#     linkedin: Faker::Internet.free_email,
#     resume: "resume",
#     dob: Faker::Date.birthday(18, 65),
#     college_degree: Faker::Educator.course,
#     employment_status: false,
#     sex: Faker::Gender.binary_type,
#     admin: false,
#   )

#   5.times do
#     company = Company.create(
#       name: Faker::Company.name,
#       city: Faker::Address.city,
#       state: Faker::Address.state_abbr,
#       zip: Faker::Address.zip[0...5].to_i,
#       website_url: Faker::Internet.domain_name,
#       )

#     application = Application.create(
#       submission_date: Faker::Date.between(2.days.ago, Date.today),
#       notes: Faker::FamousLastWords.last_words,
#       title: Faker::Job.title,
#       status: false,
#       user_id: user.id,
#       company_id: company.id,
#       )
    
#     interview = Interview.create(
#       date: Faker::Date.forward(23),
#       title: Faker::Job.title,
#       notes: Faker::DumbAndDumber.quote,
#       application_id: application.id,
#       )

#     offer = Offer.create(
#       salary: Faker::Commerce.price,
#       accepted: false,
#       application_id: application.id,
#       )
#   end
# end