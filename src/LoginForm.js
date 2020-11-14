import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router";

export default function LoginForm() {

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit() {
		setSubmitting(true);
		fetch('/login', {method: 'POST', body: JSON.stringify({username, password})})
			.then((response) => {
				if ( response.ok ) {
					setLoggedIn(true);
				} else {
					setSubmitting(false);
				}
			});
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
