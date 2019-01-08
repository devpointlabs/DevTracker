Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :users do
      resources :applications do
        resources :interviews
        resources :offers
      end
    end
    resources :companies
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
