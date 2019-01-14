import React from "react";
class Todo extends React.Component {

  handleChange = e => {
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
