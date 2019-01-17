import React, {Component} from "react";
import TodoForm from "./TodoForm";
import { connect } from "react-redux";
import { AuthConsumer } from "../../providers/AuthProvider";
import { getTodos, toggleComplete, deleteTodo } from "../../reducers/todos";
import styled, { keyframes } from "styled-components";
import NavBar from '../Dashboard/NavBar';
import TodoList from './TodoList';
import alert from 'sweetalert2';


class Todos extends Component {
  
  componentDidMount() {
    const { auth: { user }, dispatch } = this.props;
    dispatch(getTodos(user.id));
  }

  toggleComplete = ({completed, date, id, name, user_id}) => {
    let {auth: {user}, dispatch} = this.props;
    if(completed) {
      let updatedTodo = {completed: false, date, id, name, user_id};
      dispatch(toggleComplete(user, updatedTodo));
      alert(
        "Task Removed",
        "You have successfully removed the task from completed",
        "success"
      );
    } else {
      let updatedTodo = {completed: true, date, id, name, user_id};
      dispatch(toggleComplete(user, updatedTodo));
      alert(
        "Task Completed",
        "You have successfully completed the task.",
        "success"
      );
    }
    
  }

  deleteTodo = (id) => {
    let {auth: {user}, dispatch} = this.props;
    dispatch(deleteTodo(user, id));
    alert(
      "Success!",
      "You have deleted the task successfully!",
      "success"
    )
  }

  render() {
    let { auth: { user }, todos } = this.props;
    return (
      <>
        <NavBar />
        <TodoContainer>
          <TodoForm user={user} />
          <TodoList todos={todos} toggle={this.toggleComplete} remove={this.deleteTodo}/>
        </TodoContainer>
      </>
    );
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const TodoContainer = styled.div`
  height: 100%;
  min-height: calc(100vh - 90px);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 25px 1em;
  animation: ${fadeIn} 0.5s linear;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const mapStateToProps = state => {
  return { todos: state.todos };
};

export class ConnectedTodos extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Todos {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default connect(mapStateToProps)(ConnectedTodos);
