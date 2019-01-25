class Api::ContactsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user
  before_action :set_contact, only: [:update, :destroy]

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
    if @contact.update(contact_params)
      render json: @contact
    else
      render json: {errors: @contact.errors}
    end
  end

  def destroy
    @contact.destroy
  end

  private

  def set_user
    @user = current_user
  end

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def contact_params
    params.require(:contact).permit(:submission_date, :first_name, :last_name, :title, :company, :email, :linkedin, :workphone, :personal_phone, :note_box)
  end
end