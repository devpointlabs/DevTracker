class Api::OffersController < ApplicationController
    before_action :authenticate_user!
    before_action :set_user
    before_action :set_offer, only: [:update, :destroy]

    def index
        render json: @user.offers.all
    end

    def create
        offer = @user.offer.new(offer_params)
        if offer.save
            render json: offer
        else
            render json: { errors: offer.errors }, status: :unprocessable_entity 
        end
    end

    def update
        if offer.update(offer_params)
            render json: @offer
        else
            render json: { errors: offer.errors }
        end
    end

    def destroy
        @offer.destroy
    end
    
    private

    def offer_params
        params.require(:offer).permit(:salary, :accepted)
    end

    def set_user
        @user = User.find(params[:user_id])
    end

    def set_offer
        @offer = Offer.find(params[:id])
    end

end
