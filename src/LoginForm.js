import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import { login } from "./ApiTalker";

export default function LoginForm() {

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit() {
		setSubmitting(true);
		// Timeout is a temporary solution for localStorage to catch up
		login(username, password)
			.then(() => setTimeout(() => setLoggedIn(true), 100)).catch(() => setSubmitting(false));
	}

	return (
		(isLoggedIn === false) ?
			<Form>
				<Form.Label htmlFor="username">Benutzername</Form.Label>
				<Form.Control type="text" name="username" value={ username }
				              onChange={ (event) => setUsername(event.target.value) }/>
				<Form.Label htmlFor="password">Passwort</Form.Label>
				<Form.Control type="password" name="password" value={ password }
				              onChange={ (event) => setPassword(event.target.value) }/>
				<Button type="button" onClick={ handleSubmit } variant="success"
				        disabled={ isSubmitting }>Anmelden</Button>
			</Form>
			: <Redirect to="/entries" push={ true }/>
	)


}
