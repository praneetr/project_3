import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import { Redirect } from "react-router-dom";

// import { localhost:5000 } from '../api-config';

class Login extends Component {
    constructor(props) {
        super(props);
        //check if logged in already
        this.state = {
            username: "",
            password: "",
            submitted: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.title = "Login";

        this.setState({
            submitted:
                (
                    localStorage.getItem("uvita") &&
                    localStorage.getItem("uvita").length > 0
                )
        });

        console.log("type", typeof localStorage.getItem("uvita"));
        console.log("val", localStorage.getItem("uvita"));
    }

    handleClick(event) {

        var payload = {
            email: this.state.username,
            password: this.state.password
        };
        console.log("payload ", payload);
        axios
            .post("localhost:5000" + "/users/login", payload)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Login successfull", response.data.token);
                    localStorage.setItem("uvita", response.data.token);
                    this.setState({ submitted: true });
                } else if (response.status === 204) {
                    console.log("Username password do not match", response);
                    alert("username password do not match");
                } else {
                    console.log("Username does not exists", response);
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        if (this.state.submitted) {
            return <Redirect to="/profile/view" />;
        } else {
            return (
                <div>
                    <div className="text-center">
                        <MuiThemeProvider>
                            <div>
                                <TextField
                                    hintText="Enter your Username"
                                    floatingLabelText="Username"
                                    onChange={(event, newValue) =>
                                        this.setState({ username: newValue })
                                    }
                                />
                                <br />
                                <TextField
                                    type="password"
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"
                                    onChange={(event, newValue) =>
                                        this.setState({ password: newValue })
                                    }
                                />
                                <br />
                                <RaisedButton
                                    label="Submit"
                                    primary={true}
                                    style={style}
                                    onClick={event => this.handleClick(event)}
                                />
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            );
        }
    }
}
const style = {
    margin: 15
};
export default Login;