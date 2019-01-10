import React from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";

class InterviewForm extends React.Component {
  state = {
    date: "",
    title: "",
    notes: ""
  };

  componentDidMount() {
    // to be added later for editing.
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { user } = this.props.auth;
    const interviews = this.state;
    e.preventDefault();
    axios
      .post(`/api/users/${user.id}/interviews`, interviews)
      .then(res => this.props.history.push(`/profile`));
  };

  render() {
    const { date, title, notes } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <label for="date">Date</label>
          <input
            name="date"
            placeholder="Interview Date"
            required
            autoFocus
            value={date}
            onChange={this.handleChange}
          />
          <label for="time">Time</label>
          <input
            name="city"
            placeholder="Interview Time"
            required
            value={time}
            onChange={this.handleChange}
          />
          <label for="notes">Notes</label>
          <input
            name="notes"
            placeholder="Interview Notes"
            required
            value={notes}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </Form>
      </div>
    );
  }
}

export default class ConnectedPostForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <PostForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
