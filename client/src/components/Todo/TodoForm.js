import React from "react";
import axios from "axios";

class TodoForm extends React.Component {
  state = { task: "" };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTask(...this.state);
  };

  handleChange = e => {
    //set the state of what's in the input field to the state of the TodoForm component.
    const { name, value } = e.target;
    this.setState({ [name]: value })
  };

  render() {
    const { task } = this.state;
    return (
      <form>
        <input
          name="task"
          placeholder="Add Task"
          required
          autoFocus
          value={task}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TodoForm;
