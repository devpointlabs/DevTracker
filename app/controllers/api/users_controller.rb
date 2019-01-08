class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :delete, :update]
  before_action :authenticate_user!

  def index
    render json: User.all
  end
  
  def show 
    render json: @user
  end
  
  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else 
      render json: user.errors, status: 422
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: 422
    end
  end


  def destroy
    @user.destroy
  end


  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :cohort, :dob, :college_degree, :employment_status, :sex, :github, :linkedin, :resume, :admin)
  end
end
