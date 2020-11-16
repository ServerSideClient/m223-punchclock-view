import React, {useEffect, useState} from "react";
import {Button, Col, Dropdown, Form} from 'react-bootstrap';
import {DateTime, Settings} from 'luxon';
import {updateEntry, saveEntry, fetchCategories} from './ApiTalker';

export default function EntryForm(props) {

    const [entryExists, setEntryExists] = useState(false);
    const [entryId, setEntryId] = useState(0);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkInTime, setCheckInTime] = useState('00:00');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('00:00');
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Settings.defaultLocale = "local";
        if (props.entry) {
            let entry = props.entry;
            setEntryExists(true);
            setEntryId(entry.id);
            let checkIn = DateTime.fromISO(entry.checkIn);
            setCheckInDate(checkIn.toISODate());
            setCheckInTime(checkIn.toISOTime({
                suppressMilliseconds: true,
                suppressSeconds: true,
                includeOffset: false
            }));
            let checkOut = DateTime.fromISO(entry.checkOut);
            setCheckOutDate(checkOut.toISODate());
            setCheckOutTime(checkOut.toISOTime({
                suppressMilliseconds: true,
                suppressSeconds: true,
                includeOffset: false
            }));
            if (entry.category) {
                setCategory(entry.category);
            }
        }
        listCategories();
    }, [props.entry]);

    function validFields() {
        let checkIn = DateTime.fromFormat(`${checkInDate} ${checkInTime}`, 'yyyy-MM-dd HH:mm');
        let checkOut = DateTime.fromFormat(`${checkOutDate} ${checkOutTime}`, 'yyyy-MM-dd HH:mm');
        return checkIn.diff(checkOut) <= 0;
    }

    function directSubmission() {
        if (validFields()) {
            if (entryExists) {
                updateTheEntry();
            } else {
                saveTheEntry();
            }
            props.popup.current.close();
        } else {
            alert('Check-In soll früher als Check-Out sein.');
        }
    }

    function listCategories() {
        fetchCategories().then((response) => response.json())
            .then((categories) => setCategories(categories));
    }

    function updateTheEntry() {
        let entry = constructEntry();
        updateEntry(entry, entryId);
    }

    function constructEntry() {
        let checkIn = DateTime.fromFormat(`${checkInDate} ${checkInTime}`, 'yyyy-MM-dd HH:mm').toISO({includeOffset: false});
        let checkOut = DateTime.fromFormat(`${checkOutDate} ${checkOutTime}`, 'yyyy-MM-dd HH:mm').toISO({includeOffset: false});
        return {
            checkIn, checkOut, category
        };
    }

    function saveTheEntry() {
        let entry = constructEntry();
        saveEntry(entry);
    }

    return (
        <Form>
            <Dropdown>
                <Dropdown.Toggle className="justify-content-center"
                                 variant="info">{(category != null) ? category.title : 'Kategorie'}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        categories.map((categoryItem) => (
                            <Dropdown.Item eventKey={categoryItem.title}
                                           onSelect={() => setCategory(categoryItem)}>
                                {categoryItem.title}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
            <Form.Label>Check In</Form.Label>
            <Form.Row className="justify-content-center">
                <Col xs="auto">
                    <Form.Label htmlFor="checkInDate">Date</Form.Label>
                    <Form.Control type="date" id="checkInDate" value={checkInDate}
                                  onChange={(event) => setCheckInDate(event.target.value)}/>
                </Col>
                <Col xs="auto">
                    <Form.Label htmlFor="checkInTime">Time</Form.Label>
                    <Form.Control type="time" id="checkInTime" value={checkInTime}
                                  onChange={(event) => setCheckInTime(event.target.value)}/>
                </Col>
            </Form.Row>
            <Form.Label>Check Out</Form.Label>
            <Form.Row className="justify-content-center">
                <Col xs="auto">
                    <Form.Label htmlFor="checkOutDate">Date</Form.Label>
                    <Form.Control type="date" id="checkOutDate" value={checkOutDate}
                                  onChange={(event) => setCheckOutDate(event.target.value)}/>
                </Col>
                <Col xs="auto">
                    <Form.Label htmlFor="checkOutTime">Time</Form.Label>
                    <Form.Control type="time" id="checkOutTime" value={checkOutTime}
                                  onChange={(event) => setCheckOutTime(event.target.value)}/>
                </Col>
            </Form.Row>
            <Form.Row className="justify-content-center">
                <Button onClick={directSubmission}
                        variant="success">{(entryExists) ? "Aktualisieren" : "Speichern"}</Button>
            </Form.Row>
        </Form>
    )

}
