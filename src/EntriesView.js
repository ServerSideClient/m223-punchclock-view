import React, { useEffect, useRef, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import EntryForm from "./EntryForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { fetchEntries, deleteEntry, logout } from "./ApiTalker";
import { Redirect } from 'react-router-dom';

export default function EntriesView() {

	const [authorised, setAuthorised] = useState(true);
	const [activeEntry, setActiveEntry] = useState({});
	const [displayEdit, setDisplayEdit] = useState(false);
	const [entries, setEntries] = useState([]);

	const popup = useRef();

	function listEntries() {
		fetchEntries()
			.then((response) => response.json())
			.then((entriesData) => {
				setEntries(entriesData);
			}).catch(() => setAuthorised(false));
	}

	useEffect(() => {
		listEntries();
	}, []);

	function deleteThisEntry(entryId) {
		deleteEntry(entryId)
			.then((response) => {
				if ( response.ok ) {
					let entryList = entries.filter((entry) => entry.id !== entryId);
					setEntries(entryList);
				}
			}).catch(() => setAuthorised(false));
	}

	function editEntry(entry) {
		setActiveEntry(entry);
		setDisplayEdit(true);
	}

	function leave() {
		logout();
		setAuthorised(false);
	}

	return (
		(authorised === true) ?
			<div className="col-xl-auto container mt-3">
				<Button variant="dark" onClick={ leave }>Verlassen</Button>
				<br/>
				<br/>
				<Popup trigger={ <Button>Erstellen</Button> } ref={ popup } onClose={listEntries} lockScroll modal><EntryForm
					popup={ popup }/></Popup>

				<Table striped bordered hover className="mt-3">
					<thead>
					<tr>
						<th>ID</th>
						<th>Check-In</th>
						<th>Check-Out</th>
						<th>Category</th>
						<th/>
						<th/>
					</tr>
					</thead>
					<tbody>
					{
						(entries.length > 0) ?
							entries.map((entry, key) => (
								<tr key={ key }>
									<td>{ entry.id }</td>
									<td>{ new Date(entry.checkIn).toLocaleString() }</td>
									<td>{ new Date(entry.checkOut).toLocaleString() }</td>
									<td>{ entry.category }</td>
									<td><Button variant="danger"
									            onClick={ () => deleteThisEntry(entry.id) }>Löschen</Button>
									</td>
									<td><Button variant="info" onClick={ () => editEntry(entry) }>Bearbeiten</Button>
									</td>
								</tr>
							))
							: <tr key={ 0 }></tr>
					}
					</tbody>
				</Table>

				<Popup open={ displayEdit } onClose={ () => {
					setDisplayEdit(false);
					listEntries();
				} }><EntryForm
					entry={ activeEntry } popup={ popup }/></Popup>

			</div>
			: <Redirect to="/login" push={ false }/>
	)
}
