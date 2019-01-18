import React, { Component } from "react";
import { connect } from "react-redux";
import { getApplication } from "../../reducers/applications";
import {AuthConsumer} from "../../providers/AuthProvider";
import Application from "./Application";
import NavBar from '../Dashboard/NavBar';

class FetchApplication extends Component {
  state = { loaded: false };

  componentDidMount() {
    let {auth: {user}, dispatch, match: {params: {id}}} = this.props;
    dispatch(getApplication(user, id, this.setLoaded));
  }

  setLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;

    if (loaded) {
      return (
        <>
        <NavBar />
        <Application />
        </>
      );
    } else return null
  }
}

const mapStateToProps = state => {
    return { application: state.applications };
};

export class ConnectedFetchApplication extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <FetchApplication {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default connect(mapStateToProps)(ConnectedFetchApplication);
