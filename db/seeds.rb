10.times do
  company = Company.new(
    name: Faker::Company.name,
    email: Faker::Internet.email,
    address: Faker::Address.street_address
  )
  company.save

  5.times do
    interview = Interview.new
      name: 
end