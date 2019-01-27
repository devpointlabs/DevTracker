class UserMailer < ApplicationMailer
  default from: "DevTrackerW18@gmail.com"

  def welcome_email(user)
    @user = user
    @url = "https://dev-tracker19.herokuapp.com/login"
    mail(to: @user.email, subject: "Welcome to DevTracker!")
  end
end
