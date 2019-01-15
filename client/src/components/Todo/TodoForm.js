import React from "react";
import DatePicker from "react-datepicker";
class TodoForm extends React.Component {
  state = { name: "", date: new Date() };

  handleSubmit = e => {
    e.preventDefault();
    const { name, date } = this.state;
    let task = {
      name,
      date,
      completed: false
    }
    this.props.addTask(task)
    this.setState({ name: "", date: new Date() })
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  };

  handleDate = date => {
    this.setState({
      date: date
    });
  };

  render() {
    const { name, date } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="Add Task"
          required
          autoFocus
          value={name}
          onChange={this.handleChange}
        />
        <DatePicker
          placeholder="Due Date"
          name="date"
          selected={date}
          onChange={this.handleDate}
          className="date-picker"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TodoForm;
