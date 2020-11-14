import React from 'react';
import {Row} from 'react-bootstrap';
import LoginForm from './LoginForm';

export default function LoginView() {
	return (
		<div>
			<Row className="justify-content-center">
			<LoginForm/>
			</Row>
		</div>
	)
}
