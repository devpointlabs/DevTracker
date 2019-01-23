class Api::ContactsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user
  before_action :set_contact, only: [:contact, :destroy]

  def index
    render json: @user.contacts.all
  end

  def create
    contact = @user.contacts.new(contact_params)
    if contact.save
      render json: contact
    else
      render json: contact.errors
    end
  end

  def update
    @contact.save(contact_params)
    if contact.save
      render json: @contact
    else
      render json: {errors: contact.errors}
    end
  end

  def destroy
    @contact.destroy
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_contact
    @contact = @user.contact.find(params[:id])
  end

  def contact_params
    params.require(:contact).permit(:submission_date, :first_name, :last_name, :title, :email, :linkedin, :workphone, :personal_phone, :note_box)
  end
end