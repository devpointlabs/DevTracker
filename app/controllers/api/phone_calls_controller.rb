class Api::PhoneCallsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_application
    before_action :set_phone_call, only: [:update, :destroy]

    def index
        render json: @application.phone_calls.all
    end

    def create
        phone_call = @application.phone_call.new(phone_call_params)
        if phone_call.save
            render json: phone_call
        else
            render json: { errors: offer.errors }, status: :unprocessable_entity 
        end
    end

    def update
        if @phone_call.update(phone_call_params)
            render json: @phone_call
        else
            render json: { errors: @phone_call.errors }
        end
    end

    def destroy
        @phone_call.destroy
    end
    
    private
    def set_application
        @application = Application.find(params[:application_id])    
    end

    def set_phone_call
        @phone_call = Phone_Call.
    end

    def phone_call_params
        params.require(:phone_call).permit(:date, :participants, :notes)
    end
end
