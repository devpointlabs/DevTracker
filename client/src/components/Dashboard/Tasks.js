import React from "react";
import styled from "styled-components";

class Tasks extends React.Component {
  state = {
    tasks: []
  };

  render() {
    return (
      <TasksContainer>
        <SectionTitle>Tasks</SectionTitle>
        <TasksContent>
          {this.state.tasks.length === 0 ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="task"
              >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8e2de2" />
                  <stop offset="100%" stopColor="#4a00e0" />
                </linearGradient>
              </defs>
                <path 
                  fill="url(#grad1)"
                  d="M208 132h288c8.8 0 16-7.2 16-16V76c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zm0 160h288c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16zM64 368c-26.5 0-48.6 21.5-48.6 48s22.1 48 48.6 48 48-21.5 48-48-21.5-48-48-48zm92.5-299l-72.2 72.2-15.6 15.6c-4.7 4.7-12.9 4.7-17.6 0L3.5 109.4c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.3c4.7-4.7 12.3-4.7 17 0l17 16.5c4.6 4.7 4.6 12.3-.1 17zm0 159.6l-72.2 72.2-15.7 15.7c-4.7 4.7-12.9 4.7-17.6 0L3.5 269c-4.7-4.7-4.7-12.3 0-17l15.7-15.7c4.7-4.7 12.3-4.7 17 0l22.7 22.1 63.7-63.7c4.7-4.7 12.3-4.7 17 0l17 17c4.6 4.6 4.6 12.2-.1 16.9z" />
              </svg>

              <p className="no-tasks">Create your first task!</p>
              <p className="tasks-description">
                Tasks help you be more efficient by staying on top of action
                items. Set due dates to make sure nothing slips by.
              </p>
              <button className="new-task">New Task</button>
            </>
          ) : null}
        </TasksContent>
      </TasksContainer>
    );
  }
}

const TasksContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;

  .new-task {
    padding: 10px 15px;
    -webkit-appearance: button;
    margin-top: 20px;
    background: #8e2de2;
    color: white;
    border: none;
    transition: 0.3s linear;
    cursor: pointer;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
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
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h3`
  font-weight: lighter;
  font-family: "Open Sans", sans-serif;
  color: #666;
`;

export default Tasks;
