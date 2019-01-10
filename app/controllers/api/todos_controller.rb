class Api::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  def index
    render json: Todo.all
  end

  def show
    render json: @todo
  end

  def create
    todo = Todo.new(todo_params)

    if todo.save
      render json: todo
    else
      render json: @todo.errors, status: 422
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
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:name, :completed)
  end
end
