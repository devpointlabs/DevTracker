class Api::CompaniesController < ApplicationController
  beore_action :set_company, only: [:show, :update, :edit, :destroy]

  def index
    @companies = Company.all
  end

  def show
  end

  def new
    @company = Company.new
  end

  def edit
  end
  
  def create
    @company = Company.new(company_params)

    if @company.save
      redirect_to companies_path
    else 
      render :new
    end
  end

  def update
    if @company.update(company_params)
      redirect_to @company
    else
      render :edit
    end
  end

  def destroy
    @company.destroy
    redirect_to companies_path
  end

  private

    def set_company
      @company = Company.find(params[:id])
    end

    def company_params
      params.require(:company).permit(:name)
    end
end