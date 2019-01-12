import React from "react";
class Todo extends React.Component {

  render() {
    const { task } = this.props
    return (
      <>
        <h1>{task.name}</h1>
      </>
    )
  }
}


export default Todo;
