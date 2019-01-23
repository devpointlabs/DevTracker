import React, { Component } from "react";
import { connect } from "react-redux";
import { getApplication } from "../../reducers/applications";
import { getOffers } from "../../reducers/offers";
import { getInterviews } from "../../reducers/interviews";
import { getCalls } from "../../reducers/calls";
import { getNotes } from '../../reducers/notes';
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
    dispatch(getNotes(id));
  }

  setLoaded = () => {
    this.setState({ loaded: true});
  };

  render() {
    const { loaded } = this.state;
    if (loaded) {
      let {offers, interviews, calls, notes, application} = this.props;
      return (
        <>
        <NavBar />
        <Application application={application} offers={offers} interviews={interviews} calls={calls} notes={notes}/>
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
      calls: state.calls,
      notes: state.notes
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
