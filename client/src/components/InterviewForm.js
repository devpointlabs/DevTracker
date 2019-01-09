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
    const companies = this.state;
    e.preventDefault();
    axios
      .post(`/api/users/${user.id}/companies`, companies)
      .then(res => this.props.history.push(`/profile`));
  };

  render() {
    const { name, city, state, zip, website_url } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="name"
            placeholder="Company Name"
            required
            autoFocus
            value={name}
            onChange={this.handleChange}
          />
          <Form.Input
            name="city"
            placeholder="Company City"
            required
            value={city}
            onChange={this.handleChange}
          />
          <Form.Input
            name="state"
            placeholder="Company State"
            required
            value={state}
            onChange={this.handleChange}
          />
          <Form.Input
            name="zip"
            placeholder="Company Zip"
            required
            value={zip}
            onChange={this.handleChange}
          />
          <Form.Input
            name="website_url"
            placeholder="Company Website URL"
            required
            value={website_url}
            onChange={this.handleChange}
          />
          <Form.Button color="green">Submit</Form.Button>
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
