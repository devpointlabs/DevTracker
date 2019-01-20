import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { addInterview } from "../../reducers/interviews";
import alert from "sweetalert2";

class InterviewForm extends Component {
   state = {
      date: new Date(),
      title: "",
      notes: ""
   };

   handleChange = ({ target: { name, value } }) => {
      this.setState({
         [name]: value
      });
   };

   handleDate = date => {
      this.setState({
         date: date
      });
   };

   handleSubmit = e => {
      e.preventDefault();
      let { dispatch, app_id } = this.props;
      dispatch(addInterview({ ...this.state }, app_id));
      alert(
          "Interview added!",
          "Your interview has been successfully scheduled!",
          "success"
      )
      this.setState({
          date: new Date(),
          title: "",
          notes: ""
      })
   };

   render() {
      let { date, title, notes } = this.state;
      return (
         <Form onSubmit={this.handleSubmit}>
            <label>Interview Date</label>
            <DatePicker
               name="date"
               selected={date}
               onChange={this.handleDate}
               className="date-picker"
            />
            <label>Job Title</label>
            <Input
               name="title"
               required
               value={title}
               onChange={this.handleChange}
               placeholder="Job Title"
            />
            <label>Notes</label>
            <Textarea
               name="notes"
               value={notes}
               onChange={this.handleChange}
               placeholder="Notes about interview..."
            />
            <input type="submit" value="Submit" className="submit" />
         </Form>
      );
   }
}

const Form = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   margin-top: 15px;

   label {
      font-size: 14px;
      color: #666;
      margin: 10px 0;
   }

   .date-picker {
      border: none;
      cursor: pointer;
      border-radius: 5px;
      outline: none;
      padding: 10px;
      font-size: 14px;
      color: #666;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.03);
   }

   .submit {
      padding: 15px 30px;
      align-self: flex-end;
      -webkit-appearance: button;
      font-size: 14px;
      color: white;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: #8e2de2;
      margin-top: 10px;
   }
`;

const Textarea = styled.textarea`
   width: 100%;
   padding: 10px;
   font-size: 14px;
   color: #666;
   resize: none;
   border: none;
   border-radius: 5px;
   background-color: rgba(0, 0, 0, 0.03);
   height: 100px;
`;

const Input = styled.input`
   width: 100%;
   padding: 10px;
   background-color: rgba(0, 0, 0, 0.03);
   color: #666;
   font-size: 14px;
   border: none;
   border-radius: 5px;
`;

export default connect()(InterviewForm);

