import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { addOffer } from "../../reducers/offers";
import alert from "sweetalert2";
import { updateTime } from "../../reducers/applications";

class OfferForm extends Component {
   state = {
      salary: "",
      accepted: "",
      notes: ""
   };

   handleChange = ({ target: { name, value } }) => {
      this.setState({
         [name]: value
      });
   };

   handleAccepted = ({ value }) => {
      this.setState({
         accepted: value
      });
   };

   handleSubmit = e => {
      e.preventDefault();
      let { dispatch, app_id, user } = this.props;
      dispatch(addOffer({ ...this.state }, app_id));
      dispatch(updateTime(user, app_id));
      alert(
         "Offer added!",
         "Your offer has been successfully added!",
         "success"
      );
      this.setState({
         salary: "",
         accepted: "",
         notes: ""
      });
   };

   render() {
      let { salary, accepted, notes } = this.state;
      let options = [
         { value: "Yes", label: "Yes" },
         { value: "No", label: "No" }
      ];
      return (
         <Form onSubmit={this.handleSubmit}>
            <label>Salary Offered</label>
            <Input
               name="salary"
               required
               pattern="[0-9]*"
               value={salary}
               onChange={this.handleChange}
               placeholder="Ex. 65000"
            />
            <label>Accepted</label>
            <Dropdown
               name="accepted"
               options={options}
               className="select-menu"
               value={accepted}
               onChange={this.handleAccepted}
            />
            <label>Notes</label>
            <Textarea
               name="notes"
               value={notes}
               onChange={this.handleChange}
               placeholder="Notes about offer..."
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

   .select-menu {
      width: 100%;
      .Dropdown-control {
         height: 37px;
         background-color: rgba(0, 0, 0, 0.03);
         color: #666;
         border: none;
      }
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
      cursor: pointer;
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

export default connect()(OfferForm);
