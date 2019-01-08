class Api::CompaniesController < ApplicationController
  before_action :set_company, only: [:update, :destroy]

  def index
    render json: Company.all
  end

  def create
    company = Company.new(company_params)

    if company.save
      render json: company
    else 
      render json: company.errors, status: 422
    end
  end

  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: 422
    end
  end

  def destroy
    @company.destroy
  end

  private

    def set_company
      @company = Company.find(params[:id])
    end

    def company_params
      params.require(:company).permit(:name, :city, :state, :zip, :website_url)
    end
end