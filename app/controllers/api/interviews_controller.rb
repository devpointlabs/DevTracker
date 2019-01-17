class Api::InterviewsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_application
    before_action :set_interview, only: [:update, :destroy]

    def index
        render json: @application.interviews.all
    end

    def create
        interview = @application.interview.new(interview_params)
        if interview.save
            render json: offer
        else
            render json: {errors: interview.errors}, status: :unprocessable_entity
        end
    end

    def update
        if @interview.update(interview_params)
            render json: @interview
        else
            render json: {errors: @interview.errors}
        end
    end

    def destroy
        @interview.destroy
    end

    private

    def interview_params
        params.require(:interview).permit(:date, :title, :notes)
    end

    def set_application
        @application = Application.find(params[:application_id])
    end

    def set_interview
        @interview = Interview.find(params[:id])
    end
end
