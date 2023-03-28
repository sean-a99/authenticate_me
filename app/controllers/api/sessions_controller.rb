class Api::SessionsController < ApplicationController
  def show
    render json: { user: current_user }
  end

  def create
    @user = User.new(user_params)
  end

  def destroy
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
