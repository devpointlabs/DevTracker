import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider"
class TodoList extends React.Component {
  state = { tasks: [] };

  componentDidMount() {
    const { auth: { user: { id } } } = this.props
    axios.get(`/api/users/${id}/todos`)
      .then(res => {
        this.setState({ tasks: res.data })
      })
  }

  addTask = (name) => {
    const { auth: { user: { id } } } = this.props
    const { tasks } = this.state
    const task = { name, completed: false }
    axios.post(`/api/users/${id}/todos`, task)
      .then(({ data }) => {
        this.setState({ tasks: [data, ...tasks] })
      })
  };

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <TodoForm addTask={this.addTask} />
        {tasks.map(task =>
          <Todo key={task.id} task={task} />
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
