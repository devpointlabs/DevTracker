import React from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { addTodo } from "../../reducers/todos";
import styled from "styled-components";
import alert from "sweetalert2";

class TodoForm extends React.Component {
  state = { name: "", date: new Date() };

  // we don't need this: 
  addTodo = todo => {
    const { dispatch, user } = this.props;
    dispatch(addTodo(user.id, todo));
  };

  handleSubmit = e => {
    //const { dispatch, user } = this.props;
    e.preventDefault();
    const { name, date } = this.state;
    let task = {
      name,
      date,
      completed: false
    };
    // you could just call this 
    // dispatch(addTodo(user.id, todo));
    this.addTodo(task);
    this.setState({ name: "", date: new Date() });
    alert(
      "Task Added!",
      "The task you submitted has been successfully added!",
      "success"
    );
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleDate = date => {
    this.setState({
      date: date
    });
  };

  render() {
    const { name, date } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>Add Task</Title>
        <label className="label">Task Name</label>
        <input
          name="name"
          required
          autoFocus
          value={name}
          onChange={this.handleChange}
          className="task-name"
        />
        <label className="label">Due Date</label>
        <DatePicker
          placeholder="Due Date"
          name="date"
          selected={date}
          onChange={this.handleDate}
          className="date-picker"
        />
        <input type="submit" value="Submit" className="submit" />
      </Form>
    );
  }
}

const Title = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  .submit {
    align-self: flex-end;
    margin-top: 15px;
    padding: 15px 30px;
    -webkit-appearance: button;
    background-color: #8e2de2;
    font-size: 16px;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    &:hover {
      box-shadow: none;
    }
  }

  .label {
    align-self: flex-start;
    margin-top: 15px;
  }
  .date-picker {
    width: 760px;
    height: 52px;
    border: none;
    outline: none;
    font-size: 18px;
    border-bottom: 2px solid #f1f2f6;
    transition: 0.4s linear;
    &:focus {
      border-color: #8e2de2;
    }
  }

  .task-name {
    width: 100%;
    padding: 15px 10px 14px;
    border: none;
    border-bottom: 2px solid #f1f2f6;
    outline: none;
    background: white;
    color: #666;
    font-size: 18px;
    transition: 0.4s linear;
    &:focus {
      border-color: #8e2de2;
    }
    &::placeholder {
      color: #ccc;
      padding-left: 5px;
    }
  }
`;

export default connect()(TodoForm);
