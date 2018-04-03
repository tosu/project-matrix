Rails.application.routes.draw do
  root to: 'matrixes#index'

  resources :matrixes, only: [:index, :create]
end
