import React from "react";
import Axios from "axios";
class Todo extends React.Component {

  handleChange = e => {
    //set the state of what's in the input field to the state of the TodoForm component.
    const { name, value } = e.target;
    this.setState({ [name]: value })
  };



  render() {
    const { name, date, id, deleteTask } = this.props
    return (
      <>
        <h1>{name} | {date}</h1>
        <button onClick={() => deleteTask(id)}>Delete</button>
      </>
    )
  }
}


export default Todo;
