class UserMailer < ApplicationMailer
  default from: "notifications@example.com"

  def welcome_email(user)
    @user = params[:user]
    @url = "https://dev-tracker19.herokuapp.com/login"
    mail(to: @user.email, subject: "Welcome to DevTracker!")
  end
end
