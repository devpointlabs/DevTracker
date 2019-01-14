import React from "react";
class Todo extends React.Component {

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  };




  render() {
    const { name, date, id, deleteTask, toggleComplete, completed } = this.props
    return (
      <>
        <h1 style={completed ? { ...styles.task, ...styles.complete } : styles.task}>{name} | {date}</h1>
        <button onClick={() => deleteTask(id)}>Delete</button>
        <button onClick={() => toggleComplete(id)}>Complete</button>
      </>
    )
  }
}


export default Todo;

const styles = {
  task: { cursor: "pointer", },
  complete: { color: "grey", textDecoration: "line-through" }
}