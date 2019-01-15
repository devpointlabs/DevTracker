import React from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends React.Component {
  state = { user: null };

  updateUser = (id, user) => {
    let data = new FormData();
    data.append("email", user.email)
    data.append("first name", user.first_name)
    data.append("last name", user.last_name)
    data.append("image", user.image)
    data.append("cohort", user.cohort)
    data.append("dob", user.dob)
    data.append("college degree", user.college_degree)
    data.append("employment status", user.employment_status)
    data.append("sex", user.sex)
    data.append("github", user.github)
    data.append("linkedin", user.linkedin)
    data.append("resume", user.resume)

    axios.put(`/api/users/${id}?email=${user.email}&first_name=${user.first_name}&last_name=${user.last_name}&image=${user.image}&cohort=${user.cohort}&dob=${user.dob}&college_degree=${user.college_degree}&employment_status=${user.employment_status}&sex=${user.sex}&github=${user.github}&linkedin=${user.linkedin}&resume=${user.resume}`, data)
      .then(res => this.setState({ user: res.data }));
  };

  handleRegister = (user, history, errorCallback) => {
    axios
      .post("/api/auth", user)
      .then(res => {
        this.setState({ user: res.data });
        history.push("/");
      })
      .catch(err => {
        errorCallback(err);
      });
  };

  handleLogin = (user, history, errorCallback) => {
    axios.post("/api/auth/sign_in", user)
    .then( res => {
      this.setState({ user: res.data.data, });
      history.push("/")
    })
    .catch( err => {
      errorCallback(err);
    })
  }

  handleLogout = history => {
    axios
      .delete("/api/auth/sign_out")
      .then(res => {
        this.setState({ user: null });
        history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          authenticated: this.state.user !== null,
          handleRegister: this.handleRegister,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          setUser: user => this.setState({ user }),
          updateUser: this.updateUser
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
