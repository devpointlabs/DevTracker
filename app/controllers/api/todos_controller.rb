class Api::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  def index
    render json: current_user.todos.all
  end

  def show
    render json: @todo
  end

  def create
    todo = current_user.todos.new(todo_params)

    if todo.save
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: 422
    end
  end

  def destroy
    @todo.destroy
  end

  private

  def set_todo
    @todo = current_user.todos.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:name, :completed, :date)
  end
end
