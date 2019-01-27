class TodoMailer < ApplicationMailer
  default from: "DevTrackerW18@gmail.com"

  def todo_email(user, todo)
    @todo = todo
    @url = "https://dev-tracker19.herokuapp.com/login"
    mail(to: @user.email, subject: "Todo was added.")
  end
end
