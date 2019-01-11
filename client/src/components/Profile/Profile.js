import React from 'react';
import { AuthConsumer, } from '../../providers/AuthProvider';
import styled from 'styled-components';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends React.Component {
  state = {
    editing: false, formValues: {
      email: '',
      first_name: '',
      last_name: '',
      image: '',
      cohort: '',
      dob: '',
      college_degree: '',
      employment_status: '',
      sex: '',
      github: '',
      linkedin: '',
      resume: '',
      admin: '',
    },
  };

  componentDidMount() {
    const { auth: { user: { email, first_name, last_name, image, cohort, dob, college_degree, employment_status, sex, github, linkedin, resume, admin }, }, } = this.props;
    this.setState({ formValues: { email, first_name, last_name, image, cohort, dob, college_degree, employment_status, sex, github, linkedin, resume, admin }, });
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
    const { formValues: { email, first_name, last_name, image, cohort, dob, college_degree, employment_status, sex, github, linkedin, resume, admin, file, }, } = this.state;
    const { auth: { user, updateUser, }, } = this.props;
    updateUser(user.id, { email, first_name, last_name, image, cohort, dob, college_degree, employment_status, sex, github, linkedin, resume, admin, file, });
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
    const { formValues: { email,
      first_name,
      last_name,
      image,
      cohort,
      dob,
      college_degree,
      employment_status,
      sex,
      github,
      linkedin,
      resume,
      admin } } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <label>Email</label>
        <input
          label="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <label>First Name</label>
        <input
          label="First Name"
          name="first_name"
          value={first_name}
          onChange={this.handleChange}
        />
        <label>Last Name</label>
        <input
          name="last_name"
          value={last_name}
          onChange={this.handleChange}
        />
        <label>Profile Image</label>
        <input
          name="image"
          value={image}
          onChange={this.handleChange}
        />
        <label>Cohort</label>
        <input
          name="cohort"
          value={cohort}
          onChange={this.handleChange}
        />
        <label>Date of Birth</label>
        <input
          name="dob"
          value={dob}
          onChange={this.handleChange}
        />
        <label>College Degree</label>
        <select name="college_degree" value={college_degree} onChange={this.handleChange}>
          <option value="none">None</option>
          <option value="bachelors">Bachelors</option>
          <option value="masters">Masters</option>
          <option value="phd">Phd</option>
        </select>
        <label>Employment Status</label>
        <select name="employment_status" value={employment_status} onChange={this.handleChange}>
          <option value="no start">None</option>
          <option value="interviewing">Interviewing</option>
          <option value="applying">Applying</option>
          <option value="offer accepted">Offer Accepted</option>
        </select>
        <label>Sex</label>
        <select name="sex" value={sex} onChange={this.handleChange}>
          <option value="neither">None</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Github</label>
        <input
          name="github"
          value={github}
          onChange={this.handleChange}
        />
        <label>Linkedin</label>
        <input
          name="linkedin"
          value={linkedin}
          onChange={this.handleChange}
        />
        <label>Resume</label>
        <input
          name="resume"
          value={resume}
          onChange={this.handleChange}
        />
        <label>Admin</label>
        <input
          name="admin"
          value={admin}
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
          {editing ? this.editView() : this.profileView()}
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


const Form = styled.form`
 display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  width: 400px;

  label {
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 25px;
  }

`

const ProfileImage = styled.img`
`


const Body = styled.div`
`

const Container = styled.div`
`