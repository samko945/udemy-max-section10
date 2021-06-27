import React, { useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
	const formReducer = (state, action) => {
		if (action.type === "email_input") {
			return { ...state, enteredEmail: action.value, emailIsValid: action.value.includes("@") };
		}
		if (action.type === "password_input") {
			return { ...state, enteredPassword: action.value, passwordIsValid: action.value.length > 6 };
		}
		if (action.type === "validate_form") {
			return { ...state, formIsValid: state.emailIsValid && state.passwordIsValid };
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
			dispatchForm({ type: "validate_form" });
			console.log("check form valid");
		}, 0);
		return () => {
			clearTimeout(timeout);
		};
	}, [form.emailIsValid, form.passwordIsValid]);

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
