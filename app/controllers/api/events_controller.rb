class Api::EventsController < ApplicationController
   before_action :authenticate_user!
   before_action :set_user

   def show
      render json: get_all_events(@user)
   end

   def user_stats
      render json: get_user_stats(@user)
   end

   private

   def get_user_stats(user)
      interviews = []
      applications = []
      offers = []
      # applications = {applications: @user.applications.count}
      apps = @user.applications
      apps.each {|a| applications << a}
      apps.each do |app|
         results = app.interviews
         results.each {|i| interviews << i}
      end
      apps.each do |app|
         results = app.offers
         results.each {|o| offers << o}
      end
      return {interviews: interviews.size, applications: applications.size, offers: offers.size}
   end

   def get_all_events(user)
      # SELECT ALL USER'S INTERVIEWS
      interviews = Interview.select('
         interviews.id AS interview_id,
         interviews.date AS date,
         interviews.title AS interview_title,
         interviews.notes AS interview_notes,
         c.name AS company_name,
         c.id AS company_id,
         a.id AS application_id
      ')
      .joins('INNER JOIN applications a ON a.id = interviews.application_id')
      .joins('INNER JOIN companies c ON c.id = a.company_id')
      .where('a.user_id = ?', user.id)
      .order('interviews.date DESC')

      # SELECT ALL USER'S PHONE CALLS
      phone_calls = Call.select('
         calls.id AS call_id,
         calls.date AS date,
         calls.participants AS call_participants,
         calls.notes AS calls_notes,
         c.name AS company_name,
         c.id AS company_id,
         a.id AS application_id
      ')
      .joins('INNER JOIN applications a ON a.id = calls.application_id')
      .joins('INNER JOIN companies c ON c.id = a.company_id')
      .where('a.user_id = ?', user.id)
      return phone_calls + interviews
   end

   def set_user
      @user = current_user
   end
end

