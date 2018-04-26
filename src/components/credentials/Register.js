import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import { Redirect } from "react-router-dom"; //for the redirect


// import { API_ROOT } from '../api-config';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            submitted: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.title = "Register";
    }

    handleClick(event) {

        var payload = {
            email: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        };
        console.log("payload ", payload);
        axios
            .post("localhost:5000" + "/users/register", payload)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Reg successfull");
                    // var uploadScreen=[];
                    this.setState({ submitted: true });
                    // uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
                    // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
                } else if (response.status === 204) {
                    console.log("User already exists");
                    alert("Email already exists in our system. ");
                } else {
                    console.log("Problem registering.  Please try again. ");
                    alert("Problem registering.  Please try again.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        if (this.state.submitted) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div>
                    <div className="text-center">
                        <MuiThemeProvider>
                            <div>
                                <TextField
                                    hintText="First Name"
                                    floatingLabelText="First Name"
                                    onChange={(event, newValue) =>
                                        this.setState({ firstname: newValue })
                                    }
                                />
                                <br />
                                <TextField
                                    hintText="Last Name"
                                    floatingLabelText="Last Name"
                                    onChange={(event, newValue) =>
                                        this.setState({ lastname: newValue })
                                    }
                                />
                                <br />
                                <TextField
                                    hintText="Enter your Email"
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
export default Register;