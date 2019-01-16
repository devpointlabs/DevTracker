import React from "react";
import styled from "styled-components";
import moment from 'moment';

const TodoList = ({ todos, toggle, remove }) => {
  return (
    <TaskContainer>
      <Title>Tasks</Title>
      {todos.map(todo => {
        return (
          <Task key={todo.id}>
            <CheckContainer completed={todo.completed} onClick={() => toggle(todo)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
              </svg>
            </CheckContainer>
            <TaskInfo>
              <TaskName>{todo.name}</TaskName>
              <TaskDate>Due: {moment().to(todo.date)}</TaskDate>
            </TaskInfo>
            <EditDelete>
              <Delete onClick={() => remove(todo.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="delete">
                  <path d="M381.6 80l-34-56.7C338.9 8.8 323.3 0 306.4 0H205.6c-16.9 0-32.5 8.8-41.2 23.3l-34 56.7H40c-13.3 0-24 10.7-24 24v12c0 6.6 5.4 12 12 12h16.4L76 468.4c2.3 24.7 23 43.6 47.8 43.6h264.5c24.8 0 45.5-18.9 47.8-43.6L467.6 128H484c6.6 0 12-5.4 12-12v-12c0-13.3-10.7-24-24-24h-90.4zm-176-32h100.8l19.2 32H186.4l19.2-32zm182.6 416H123.8L92.6 128h326.7l-31.1 336z" />
                </svg>
              </Delete>
            </EditDelete>
          </Task>
        );
      })}
    </TaskContainer>
  );
};

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
    fill: ${props => props.completed ? "#5CB85C" : "#ccc" };
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
    color: rgba(0,0,0,0.3);
`;
const EditDelete = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// const Edit = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   svg {
//     width: 20px;
//     height: 20px;
//     fill: #ccc;
//   }
// `;

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
  &:hover {
      background-color: rgba(0,0,0,0.02);
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
`;

const Title = styled.h1`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
  align-self: flex-start;
  margin-bottom: 20px;
`;

export default TodoList;
