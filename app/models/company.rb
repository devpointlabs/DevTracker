class Company < ApplicationRecord
    has_many :applications
    has_many :users, through :applications
end
