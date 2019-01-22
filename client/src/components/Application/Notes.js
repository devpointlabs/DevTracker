import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addNote, deleteNote } from "../../reducers/notes";
import { updateTime } from '../../reducers/applications';
import alert from "sweetalert2";
import moment from "moment";

class Notes extends Component {
   state = {
      body: ""
   };

   handleChange = ({ target: { name, value } }) =>
      this.setState({ [name]: value });

   handleSubmit = e => {
      let { dispatch, application } = this.props;
      e.preventDefault();
      dispatch(addNote({ ...this.state }, application.id));
      alert(
         "Success",
         `Note added for ${application.company_name}!`,
         "success"
      );
      this.setState({
         body: ""
      });
   };


   handleDelete = (id) => {
    let {application, user, dispatch } = this.props;
    alert.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this note?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10ac84',
        cancelButtonColor: '#ee5253',
        confirmButtonText: 'Yes, remove it!'
      }).then(res => {
        if(res.value) {
          dispatch(deleteNote(application.id, id));
          dispatch(updateTime(user, application.id));
          alert(
            "Success",
            "Note successfully removed!",
            "success"
          )
        }
      })
   }

   render() {
      let { notes, application } = this.props;
      let { body } = this.state;
      notes.sort(function(a, b) {
        if (a.updated_at > b.updated_at) return -1;
        if (a.updated_at < b.updated_at) return 1;
        return 0;
     });
      return (
         <NotesContainer>
            <SectionTitle>Notes for {application.company_name}</SectionTitle>
            <NotesContent>
               <NotesList>
                  {notes.length === 0 ? (
                     <NoNotes>No notes currently to display</NoNotes>
                  ) : null}
                  {notes.length > 0 ? (
                     <>
                        {notes.map(note => {
                           return (
                              <Note key={note.id}>
                                 <DeleteNote onClick={() => this.handleDelete(note.id)}>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 512 512"
                                    >
                                       <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                                    </svg>
                                 </DeleteNote>
                                 <NoteDate>
                                    {moment(note.created_at).calendar()}
                                 </NoteDate>
                                 <NoteBody>{note.body}</NoteBody>
                              </Note>
                           );
                        })}
                     </>
                  ) : null}
               </NotesList>
               <NewForm onSubmit={this.handleSubmit}>
                  <TextArea
                     value={body}
                     name="body"
                     placeholder="Add a new note here..."
                     onChange={this.handleChange}
                     required
                  />
                  <Input type="submit" value="Add Note" />
               </NewForm>
            </NotesContent>
         </NotesContainer>
      );
   }
}

const DeleteNote = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    cursor: pointer;
    fill: #ccc;
    transition: 0.3s linear;
    svg {
        width: 15px;
        height: 15px;
    }
    &:hover {
        fill: red;
    }
`;

const Note = styled.li`
   width: 100%;
   padding: 1em;
   background-color: rgba(0, 0, 0, 0.02);
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   position: relative;
   &:not(:first-child) {
      margin-top: 1em;
   }
`;

const NoteDate = styled.p`
   font-size: 12px;
   color: #b3b3b3;
   margin-bottom: 5px;
`;

const NoteBody = styled.p`
   font-size: 14px;
   color: #666;
`;

const NoNotes = styled.p`
   font-size: 14px;
   color: #666;
   background-color: rgba(0, 0, 0, 0.03);
   padding: 1em;
   border-radius: 5px;
`;

const NotesContainer = styled.div`
   padding: 1.25em;
   border-radius: 5px;
   width: 100%;
   background-color: white;
   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);
   position: relative;
   margin-top: 1em;
`;

const SectionTitle = styled.h3`
   font-weight: lighter;
   font-family: "Open Sans", sans-serif;
   color: #666;
   width: 100%;
`;

const NotesContent = styled.div`
   display: grid;
   grid-template-columns: 1.5fr 1fr;
   grid-gap: 1em;
`;

const NewForm = styled.form`
   margin: 1em 0;
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
`;

const NotesList = styled.ul`
   list-style: none;
   padding: 1em;
`;

const TextArea = styled.textarea`
   width: 100%;
   padding: 1em;
   border: none;
   background-color: rgba(0, 0, 0, 0.03);
   resize: none;
   height: 100px;
   border-radius: 5px;
   font-size: 14px;
   color: #666;
   outline: none;
`;

const Input = styled.input`
   padding: 10px 15px;
   -webkit-appearance: button;
   outline: none;
   align-self: flex-end;
   margin-top: 1em;
   font-size: 14px;
   color: white;
   border: none;
   border-radius: 5px;
   background-color: #8e2de2;
   cursor: pointer;
   transition: 0.3s;
   box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
   &:hover {
      box-shadow: none;
   }
`;

export default connect()(Notes);
