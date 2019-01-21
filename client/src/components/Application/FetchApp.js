import React, { Component } from "react";
import { connect } from "react-redux";
import { getApplication } from "../../reducers/applications";
import { getOffers } from "../../reducers/offers";
import { getInterviews } from "../../reducers/interviews";
import { getCalls } from "../../reducers/calls";
import {AuthConsumer} from "../../providers/AuthProvider";
import Application from "./Application";
import NavBar from '../Dashboard/NavBar';

class FetchApplication extends Component {
  state = { loaded: false };

  componentDidMount() {
    let {auth: {user}, dispatch, match: {params: {id}}} = this.props;
    dispatch(getOffers(id));
    dispatch(getInterviews(id));
    dispatch(getCalls(id));
    dispatch(getApplication(user, id, this.setLoaded));
  }

  setLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;
    let {offers, interviews, calls} = this.props;
    if (loaded) {
      return (
        <>
        <NavBar />
        <Application offers={offers} interviews={interviews} calls={calls}/>
        </>
      );
    } else return null
  }
}

const mapStateToProps = state => {
    return { 
      application: state.applications,
      interviews: state.interviews,
      offers: state.offers,
      calls: state.calls
     };
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
