import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import EntryForm from "./EntryForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function EntriesView() {

	const [activeEntry, setActiveEntry] = useState({});
	const [displayEdit, setDisplayEdit] = useState(false);
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		fetch('/entries')
			.then((response) => response.json())
			.then((entriesData) => {
				setEntries(entriesData);
			})
	}, []);

	function deleteEntry(entryId) {
		fetch(`/entries/${ entryId }`, {method: 'DELETE'})
			.then((response) => {
				if ( response.ok ) {
					let entryList = entries.filter((entry) => entry.id !== entryId);
					setEntries(entryList);
				}
			});
	}

	function editEntry(entry) {
		setActiveEntry(entry);
		setDisplayEdit(true);
	}

	return (
		<div className="col-xl-auto container mt-3">

			<Popup trigger={ <Button>Erstellen</Button> } lockScroll modal><EntryForm/></Popup>

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
					entries.map((entry, key) => (
						<tr key={ key }>
							<td>{ entry.id }</td>
							<td>{ new Date(entry.checkIn).toLocaleString() }</td>
							<td>{ new Date(entry.checkOut).toLocaleString() }</td>
							<td>{ entry.category }</td>
							<td><Button variant="danger" onClick={ () => deleteEntry(entry.id) }>Löschen</Button></td>
							<td><Button variant="info" onClick={ () => editEntry(entry) }>Bearbeiten</Button></td>
						</tr>
					))
				}
				</tbody>
			</Table>

			<Popup open={ displayEdit } onClose={ () => setDisplayEdit(false) }><EntryForm
				entry={ activeEntry }/></Popup>

		</div>
	)
}
