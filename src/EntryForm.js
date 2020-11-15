import React, { useEffect, useState } from "react";
import { Button, Col, Form } from 'react-bootstrap';
import { DateTime } from 'luxon';
import { updateEntry, saveEntry } from './ApiTalker';

export default function EntryForm(props) {


	const [entryExists, setEntryExists] = useState(false);
	const [entryId, setEntryId] = useState(0);
	const [checkInDate, setCheckInDate] = useState('');
	const [checkInTime, setCheckInTime] = useState('00:00');
	const [checkOutDate, setCheckOutDate] = useState('');
	const [checkOutTime, setCheckOutTime] = useState('00:00');

	useEffect(() => {
		if ( props.entry ) {
			let entry = props.entry;
			setEntryExists(true);
			setEntryId(entry.id);
			let checkIn = DateTime.fromISO(entry.checkIn);
			setCheckInDate(checkIn.toISODate());
			setCheckInTime(checkIn.toISOTime({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false }));
			let checkOut = DateTime.fromISO(entry.checkOut);
			setCheckOutDate(checkOut.toISODate());
			setCheckOutTime(checkOut.toISOTime({ suppressMilliseconds: true, suppressSeconds: true, includeOffset: false }));
		}
	}, [props.entry]);

	function validFields() {
		let checkIn = DateTime.fromFormat(`${checkInDate} ${checkInTime}`, 'yyyy-MM-dd HH:mm');
		let checkOut = DateTime.fromFormat(`${checkOutDate} ${checkOutTime}`, 'yyyy-MM-dd HH:mm');
		return checkIn.diff(checkOut) <= 0;
	}

	function directSubmission() {
		if (validFields()) {
			if ( entryExists ) {
				updateTheEntry();
			} else {
				saveTheEntry();
			}
			props.popup.current.close();
		}
		else {
			alert('Check-In soll früher als Check-Out sein.');
		}
	}

	function updateTheEntry() {
		let entry = constructEntry();
		updateEntry(entry, entryId);
	}

	function constructEntry() {
		let checkIn = DateTime.fromFormat(`${checkInDate} ${checkInTime}`, 'yyyy-MM-dd HH:mm').toJSDate().toJSON();
		let checkOut = DateTime.fromFormat(`${checkOutDate} ${checkOutTime}`, 'yyyy-MM-dd HH:mm').toJSDate().toJSON();
		return {
			checkIn, checkOut
		};
	}

	function saveTheEntry() {
		let entry = constructEntry();
		saveEntry(entry);
	}

	return (
		<Form>
			<Form.Label>Check In</Form.Label>
			<Form.Row className="justify-content-center">
				<Col xs="auto">
					<Form.Label htmlFor="checkInDate">Date</Form.Label>
					<Form.Control type="date" id="checkInDate" value={ checkInDate }
					              onChange={ (event) => setCheckInDate(event.target.value) }></Form.Control>
				</Col>
				<Col xs="auto">
					<Form.Label htmlFor="checkInTime">Time</Form.Label>
					<Form.Control type="time" id="checkInTime" value={ checkInTime }
					              onChange={ (event) => setCheckInTime(event.target.value) }></Form.Control>
				</Col>
			</Form.Row>
			<Form.Label>Check Out</Form.Label>
			<Form.Row className="justify-content-center">
				<Col xs="auto">
					<Form.Label htmlFor="checkOutDate">Date</Form.Label>
					<Form.Control type="date" id="checkOutDate" value={ checkOutDate }
					              onChange={ (event) => setCheckOutDate(event.target.value) }></Form.Control>
				</Col>
				<Col xs="auto">
					<Form.Label htmlFor="checkOutTime">Time</Form.Label>
					<Form.Control type="time" id="checkOutTime" value={ checkOutTime }
					              onChange={ (event) => setCheckOutTime(event.target.value) }></Form.Control>
				</Col>
			</Form.Row>
			<Form.Row className="justify-content-center">
				<Button onClick={ directSubmission }
				        variant="success">{ (entryExists) ? "Aktualisieren" : "Speichern" }</Button>
			</Form.Row>
		</Form>
	)

}
