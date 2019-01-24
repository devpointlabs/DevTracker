Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"

  namespace :api do
    resources :users do
      resources :applications
      resources :todos
      resources :contacts
    end
    resources :companies
    resources :applications do
      resources :interviews
      resources :offers
      resources :calls
      resources :notes
    end
  end

  namespace :api do
    resources :user do
      resource :events, only: %w(show)
    end
  end

  # Routes for custom stats for User Dashboard
  get '/api/user/dashboard/stats', to: 'api/events#user_stats'

  get '*other', to: 'static#index'
end
