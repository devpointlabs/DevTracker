class Api::NotesController < ApplicationController
   before_action :authenticate_user!
   before_action :set_application
   before_action :set_note, only: [:update, :destroy]

   def index
      render json: @application.notes.all
   end

   def create
      note = @application.notes.new(note_params)
      if note.save
         render json: note
      else
         render json: { errors: note.errors }, status: :unprocessable_entity 
      end
   end

   def update
      if note.update(note_params)
         render json: @note
      else
         render json: { errors: note.errors }
      end
   end

   def destroy
      @note.destroy
   end

   private
   def note_params
      params.require(:note).permit(:body, :application_id)
   end

   def set_application
      @application = Application.find(params[:application_id])
   end

   def set_note
      @note = Note.find(params[:id])
   end
end

