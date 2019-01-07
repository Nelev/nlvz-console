import React from "react";
import { Field, reduxForm } from "redux-form";
import InputField from "../../components/fields/InputField";

import "./style.css";

class LoginForm extends React.Component {
    render() {
        const { pristine, submitting, handleSubmit } = this.props;
        return (
            <div className="c-Login-Form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>UserName</label>
                        <div>
                            <Field
                                name="username"
                                component={InputField}
                                type="text"
                                placeholder="User Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <div>
                            <Field
                                name="password"
                                component={InputField}
                                type="text"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={pristine || submitting}>
                            Log-In
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "login"
})(LoginForm);
