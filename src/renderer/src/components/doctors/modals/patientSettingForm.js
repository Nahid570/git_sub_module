import React, { memo, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { usePatchRequest } from '../../../hooks/usePatchRequest';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PatientSettingForm = (props) => {
  let {
    patientItemSetting,
    patientItems,
    isPatientSettingModal,
    closePatientSettingModal,
  } = props;
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (
      patientItemSetting?.name === 'age' &&
      !patientItemSetting.hasOwnProperty('unitProperties')
    ) {
      patientItemSetting['unitProperties'] = defaultUnitProperties();
      props.handlePatientItemSetting(patientItemSetting);
    }
  }, [patientItemSetting]);

  const defaultUnitProperties = () => {
    return {
      years: { label: 'Years', enabled: true },
      months: { label: 'Months', enabled: false },
      days: { label: 'Days', enabled: false },
      hours: { label: 'Hours', enabled: false },
    };
  };

  const {
    isLoading: isLoadingPatientPost,
    mutate: submitPatientPrintSetting,
  } = usePatchRequest(
    'settings/prescription-patient-item-setting',
    {
      organizationId: activeOrganization.id,
      items: patientItems,
    },
    (res) => {
      closePatientSettingModal(false);
      toast.success('Updated successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );
  const handleSubmit = () => {
    submitPatientPrintSetting();
  };
  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const handlePatientInputSetting = (
    fieldType,
    properties,
    paddingType,
    fieldName,
    value,
  ) => {
    if (fieldType === 'label' || fieldType === 'value') {
      if (fieldName === 'isHidden') {
        patientItemSetting[fieldType][properties][fieldName] = value;
      } else {
        patientItemSetting[fieldType][properties][paddingType][
          fieldName
        ] = value;
      }
    } else if (fieldName === 'labelName') {
      patientItemSetting['label'][fieldName] = value;
    } else {
      patientItemSetting[fieldName] = value;
    }
    props.handlePatientItemSetting(patientItemSetting);
  };

  const handleAgeUnit = (rowName, fieldName, value) => {
    patientItemSetting.unitProperties[rowName][fieldName] = value;
    props.handlePatientItemSetting(patientItemSetting);
  };

  return (
    <>
      <Modal show={isPatientSettingModal} size="lg">
        <Modal.Header className="common-modal-header">
          <Col className="pl-0">
            <Modal.Title>Patient Setting</Modal.Title>
          </Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              onClick={() => closePatientSettingModal()}
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body className="pb-2">
          <Form>
            <Row>
              <Col>
                Field Name:{' '}
                <b>
                  {patientItemSetting.name} {patientItemSetting?.isHidden}
                </b>
              </Col>
              <Col className="text-right">
                <Form.Check
                  inline
                  label=" Is Hidden ?"
                  name="page-border"
                  type={'checkbox'}
                  checked={!patientItemSetting?.isHidden === false}
                  onChange={(e) =>
                    handlePatientInputSetting(
                      '',
                      '',
                      '',
                      'isHidden',
                      e.target.checked,
                    )
                  }
                />
              </Col>
            </Row>
            <hr className="custom-hr" />
            <Row className="align-items-center mb-3">
              <Col md={4}>
                <Form.Group
                  as={Row}
                  controlId="width"
                  className="align-items-center"
                >
                  <Form.Label column sm="3">
                    Width
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={patientItemSetting?.width}
                      onChange={(e) =>
                        handlePatientInputSetting(
                          '',
                          '',
                          '',
                          'width',
                          e.target.value,
                        )
                      }
                    />
                    <small className="v-error">
                      {getErrorMessage('brandName')}
                    </small>
                  </Col>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group
                  as={Row}
                  controlId="unit"
                  className="align-items-center"
                >
                  <Form.Label column sm="2">
                    Unit
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={patientItemSetting?.unit}
                      onChange={(e) =>
                        handlePatientInputSetting(
                          '',
                          '',
                          '',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group
                  as={Row}
                  controlId="row"
                  className="align-items-center"
                >
                  <Form.Label column sm="2">
                    Row
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      readOnly
                      defaultValue={patientItemSetting?.rowNumber}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* <Row>
                            <Col md={1}>
                            Border:{" "}
                            </Col>
                            <Col md={2}>
                            {" "}
                            <Form.Check
                                inline
                                label="Left"
                                name="left-border"
                                type={"checkbox"}
                                checked={ patientItemSetting?.borderLeft === true }
                                onChange={(e) =>
                                    handlePatientInputSetting(
                                    '',
                                    '',
                                    '',
                                    "borderLeft",
                                    e.target.checked
                                )
                                }
                            />
                            </Col>
                            <Col md={2}>
                            {" "}
                            <Form.Check
                                inline
                                label="Right"
                                name="page-border"
                                type={"checkbox"}
                                checked={ patientItemSetting?.borderRight === true }
                                onChange={(e) =>
                                    handlePatientInputSetting(
                                    '',
                                    '',
                                    '',
                                    "borderRight",
                                    e.target.checked
                                )
                                }
                            />
                            </Col>
                            <Col md={2}>
                            {" "}
                            <Form.Check
                                inline
                                label="Top"
                                name="page-border"
                                type={"checkbox"}
                                checked={ patientItemSetting?.borderTop === true }
                                onChange={(e) =>
                                    handlePatientInputSetting(
                                    '',
                                    '',
                                    '',
                                    "borderTop",
                                    e.target.checked
                                )
                                }
                            />
                            </Col>
                            <Col md={2}>
                            {" "}
                            <Form.Check
                                inline
                                label="Bottom"
                                name="page-border"
                                type={"checkbox"}
                                checked={ patientItemSetting?.borderBottom === true }
                                onChange={(e) =>
                                    handlePatientInputSetting(
                                    '',
                                    '',
                                    '',
                                    "borderBottom",
                                    e.target.checked
                                )
                                }
                            />
                            </Col>
                        </Row> */}
            <hr className="custom-hr" />
            <h3>Label Properties</h3>
            <hr className="custom-hr" />
            <Row>
              <Col>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="4">
                    Label Name
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={patientItemSetting?.label?.labelName}
                      onChange={(e) =>
                        handlePatientInputSetting(
                          '',
                          '',
                          '',
                          'labelName',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col md={1}></Col>
                </Form.Group>
              </Col>
              <Col className="text-right">
                <Form.Check
                  inline
                  label=" Is Hidden ?"
                  name="page-border"
                  type={'checkbox'}
                  checked={
                    !patientItemSetting?.label?.properties?.isHidden === false
                  }
                  onChange={(e) =>
                    handlePatientInputSetting(
                      'label',
                      'properties',
                      '',
                      'isHidden',
                      e.target.checked,
                    )
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="4">
                    Padding Top
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingTop
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingTop',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingTop?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingTop',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="5" className="text-right">
                    Padding Bottom
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingBottom
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingBottom',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingBottom
                          ?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingBottom',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="4">
                    Padding Left
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingLeft
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingLeft',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingLeft?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingLeft',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="5" className="text-right">
                    Padding Right
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingRight
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingRight',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.label?.properties?.paddingRight
                          ?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'label',
                          'properties',
                          'paddingRight',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <hr className="custom-hr" />
            <h3>Value Properties</h3>
            <hr className="custom-hr" />
            <Row>
              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="4">
                    Padding Top
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingTop
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingTop',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingTop?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingTop',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="5" className="text-right">
                    Padding Bottom
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingBottom
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingBottom',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingBottom
                          ?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingBottom',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="4">
                    Padding Left
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingLeft
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingLeft',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingLeft?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingLeft',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group as={Row} className="mb-3" controlId="width">
                  <Form.Label column sm="5" className="text-right">
                    Padding Right
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      className="form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingRight
                          ?.quantity
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingLeft',
                          'quantity',
                          e.target.value,
                        )
                      }
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Select
                      className="form-control form-control-sm"
                      defaultValue={
                        patientItemSetting?.value?.properties?.paddingRight
                          ?.unit
                      }
                      onChange={(e) =>
                        handlePatientInputSetting(
                          'value',
                          'properties',
                          'paddingRight',
                          'unit',
                          e.target.value,
                        )
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="px">px</option>
                      <option value="in">inches</option>
                      <option value="%">%</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {patientItemSetting?.name === 'age' && (
              <>
                <hr className="custom-hr" />
                <h3>Unit Properties</h3>
                <hr className="custom-hr" />
                <Row>
                  <Col md={6}>
                    <Form.Group as={Row} controlId="width">
                      <Form.Label column sm="4">
                        Years Unit{' '}
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="text"
                          className="form-control-sm"
                          defaultValue={
                            patientItemSetting?.unitProperties?.years?.label
                          }
                          onChange={(e) =>
                            handleAgeUnit('years', 'label', e.target.value)
                          }
                        />
                      </Col>
                      <Col sm="4" className="pt-1">
                        <Form.Check
                          inline
                          label="Enable?"
                          name="year-unit"
                          id="year-unit"
                          type={'checkbox'}
                          checked={
                            !patientItemSetting?.unitProperties?.years
                              ?.enabled === false
                          }
                          onChange={(e) =>
                            handleAgeUnit('years', 'enabled', e.target.checked)
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="width">
                      <Form.Label column sm="4" className="text-right">
                        Months Unit
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="text"
                          className="form-control-sm"
                          defaultValue={
                            patientItemSetting?.unitProperties?.months?.label
                          }
                          onChange={(e) =>
                            handleAgeUnit('months', 'label', e.target.value)
                          }
                        />
                      </Col>
                      <Col sm="4" className="pt-1">
                        <Form.Check
                          inline
                          label="Enable?"
                          name="month-unit"
                          id="month-unit"
                          type={'checkbox'}
                          checked={
                            !patientItemSetting?.unitProperties?.months
                              ?.enabled === false
                          }
                          onChange={(e) =>
                            handleAgeUnit('months', 'enabled', e.target.checked)
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="width">
                      <Form.Label column sm="4">
                        Days Unit
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="text"
                          className="form-control-sm"
                          defaultValue={
                            patientItemSetting?.unitProperties?.days?.label
                          }
                          onChange={(e) =>
                            handleAgeUnit('days', 'label', e.target.value)
                          }
                        />
                      </Col>
                      <Col sm="3" className="pt-1">
                        <Form.Check
                          inline
                          label="Enable?"
                          name="days-unit"
                          id="days-unit"
                          type={'checkbox'}
                          checked={
                            !patientItemSetting?.unitProperties?.days
                              ?.enabled === false
                          }
                          onChange={(e) =>
                            handleAgeUnit('days', 'enabled', e.target.checked)
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="width">
                      <Form.Label column sm="4" className="text-right">
                        Hours Unit
                      </Form.Label>
                      <Col sm="4">
                        <Form.Control
                          type="text"
                          className="form-control-sm"
                          defaultValue={
                            patientItemSetting?.unitProperties?.hours?.label
                          }
                          onChange={(e) =>
                            handleAgeUnit('hours', 'label', e.target.value)
                          }
                        />
                      </Col>
                      <Col sm="4" className="pt-1">
                        <Form.Check
                          inline
                          label="Enable?"
                          name="hour-unit"
                          id="hour-unit"
                          type={'checkbox'}
                          checked={
                            !patientItemSetting?.unitProperties?.hours
                              ?.enabled === false
                          }
                          onChange={(e) =>
                            handleAgeUnit('hours', 'enabled', e.target.checked)
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
            <hr className="custom-hr" />
            <Row>
              <Col className="text-center">
                <Button variant="primary" size="md" onClick={handleSubmit}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(PatientSettingForm);
