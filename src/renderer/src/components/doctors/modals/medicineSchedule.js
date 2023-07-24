import React, { useState, Fragment, useRef } from 'react';
import { Modal,Button,Row,Col,Form,Tab,Nav } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; 

function MedicineSchedule({selectedMedicineList}) {

    const [remarks, setRemarks] = useState([{id: 1, name: 'After meal'}, {id: 2, name: 'Before meal'}, {id: 3, name: 'Night'}]);
    const [selectedRemarks, setSelectedRemarks] = useState([]);


    const typeaheadRef = useRef(null);
    const handleChange = (selectedOption) => {
        let selectedData = selectedOption[0];
        if (remarks.some(remark => remark.name === selectedData.name)) {
            if (!selectedRemarks.some(remark => remark.id === selectedData.id)) {
                setSelectedRemarks([...selectedRemarks, {id: selectedData.id, name: selectedData.name, remarks: ''}]);
            }
        }
        typeaheadRef.current.clear();
    }

    const selectedMedicineRow = selectedMedicineList.map((item, index) => {
        if (item.type.toLowerCase() === 'tablet' || item.type.toLowerCase() === 'capsule') {
            return (
                <>
                    <hr />
                    <Row className="">
                        <Col>{++index}. {item.name}</Col>
                        <Col className="text-right">
                            <i className="fa fa-times cursor-pointer" aria-hidden="true"></i>
                        </Col>
                    </Row>
                    <Row className="mt-2" key={index}>
                        <Col md={5} className="text-center">
                            <Form.Label>Schedule</Form.Label>
                            <Form.Group className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Form.Control type="number" size="sm" style={{width: "30%"}} min={0} className="w-60" /> <div>+ </div>
                                    <Form.Control type="number" size="sm" style={{width: "30%"}} min={0} className="w-60" /> <div>+ </div>
                                    <Form.Control type="number" size="sm" style={{width: "30%"}} min={0} className="w-60" />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={3} className="text-center">
                            <Form.Label>Unit</Form.Label>
                            <select className="form-control form-control-sm">
                                <option>টি</option>
                            </select>
                        </Col>
                        <Col md={3} className="text-center">
                            <Form.Label className="text-center">Duration</Form.Label>
                            <Form.Group className="mb-3">
                                <Row>
                                    <Form.Control size="sm" min={0} style={{width: "50%"}} type="number" />
                                    <Form.Select className="form-control form-control-sm" style={{width: "50%"}} >
                                        <option>Day(s)</option>
                                        <option>Month(s)</option>
                                        <option>Year(s)</option>
                                    </Form.Select>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            {selectedRemarks.map((item) => <Button variant="primary" className="btn btn-sm mr-3">{item.name}</Button>)}
                        </Col>
                        <Col md={5} className="text-center">
                            {/* <Typeahead
                                allowNew
                                labelKey="name"
                                ref={typeaheadRef}
                                id="custom-selections-example"
                                newSelectionPrefix="Click to add new: "
                                options={remarks}
                                placeholder="Search / Add diagnosis here ..."
                                onChange={handleChange}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            /> */}
                        </Col>
                    </Row>
                </>
            )
        } else {
            return (
                <>
                    <hr />
                    <Row className="">
                        <Col>{++index}. {item.name}</Col>
                        <Col className="text-right">
                            <i className="fa fa-times cursor-pointer" aria-hidden="true"></i>
                        </Col>
                    </Row>
                    <Row className="mt-2" key={item}>
                        <Col md={5} className="text-center">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Group className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Form.Control type="number" size="sm" min={0} className="w-60" />
                                    <select className="form-control form-control-sm">
                                        <option>ml</option>
                                        <option>cm</option>
                                    </select>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={3} className="text-center">
                            <Form.Label>Schedule</Form.Label>
                            <Form.Group className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Form.Control type="number" size="sm" min={0} className="w-60" />
                                    <select className="form-control form-control-sm">
                                        <option>times</option>
                                    </select>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={3} className="text-center">
                            <Form.Label>Duration</Form.Label>
                            <Form.Group className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Form.Control type="number" size="sm" style={{width: "50%"}} min={0} className="w-60" />
                                    <Form.Select className="form-control form-control-sm" style={{width: "50%"}} >
                                        <option>Day(s)</option>
                                        <option>Month(s)</option>
                                        <option>Year(s)</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            {selectedRemarks.map((item) => <Button variant="primary" className="btn btn-sm mr-3">{item.name}</Button>)}
                        </Col>
                        <Col md={5} className="text-center">
                            {/* <Typeahead
                                allowNew
                                labelKey="name"
                                ref={typeaheadRef}
                                id="custom-selections-example"
                                newSelectionPrefix="Click to add new: "
                                options={remarks}
                                placeholder="Search / Add diagnosis here ..."
                                onChange={handleChange}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            /> */}
                        </Col>
                    </Row>
                </>
            )
        }
    })

    return (
        <>
            {selectedMedicineRow}
        </>
    )
}
export default MedicineSchedule;