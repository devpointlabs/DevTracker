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
    user = User.find(params[:id])
    user.email = params[:email] ? params[:email] : user.email
    user.first_name = params[:first_name] ? params[:first_name] : user.first_name
    user.last_name = params[:last_name] ? params[:last_name] : user.last_name
    user.image = params[:image] ? params[:image] : user.image
    user.cohort = params[:cohort] ? params[:cohort] : user.cohort
    user.dob = params[:dob] ? params[:dob] : user.dob
    user.college_degree = params[:college_degree] ? params[:college_degree] : user.college_degree
    user.employment_status = params[:employment_status] ? params[:employment_status] : user.employment_status
    user.sex = params[:sex] ? params[:sex] : user.sex
    user.github = params[:github] ? params[:github] : user.github 
    user.linkedin = params[:linkedin] ? params[:linkedin] : user.linkedin
    user.resume = params[:resume] ? params[:resume] : user.resume
    user.admin = params[:admin] ? params[:admin] : user.admin


    file = params[:file]

    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
        user.image = cloud_image["secure_url"]
      rescue => e
        render json: {errors: e}, status: 422
      end
    end

    if user.save
      render json: user
    else
      render json: {errors: user.errors.full_messages}, status: 422
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
    params.require(:user).permit(:first_name, :last_name, :image, :cohort, :dob, :college_degree, :employment_status, :sex, :github, :linkedin, :resume, :admin)
  end
end
