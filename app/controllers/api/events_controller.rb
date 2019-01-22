class Api::EventsController < ApplicationController
   before_action :authenticate_user!
   before_action :set_user

   def show
      render json: get_all_events(@user)
   end

   private

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

