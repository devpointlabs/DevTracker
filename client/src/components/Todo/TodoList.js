import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider"
class TodoList extends React.Component {
  state = { tasks: [], };

  componentDidMount() {
    const { auth: { user: { id } } } = this.props
    axios.get(`/api/users/${id}/todos`)
      .then(res => {
        this.setState({ tasks: res.data })
      })
  }

  addTask = (task) => {
    const { auth: { user: { id } } } = this.props
    const { tasks } = this.state
    axios.post(`/api/users/${id}/todos`, task)
      .then(({ data }) => {
        this.setState({ tasks: [data, ...tasks] })
      })
  };

  //this is how to delete when you're not being rerouted, when the page isn't being reloaded and therefore componentDidMount() is not getting fired. This is how to delete without rendering a page.
  deleteTask = (taskId) => {
    const { auth: { user: { id } } } = this.props
    axios.delete(`/api/users/${id}/todos/${taskId}`)
      .then(res => {
        const tasks = this.state.tasks.filter(task => {
          if (task.id !== taskId)
            return task;
          return null;
        })
        this.setState({ tasks })
      })
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <TodoForm addTask={this.addTask} />
        {tasks.map(task =>
          <Todo key={task.id} {...task} deleteTask={this.deleteTask} />
        )}
      </div>
    );
  }
}


export default class ConnectedTodoList extends React.Component {
  render() {
    return (
      < AuthConsumer >
        {auth =>
          < TodoList {...this.props} auth={auth} />
        }
      </AuthConsumer>
    )
  }
}
