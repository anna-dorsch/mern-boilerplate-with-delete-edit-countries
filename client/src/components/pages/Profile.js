import React, { Component } from "react";
import api from "../../api";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      file: null
    };
  }
  handleChange(e) {
    // console.log(e.target.file);
    // this.setState({
    //   file: e.target.files[0]
    // });
    e.preventDefault();
    api.addPicture(e.target.files[0]).then(data => {
      this.setState({
        user: { ...this.state.user, pictureUrl: data.pictureUrl }
      });
    });
  }

  handleChangeName(e) {
    console.log(e.target.value);
    this.setState({
      user: { ...this.state.user, username: e.target.value }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("hello", this.state.user.username);
    api.changeUsername({ username: this.state.user.username });
    // .then(data => {
    //   // this.setState({
    //   //   user: { ...this.state.user, username: data.username }
    //   // });
    // });
  }

  render() {
    return (
      <div className="Profile">
        <h2>Profile</h2>

        {this.state.user && (
          <img src={this.state.user.pictureUrl} style={{ height: 200 }} />
        )}

        <form onSubmit={e => this.handleSubmit(e)}>
          {this.state.user && (
            <input
              type="text"
              value={this.state.user.username}
              onChange={e => this.handleChangeName(e)}
            />
          )}
          <br />
          <input type="file" onChange={e => this.handleChange(e)} /> <br />
          <button type="submit">Save changes</button>
        </form>
      </div>
    );
  }
  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({ user });
      console.log("username", this.state.user.username);
    });
  }
}
