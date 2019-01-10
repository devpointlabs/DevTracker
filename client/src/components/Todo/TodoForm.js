import React from "react";
import axios from "axios";

class TodoForm extends React.Component {
  state = { task: "" };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTask(...this.state);
  };

  handleChange = event => {
    //set the state of what's in the input field to the state of the TodoForm component.
    const { name, value } = event.target;
    this.setState = { [name]: value };
  };

  render() {
    return (
      <form>
        <label for="task">Task</label>
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
