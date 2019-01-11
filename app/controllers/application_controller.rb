class ApplicationController < ActionController::API
    include DeviseTokenAuth::Concerns::SetUserByToken
    before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(
        :sign_up, 
        keys: [:first_name, :last_name, :cohort, :dob, :college_degree, :employment_status, :sex, :github, :linkedin, :resume, :admin]
        )
    end
  end
  