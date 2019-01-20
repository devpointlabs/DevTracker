class Api::CallsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_application
    before_action :set_call, only: [:update, :destroy]

    def index
        render json: @application.calls.all
    end

    def create
        call = @application.calls.new(call_params)
        if call.save
            render json: call
        else
            render json: { errors: offer.errors }, status: :unprocessable_entity 
        end
    end

    def update
        if @call.update(call_params)
            render json: @call
        else
            render json: { errors: @call.errors }
        end
    end

    def destroy
        @call.destroy
    end

    private

    def set_application
        @application = Application.find(params[:application_id])    
    end

    def set_call
        @call = PhoneCall.find(params[:id])
    end

    def call_params
        params.require(:call).permit(:date, :participants, :notes)
    end
end
