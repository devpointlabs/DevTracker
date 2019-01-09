import React from 'react';
import { AuthConsumer, } from '../../providers/AuthProvider';
import styled from 'styled-components';
import { throws } from 'assert';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends React.Component {
  state = { editing: false, formValues: { email: '', }, };

  componentDidMount() {
    const { auth: { user: { email }, }, } = this.props;
    this.setState({ formValues: { email }, });
  }

  toggleEdit = () => {
    this.setState(state => {
      return { editing: !state.editing, }
    })
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { email, file, }, } = this.state;
    const { auth: { user, updateUser, }, } = this.props;
    updateUser(user.id, { email, file, });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
  }

  profileView = () => {
    const { auth: { user }, } = this.props;
    return (
      <>
        <h1>Profile View</h1>
        <ProfileImage src={user.image || defaultImage} />
        <Body>{user.email}</Body>
      </>
    )
  }

  editView = () => {
    const { auth: { user }, } = this.props;
    const { formValues: { email, } } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <input
          label="Email"
          name="email"
          value={email}
          required
          onChange={this.handleChange}
        />
        <button>Update</button>

      </Form>
    )
  }

  render() {
    const { editing, } = this.state;
    return (
      <Container>
        <br />
        <div>
          <h1>
            {editing ? this.editView() : this.profileView()}
          </h1>
          <button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</button>
        </div>
      </Container>
    )
  }
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    {auth =>
      <Profile {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProfile;


const Form = styled.div`
`

const ProfileImage = styled.img`
`


const Body = styled.div`
`

const Container = styled.div`
`