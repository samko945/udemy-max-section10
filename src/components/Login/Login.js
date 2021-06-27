import React, { useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
	const formReducer = (state, action) => {
		if (action.type === "email_input") {
			return { ...state, enteredEmail: action.value, formIsValid: state.emailIsValid && state.passwordIsValid };
		}
		if (action.type === "password_input") {
			return { ...state, enteredPassword: action.value, formIsValid: state.emailIsValid && state.passwordIsValid };
		}
		if (action.type === "validate_email") {
			if (state.enteredEmail.length) {
				return { ...state, emailIsValid: state.enteredEmail.includes("@"), formIsValid: state.enteredEmail.includes("@") && state.passwordIsValid };
			} else {
				return state;
			}
		}
		if (action.type === "validate_password") {
			if (state.enteredPassword.length) {
				return { ...state, passwordIsValid: state.enteredPassword.length > 6, formIsValid: state.emailIsValid && state.enteredPassword.length > 6 };
			} else {
				return state;
			}
		}
	};

	const [form, dispatchForm] = useReducer(formReducer, {
		formIsValid: false,
		enteredEmail: "",
		emailIsValid: null,
		enteredPassword: "",
		passwordIsValid: null,
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatchForm({ type: "validate_email" });
			dispatchForm({ type: "validate_password" });
		}, 500);
		return () => {
			clearTimeout(timeout);
		};
	}, [form.enteredEmail, form.enteredPassword]);

	const emailChangeHandler = (event) => {
		dispatchForm({ type: "email_input", value: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchForm({ type: "password_input", value: event.target.value });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(form.enteredEmail, form.enteredPassword);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div className={`${classes.control} ${form.emailIsValid === false ? classes.invalid : ""}`}>
					<label htmlFor="email">E-Mail</label>
					<input type="email" id="email" value={form.enteredEmail} onChange={emailChangeHandler} />
				</div>
				<div className={`${classes.control} ${form.passwordIsValid === false ? classes.invalid : ""}`}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" value={form.enteredPassword} onChange={passwordChangeHandler} />
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!form.formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
