import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

// the Input component uses React.forwardRef to obtain the ref passed to it by it's parent.
export default React.forwardRef(function Input(props, ref) {
	const inputRef = useRef();

	function focusInput() {
		inputRef.current.focus();
	}

	useImperativeHandle(ref, () => {
		return { focus: focusInput };
	});

	return (
		<div className={`${classes.control} ${props.isValid === false ? classes.invalid : ""}`}>
			<label htmlFor={props.id}>{props.label}</label>
			<input ref={inputRef} type={props.type} id={props.id} value={props.value} onChange={props.onChange} />
		</div>
	);
});
