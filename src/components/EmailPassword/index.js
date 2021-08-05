import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

import { auth } from "./../../firebase/utils";

// const initialState = {
//   email: "",
//   errors: [],
// };

const EmailPassword = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ...initialState,
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  // }

  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const { email } = this.state;

      const conif = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, conif)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again"];
          // this.setState({
          //   errors: err,
          // });
          setErrors(err);
        });
    } catch (err) {
      //   console.log(err);
    }
  };

  // const { email, errors } = this.state;

  const configAuthWrapper = {
    headline: "Email Password",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formwrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
