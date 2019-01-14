import React from "react";

class TodoForm extends React.Component {
  state = { task: "" };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTask(this.state.task)
    this.setState({ task: "" })
  };

  handleChange = e => {
    //set the state of what's in the input field to the state of the TodoForm component.
    const { name, value } = e.target;
    this.setState({ [name]: value })
  };

  render() {
    const { task } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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
