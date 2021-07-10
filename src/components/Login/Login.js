import React, { useContext, useEffect, useReducer, useRef } from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const Login = () => {
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

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		if (form.formIsValid) {
			authCtx.onLogin(form.enteredEmail, form.enteredPassword);
		} else if (!form.emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input ref={emailInputRef} label="E-Mail" type="email" id="email" isValid={form.emailIsValid} value={form.enteredEmail} onChange={emailChangeHandler} />
				<Input ref={passwordInputRef} label="Password" type="password" id="password" isValid={form.passwordIsValid} value={form.enteredPassword} onChange={passwordChangeHandler} />
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
