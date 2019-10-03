import React, { Component } from "react";
import axios from "axios";

export default class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    axios
      .get("/api/projects")
      .then(response => {
        this.setState({
          projects: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="projects-container">
        <p>Hello</p>
      </div>
    );
  }
}
