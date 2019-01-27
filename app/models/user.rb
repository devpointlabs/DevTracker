# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
  has_many :contacts, dependent: :destroy
  has_many :applications, dependent: :destroy
  has_many :companies, through: :applications
  has_many :todos, dependent: :destroy

  after_create do
    UserMailer.welcome_email(self).deliver_now
  end
end
