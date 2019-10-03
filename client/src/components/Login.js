import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../services/api";

const Login = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    message: ""
  })

  const handleChange = event => {
    const { name, value } = event.target;

    setUserInfo({
      ...userInfo, [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { username, password } = userInfo;

    login(username, password).then(data => {
      if (data.message) {
        setUserInfo({
          message: data.message,
          username: "",
          password: ""
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        props.setUser(data);
        props.history.push("/projects");
      }
    });
  };

    return (
      <>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              id="username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              id="password"
            />
          </Form.Group>
          {userInfo.message && (
            <Alert variant="danger">{userInfo.message}</Alert>
          )}
          <Button type="submit">Login</Button>
        </Form>
      </>
    );
  }

export default Login