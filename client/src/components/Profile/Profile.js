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
        <Container>
          <ProfileImage src={user.image || defaultImage} />
        </Container>
        <Header>{user.email}</Header>
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
          <h2>
            <button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</button>
          </h2>
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


const Form =styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;`

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`


const Header = styled.div`
    display: flex;
    align-content: center;`

const Container = styled.div`
    display: flex;
    flex-direction: column;`