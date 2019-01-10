import React from "react";
import axios from "axios";
import { AuthConsumer } from "../providers/AuthProvider";

class CompanyForm extends React.Component {
  state = {
    name: "",
    city: "",
    state: "",
    zip: "",
    website_url: ""
  };

  componentDidMount() {
    //to create a company you don't need this. This is for editing and will be added later.
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
      <Form onSubmit={this.handleSubmit}>
        <label for="name">Name</label>
        <input
          name="name"
          placeholder="Company Name"
          required
          autoFocus
          value={name}
          onChange={this.handleChange}
        />
        <input
          name="city"
          placeholder="Company City"
          required
          value={city}
          onChange={this.handleChange}
        />
        <input
          name="state"
          placeholder="Company State"
          required
          value={state}
          onChange={this.handleChange}
        />
        <input
          name="zip"
          placeholder="Company Zip"
          required
          value={zip}
          onChange={this.handleChange}
        />
        <input
          name="website_url"
          placeholder="Company Website URL"
          required
          value={website_url}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </Form>
    );
  }
}

export default class ConnectedPostForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <CompanyForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
