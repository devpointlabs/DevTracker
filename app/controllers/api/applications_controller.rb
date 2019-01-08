class Api::ApplicationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, except: [:index]

  def index
    render json: Application.all
  end

  def my_applications
    render json: @user.posts
  end

  def create
    post = @user.applications.new(application_params)
    if application.save
      render json: application
    else
      render json: application.errors
    end
  end

  def update
  end

  def destroy
    @application.destroy
  end

  def show
  end

  def destroy
    @application.destroy
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end
end
