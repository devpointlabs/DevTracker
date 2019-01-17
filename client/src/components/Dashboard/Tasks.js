import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getTodos, toggleComplete } from "../../reducers/todos";
import moment from "moment";
import alert from "sweetalert2";

class Tasks extends React.Component {
  componentDidMount() {
    let { dispatch, user } = this.props;
    dispatch(getTodos(user.id));
  }

  toggleComplete = ({ completed, date, id, name, user_id }) => {
    console.log(completed, name, date, id, user_id);
    let { dispatch, user } = this.props;
    if (completed) {
      let updatedTodo = { completed: false, date, id, name, user_id };
      dispatch(toggleComplete(user, updatedTodo));
    } else {
      let updatedTodo = { completed: true, date, id, name, user_id };
      dispatch(toggleComplete(user, updatedTodo));
    }
    alert(
      "Task Completed",
      "You have successfully completed the task.",
      "success"
    );
  };

  render() {
    let { todos } = this.props;
    let active = todos
      .filter(todo => {
        return todo.completed === false;
      })
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    return (
      <TasksContainer>
        <SectionTitle>Tasks</SectionTitle>
        <Link to={"/tasks"}>
          <SeeAllButton>
            See All
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
            </svg>
          </SeeAllButton>
        </Link>
        <TasksContent>
          {active.length === 0 ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="task"
              >
                <path
                  fill="#6E54A3"
                  d="M208 132h288c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zM64 368c-26.5 0-48.6 21.5-48.6 48s22.1 48 48.6 48 48-21.5 48-48-21.5-48-48-48zm92.5-299l-72.2 72.2-15.6 15.6c-4.7 4.7-12.9 4.7-17.6 0L3.5 109.4c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.3c4.7-4.7 12.3-4.7 17 0l17 16.5c4.6 4.7 4.6 12.3-.1 17zm0 159.6l-72.2 72.2-15.7 15.7c-4.7 4.7-12.9 4.7-17.6 0L3.5 269c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.7c4.7-4.7 12.3-4.7 17 0l17 17c4.6 4.6 4.6 12.2-.1 16.9z"
                />
              </svg>

              <p className="no-tasks">Create your first task!</p>
              <p className="tasks-description">
                Tasks help you be more efficient by staying on top of action
                items. Set due dates to make sure nothing slips by.
              </p>
              <button className="new-task">New Task</button>
            </>
          ) : (
            <TodoList>
              {active.map(todo => (
                <Task key={todo.id} onClick={() => this.toggleComplete(todo)}>
                  <CheckContainer
                    completed={todo.completed}
                    date={todo.date}
                  >
                    {moment().diff(todo.date, "hours") > -12 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm42-104c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42zm-81.37-211.401l6.8 136c.319 6.387 5.591 11.401 11.985 11.401h41.17c6.394 0 11.666-5.014 11.985-11.401l6.8-136c.343-6.854-5.122-12.599-11.985-12.599h-54.77c-6.863 0-12.328 5.745-11.985 12.599z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
                      </svg>
                    )}
                  </CheckContainer>
                  <TaskInfo>
                    <TaskName>{todo.name}</TaskName>
                    <TaskDate date={todo.date}>
                      Due {moment().to(todo.date)}
                    </TaskDate>
                  </TaskInfo>
                </Task>
              ))}
            </TodoList>
          )}
        </TasksContent>
      </TasksContainer>
    );
  }
}

const TodoList = styled.ul`
  width: 100%;
  list-style: none;
`;

const Task = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0,0,0,0.02);
  }
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  transition: 0.3s linear;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    fill: ${props => {
      if(moment().diff(props.date, "hours") > -12) {
        return "#eb4d4b";
      } else return "#ccc"
    }};
  }
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;
`;
const TaskName = styled.h4`
  padding-bottom: 5px;
`;
const TaskDate = styled.p`
  color: ${props => {
    let newDate = moment();
    let difference = newDate.diff(props.date, "hours");
    if (difference > -12) {
      return "#eb4d4b";
    } else return "rgba(0,0,0,0.4)";
  }};
  font-size: 14px;
`;

const TasksContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2em 1em;

  .new-task {
    padding: 15px 30px;
    -webkit-appearance: button;
    margin-top: 20px;
    background: #8e2de2;
    color: white;
    border: none;
    font-size: 14px;
    border-radius: 5px;
    transition: 0.3s linear;
    cursor: pointer;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    &:hover {
      box-shadow: none;
    }
  }

  .task {
    width: 100px;
    height: 100px;
  }

  .no-tasks {
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px;
  }

  .tasks-description {
    font-size: 12px;
    max-width: 300px;
    margin-top: 10px;
    text-align: center;
  }
`;

const TasksContainer = styled.div`
  padding: 1.25em;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.13);
  position: relative;
`;

const SectionTitle = styled.h3`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
`;

const SeeAllButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #6e54a3;
  font-size: 14px;
  margin: 1.25em;

  svg {
    width: 15px;
    fill: #6e54a3;
    height: 15px;
    margin-left: 5px;
  }
`;

const mapStateToProps = state => {
  return { todos: state.todos };
};

export default connect(mapStateToProps)(Tasks);
