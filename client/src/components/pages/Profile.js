import React, { Component } from 'react'
import api from '../../api'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      file: null
    }
  }
  handleChange(e) {
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    api.addPicture(this.state.file)
    .then(data => {
      this.setState({
        user: {...this.state.user, pictureUrl: data.pictureUrl}
      })
    })
  }
  render() {
    return (
      <div className="Profile">
        <h2>Profile</h2>

        {this.state.user && <img src={this.state.user.pictureUrl} style={{height: 200}} />}

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="file" onChange={(e) => this.handleChange(e)} /> <br />
          <button type="submit">Save new profile picture</button>
        </form>
      </div>
    );
  }
  componentDidMount() {
    api.getProfile()
      .then(user => {
        this.setState({ user })
      })
  }
}
