import React, { Component } from "react";
import styled, {keyframes} from "styled-components";
import moment from "moment";

class TodoList extends Component {
  state = {
    showCompleted: false
  };

  showCompletedToggle = () => {
    this.setState(state => ({showCompleted: !state.showCompleted}));
  }

  render() {
    let { todos, toggle, remove } = this.props;
    let { showCompleted } = this.state;
    let completed = todos.filter(todo => {
      if (todo.completed) {
        return todo;
      } else return null;
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    let active = todos.filter(todo => {
      if (!todo.completed) {
        return todo;
      } else return null;
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return (
      <>
        {showCompleted ? (
          <TaskContainer>
            <HeaderContainer>
              <Title>Completed Tasks</Title>
              <Button onClick={this.showCompletedToggle}>Show Active</Button>
            </HeaderContainer>
            {completed.map(todo => {
              return (
                <Task key={todo.id} onClick={() => toggle(todo)}>
                  <CheckContainer
                    completed={todo.completed}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
                    </svg>
                  </CheckContainer>
                  <TaskInfo>
                    <TaskName>{todo.name}</TaskName>
                    <TaskDate>Due: {moment().to(todo.date)}</TaskDate>
                  </TaskInfo>
                  <EditDelete>
                    <Delete onClick={() => remove(todo.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="delete"
                      >
                        <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                      </svg>
                    </Delete>
                  </EditDelete>
                </Task>
              );
            })}
          </TaskContainer>
        ) : null}
        {!showCompleted ? (
          <TaskContainer>
            <HeaderContainer>
              <Title>Active Tasks</Title>
              <Button onClick={this.showCompletedToggle}>Show Completed</Button>
            </HeaderContainer>
            {active.map(todo => {
              return (
                <Task key={todo.id} onClick={() => toggle(todo)}>
                  <CheckContainer
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
                    <TaskDate date={todo.date}>Due: {moment().to(todo.date)}</TaskDate>
                  </TaskInfo>
                  <EditDelete>
                    <Delete onClick={() => remove(todo.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="delete"
                      >
                        <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                      </svg>
                    </Delete>
                  </EditDelete>
                </Task>
              );
            })}
          </TaskContainer>
        ) : null}
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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  padding: 15px 30px;
  background-color: #8e2de2;
  outline: none;
  cursor: pointer;
  border: none;
  transition: 0.3s linear;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: none;
  }
`;

const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    fill: ${props => {
      if(props.completed) {
        return "#5CB85C";
      }
      else if(moment().diff(props.date, "hours") > -12) {
        return "#eb4d4b";
      } else return "#ccc";
    }};
  }
`;
const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em;
`;
const TaskName = styled.h3`
  padding-bottom: 5px;
`;
const TaskDate = styled.p`
  color: rgba(0, 0, 0, 0.3);
`;
const EditDelete = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;

  .delete {
    width: 20px;
    height: 20px;
    fill: #ccc;
  }

  &:hover > .delete {
    fill: red;
  }
`;

const Task = styled.li`
  width: 100%;
  padding: 10px 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const TaskContainer = styled.ul`
  width: 800px;
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s linear;
`;

const Title = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
  align-self: flex-start;
  margin-bottom: 20px;
`;

export default TodoList;
