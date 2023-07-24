import React, { useState, Fragment, useEffect, useRef, memo } from 'react';
import { Modal, Button, Row, Col, Form, Tab } from 'react-bootstrap';
import { getRequest, postRequest } from '../../../utils/axiosRequests';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import ModalHeader from '../partials/modalHeader';
import {
  MEDICINE_TYPES_SHORTS,
  countOccurrencesOf,
} from '../../../utils/helpers';
import HistoryTabNav from '../partials/historyTabNav';
import MedicalHistory from '../partials/history/medicalHistory';
import GynecologyHistory from '../partials/history/gynecologyHistory';
import Surgical from '../partials/history/surgical';
import Others from '../partials/history/others';
import MedicalHistoryGroup from '../partials/history/medicalHistoryGroup';
import MedicalHistoryGroupModal from './medicalHistoryGroupModal';
import SearchArea from '../partials/searchArea';

const HistoryModal = ({
  showHistory,
  setShowHistory,
  selectedHistoryTab,
  setSelectedHistoryTab,
  selectedHistories,
  setSelectedHistories,
}) => {
  const typeaheadRef = useRef(null);
  const anotherRef = useRef(null);
  const investigationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [medicinesInSearch, setMedicinesInSearch] = useState([]);
  const [investigationList, setInvestigationList] = useState([]);
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [medicalHistoryInSearch, setMedicalHistoryInSearch] = useState([]);
  const [medicalHistoryGroups, setMedicalHistoryGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isGroupModal, setIsGroupModal] = useState(false);
  let selectedData =
    Object.keys(selectedHistories).length !== 0
      ? selectedHistories
      : {
          medical: [],
          drugs: {
            D_H: [],
            D_A: [],
          },
          investigations: [],
          personal: {
            smoker: false,
            alcoholic: false,
            tobacco: false,
            notes: '',
          },
          family: '',
        };

  let { medical } = selectedData;
  medical = Array.isArray(medical) ? selectedData?.medical : [];

  useEffect(() => {
    getMedicalHistoryList();
    getMedicalHistoryGroupList();
    getInvestigationList();
  }, []);

  const getMedicalHistoryList = () => {
    getRequest('medical-histories')
      .then((data) => {
        setMedicalHistories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMedicalHistoryGroupList = () => {
    getRequest('medical-histories/groups')
      .then((data) => {
        setMedicalHistoryGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getInvestigationList = () => {
    getRequest('investigations')
      .then((data) => {
        setInvestigationList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAction = (type, item) => {
    if (type === 'investigation') {
      selectedData.investigations = selectedData.investigations?.filter(
        (investigation) => investigation.name !== item.name,
      );
    } else if (type === 'dh') {
      selectedData.drugs['D_H'] = selectedData.drugs.D_H.filter(
        (drug) => drug !== item,
      );
    } else {
      selectedData.drugs['D_A'] = selectedData.drugs.D_A.filter(
        (drug) => drug !== item,
      );
    }
    setSelectedHistories({ ...selectedData });
  };

  const investigationData = (index, val) => {
    selectedData.investigations[index]['result'] = val;
    setSelectedHistories({ ...selectedData });
  };

  const daHandleChange = (selectedOption) => {
    const item = selectedOption[0];
    const name = MEDICINE_TYPES_SHORTS[item.type] + ' ' + item.brandName;
    const strength =
      item.strength && countOccurrencesOf(item.strength, '+') <= 1
        ? ' (' + item.strength + ')'
        : '';
    const fullName = name + ' ' + strength;
    if (!selectedData.drugs.D_A.some((drug) => drug === fullName)) {
      let data = [...selectedData.drugs['D_A'], fullName];
      selectedData.drugs['D_A'] = data;
      setSelectedHistories({ ...selectedData });
    }
    anotherRef.current.clear();
  };

  const dhHandleChange = (selectedOption) => {
    const item = selectedOption[0];
    const name = MEDICINE_TYPES_SHORTS[item.type] + ' ' + item.brandName;
    const strength =
      item.strength && countOccurrencesOf(item.strength, '+') <= 1
        ? ' (' + item.strength + ')'
        : '';
    const fullName = name + ' ' + strength;
    if (!selectedData.drugs.D_H.some((drug) => drug === fullName)) {
      let data = [...selectedData.drugs['D_H'], fullName];
      selectedData.drugs['D_H'] = data;
      setSelectedHistories({ ...selectedData });
    }
    typeaheadRef.current.clear();
  };

  const removeMedicalHistory = (item) => {
    setSelectedHistories({
      ...selectedData,
      medical: selectedData?.medical.filter((data) => data.id !== item.id),
    });
  };

  const handleMedicalHistory = (index, fieldName, val) => {
    if (fieldName === 'present' || fieldName === 'absent') {
      selectedData.medical[index]['present'] = '';
      selectedData.medical[index]['absent'] = '';
    }
    selectedData.medical[index][fieldName] = val;
    setSelectedHistories({ ...selectedData });
  };

  const familyHistoryData = (val) => {
    selectedData['family'] = val;
    setSelectedHistories({ ...selectedData });
  };
  const personalHistoryData = (fieldName, val) => {
    if (fieldName === 'notes') {
      selectedData['personal'].notes = val;
    } else {
      selectedData['personal'][fieldName] = val ? true : false;
    }
    setSelectedHistories({ ...selectedData });
  };

  const mergeSelectedInv = (newData) => {
    const selectedInvestigate = [
      ...selectedData.investigations,
      { name: newData, result: '' },
    ];
    selectedData.investigations = selectedInvestigate;
    setSelectedHistories({ ...selectedData });
  };

  const handleInvestigation = (selectedOption) => {
    const selectedData = selectedOption[0]?.name;
    if (investigationList.some((item) => item.name === selectedData)) {
      if (
        !selectedData?.investigations?.some(
          (item) => item.name === selectedData,
        )
      ) {
        mergeSelectedInv(selectedData);
      }
    } else {
      postRequest('investigations', { name: selectedData })
        .then((data) => {
          mergeSelectedInv(selectedData);
          setInvestigationList([...investigationList, data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    investigationRef?.current?.clear();
  };

  const clearHistoryInput = (index) => {
    selectedData.medical[index].present = '';
    selectedData.medical[index].absent = '';
    setSelectedHistories({ ...selectedData });
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `medicines?name=${searchKey}`;

    getRequest(url)
      .then((data) => {
        if (data.data.length > 0) {
          setMedicinesInSearch(data.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterBy = () => true;

  const mergeGroup = (data) => {
    setMedicalHistoryGroups([...medicalHistoryGroups, data]);
  };

  const handleSearchOrNew = (selectedOption) => {
    if (selectedOption.doctorId) {
      if (!medical.some((item) => item.name === selectedOption.name)) {
        medical = [
          ...medical,
          {
            id: selectedOption?.id,
            name: selectedOption.name,
            present: true,
            absent: false,
            duration: '',
            unit: 'day(s)',
            note: '',
          },
        ];
        setSelectedHistories({ ...selectedData, medical });
      }
    } else {
      postRequest('medical-histories', { name: selectedOption.name })
        .then((data) => {
          setMedicalHistories([...medicalHistories, data]);
          medical = [
            ...medical,
            {
              id: data.id,
              name: data.name,
              present: true,
              absent: false,
              unit: 'day(s)',
              duration: '',
              note: '',
            },
          ];
          setSelectedHistories({ ...selectedData, medical });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setMedicalHistoryInSearch([]);
    setSearchQuery('');
  };

  const handleSearchMedicine = (searchKey) => {
    setIsLoading(true);
    const url = `medical-histories?name=${searchKey}`;
    setSearchQuery(searchKey);

    getRequest(url)
      .then((data) => {
        if (data.data.length > 0) {
          const customizedResults = data.data.map((item) => {
            return {
              ...item,
              label: item.name,
              value: item.name,
            };
          });
          setMedicalHistoryInSearch(customizedResults);
        } else {
          setMedicalHistoryInSearch([{ id: 'notFound', name: searchKey }]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dhDrugList = selectedData?.drugs?.D_H?.map((item, index) => {
    return (
      <Row className={index === 0 ? 'pt-2' : 'pt-1'} key={index}>
        <Col md={10}>{item}</Col>
        <Col md={2}>
          <span
            className="float-right cursor-pointer"
            onClick={() => deleteAction('dh', item)}
          >
            <i
              className="fa fa-times-circle"
              style={{ color: '#CB2020D9' }}
            ></i>
          </span>
        </Col>
      </Row>
    );
  });

  const daDrugList = selectedData?.drugs?.D_A?.map((item, index) => {
    return (
      <Row className={index === 0 ? 'pt-2' : 'pt-1'} key={index}>
        <Col md={10}>{item}</Col>
        <Col md={2}>
          <span
            className="float-right cursor-pointer"
            onClick={() => deleteAction('da', item)}
          >
            <i
              className="fa fa-times-circle"
              style={{ color: '#CB2020D9' }}
            ></i>
          </span>
        </Col>
      </Row>
    );
  });

  const selectedInvestigations = () => {
    return selectedData?.investigations?.map((item, index) => {
      return (
        <Row className={'mt-1'} key={index}>
          <Col md={5}>{item.name}</Col>
          <Col md={6}>
            <Form.Control
              rows={3}
              size="sm"
              placeholder="Add result"
              defaultValue={item?.result}
              onChange={(e) => investigationData(index, e.target.value)}
            />
          </Col>
          <Col md={1} className="text-center">
            <span
              className="cursor-pointer"
              onClick={() => deleteAction('investigation', item)}
            >
              <i
                className="fa fa-times-circle pt-2"
                style={{ color: '#CB2020D9' }}
              ></i>
            </span>
          </Col>
        </Row>
      );
    });
  };

  const personalInfo = () => {
    return (
      <>
        <Form.Group as={Row} className="mb-1 mt-1">
          <Col sm="2">
            <Form.Label className="font-weight-bold">P/H:</Form.Label>
          </Col>
          <Col sm="3">
            <Form.Check
              type={`checkbox`}
              id={`smoker`}
              label={`Smoker`}
              checked={selectedData?.personal?.smoker === true}
              onChange={(e) => personalHistoryData('smoker', e.target.checked)}
            />
          </Col>
          <Col sm="3">
            <Form.Check
              type={`checkbox`}
              id={`alcoholic`}
              label={`Alcoholic`}
              checked={selectedData?.personal?.alcoholic === true}
              onChange={(e) =>
                personalHistoryData('alcoholic', e.target.checked)
              }
            />
          </Col>
          <Col sm="3">
            <Form.Check
              type={`checkbox`}
              id={`tobacco`}
              label={`Tobacco`}
              checked={selectedData?.personal?.tobacco === true}
              onChange={(e) => personalHistoryData('tobacco', e.target.checked)}
            />
          </Col>
        </Form.Group>
        <Row>
          <Col md="2" className="font-weight-bold mt-1">
            Note:
          </Col>
          <Col md="10">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add note"
              defaultValue={selectedData?.personal?.notes}
              onChange={(e) => personalHistoryData('notes', e.target.value)}
            />
          </Col>
        </Row>
      </>
    );
  };

  const selectedMedicalHistories = () => {
    return medical?.map((item, index) => {
      return (
        <Row className="selected-item-row" key={index}>
          <Col md={2} className="font-weight-bold pr-0 pl-1">
            {item.name}
          </Col>
          <Col md={3}>
            <div className="input-group">
              <Form.Check
                type={`radio`}
                id={`present-${index}`}
                className="mr-2"
                // name="present"
                label={`Present`}
                checked={selectedData?.medical?.[index]?.present === 'yes'}
                onChange={(e) =>
                  handleMedicalHistory(index, 'present', 'yes')
                }
              />
              <Form.Check
                type={`radio`}
                id={`absent-${index}`}
                // name="absent"
                label={`Absent`}
                checked={selectedData?.medical?.[index]?.absent === 'no'}
                onChange={(e) =>
                  handleMedicalHistory(index, 'absent', 'no')
                }
              />
            </div>
          </Col>
          <Col md={1}>
            <Button
              size="sm"
              variant={
                selectedData?.medical?.[index]?.present ||
                selectedData?.medical?.[index]?.absent
                  ? 'primary'
                  : 'light'
              }
              onClick={() => clearHistoryInput(index)}
            >
              Clear
            </Button>
            {/* <span className="ml-4">For</span> */}
          </Col>
          <Col md={3}>
            <div className="input-group">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Duration"
                value={selectedData.medical?.[index]?.duration}
                defaultValue={selectedData.medical?.[index]?.duration}
                onChange={(e) =>
                  handleMedicalHistory(index, 'duration', e.target.value)
                }
              />
              <select
                className="form-control form-control-sm"
                value={selectedData.medical?.[index]?.unit}
                defaultValue={selectedData.medical?.DM?.unit}
                onChange={(e) =>
                  handleMedicalHistory(index, 'unit', e.target.value)
                }
              >
                <option value={'day(s)'}>Day(s)</option>
                <option value={'month(s)'}>Month(s)</option>
                <option value={'year(s)'}>Year(s)</option>
              </select>
            </div>
          </Col>
          <Col md={2} className="pl-0 pr-0">
            <Form.Control
              size="sm"
              className="w-60"
              as="textarea"
              rows={1}
              defaultValue={selectedData.medical?.[index]?.note}
              placeholder="Add note"
              onChange={(e) =>
                handleMedicalHistory(index, 'note', e.target.value)
              }
            />
          </Col>
          <Col className="text-center">
            <i
              className="fa fa-times-circle pt-2 cursor-pointer"
              aria-hidden="true"
              onClick={() => removeMedicalHistory(item)}
            ></i>
          </Col>
        </Row>
      );
    });
  };

  return (
    <>
      <Modal
        show={showHistory}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'History'} action={setShowHistory} />
        <Modal.Body className="pb-2 common-font-size">
          <SearchArea
            handleOnInputChange={handleSearchMedicine}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={medicalHistoryInSearch}
            placeholder={'medical history'}
          />
          <Tab.Container defaultActiveKey="medical">
            <HistoryTabNav
              action={setIsGroupModal}
              selectedItems={selectedData?.medical}
              setSelectedHistoryTab={setSelectedHistoryTab}
            />
            <Tab.Content className="pt-1 pl-2 pr-2 pb-2">
              <Tab.Pane eventKey="medical" className="add-scroll">
                <MedicalHistory
                  selectedData={selectedData}
                  medical={medical}
                  selectedHistories={selectedHistories}
                  setSelectedHistories={setSelectedHistories}
                  medicalHistories={medicalHistories}
                  medicalHistoryGroups={medicalHistoryGroups}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="medicalGroup" className="add-scroll">
                <MedicalHistoryGroup
                  medicalHistoryGroups={medicalHistoryGroups}
                  setMedicalHistoryGroups={setMedicalHistoryGroups}
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  selectedHistories={selectedData}
                  setSelectedHistories={setSelectedHistories}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="drug">
                <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3 common-font-size">
                      <Form.Label column sm="2">
                        D/H:
                      </Form.Label>
                      <Col sm="10" className="mt-1">
                        <AsyncTypeahead
                          labelKey={'brandName'}
                          ref={typeaheadRef}
                          filterBy={filterBy}
                          id="async-example"
                          isLoading={isLoading}
                          options={medicinesInSearch}
                          placeholder="Search here ..."
                          onChange={dhHandleChange}
                          minLength={1}
                          onSearch={handleOnInputChange}
                          size="sm"
                          renderMenuItemChildren={(option, props) => (
                            <Fragment>
                              {option.id !== 'notFound' ? (
                                <div>
                                  <span className="medicine-type">
                                    {option.type}
                                  </span>
                                  <span
                                    className="medicine-name"
                                    title={
                                      option.brandName + ' - ' + option.strength
                                    }
                                  >
                                    {option.brandName + ' - ' + option.strength}
                                  </span>
                                  <span className="medicine-company">
                                    {option.companyName}
                                  </span>
                                </div>
                              ) : (
                                <span>
                                  <span className="float-right">
                                    <i
                                      className="fa fa-plus-circle text-right"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </span>
                              )}
                            </Fragment>
                          )}
                        />
                        {dhDrugList}
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row} className="mb-3 common-font-size">
                      <Form.Label column sm="2">
                        D/A:
                      </Form.Label>
                      <Col sm="10" className="mt-1">
                        <AsyncTypeahead
                          labelKey={'brandName'}
                          ref={anotherRef}
                          filterBy={filterBy}
                          id="async-example"
                          isLoading={isLoading}
                          options={medicinesInSearch}
                          placeholder="Search / Add medicine here ..."
                          onChange={daHandleChange}
                          minLength={1}
                          onSearch={handleOnInputChange}
                          size="sm"
                          renderMenuItemChildren={(option, props) => (
                            <Fragment>
                              {option.id !== 'notFound' ? (
                                <div>
                                  <span className="medicine-type">
                                    {option.type}
                                  </span>
                                  <span
                                    className="medicine-name"
                                    title={
                                      option.brandName + ' - ' + option.strength
                                    }
                                  >
                                    {option.brandName + ' - ' + option.strength}
                                  </span>
                                  <span className="medicine-company">
                                    {option.companyName}
                                  </span>
                                </div>
                              ) : (
                                <span className="float-right">
                                  <i
                                    className="fa fa-plus-circle text-right"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              )}
                            </Fragment>
                          )}
                        />
                        {daDrugList}
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="investigation">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2" className="font-weight-bold">
                    Investigations
                  </Form.Label>
                  <Col sm="10" className="mt-1">
                    <Typeahead
                      allowNew
                      labelKey="name"
                      ref={investigationRef}
                      id="custom-selections-example"
                      newSelectionPrefix="Click to add new: "
                      options={investigationList}
                      placeholder="Search / Add investigation here ..."
                      onChange={handleInvestigation}
                      size="sm"
                      renderMenuItemChildren={(option, props) => (
                        <Fragment>
                          <span>{option.name}</span>
                        </Fragment>
                      )}
                    />
                    <div className="mt-3">{selectedInvestigations()}</div>
                  </Col>
                </Form.Group>
              </Tab.Pane>
              <Tab.Pane eventKey="personal">{personalInfo()}</Tab.Pane>
              <Tab.Pane eventKey="family" className="mb-1 mt-1">
                <Row>
                  <Col md="2" className="font-weight-bold mt-1">
                    Note:
                  </Col>
                  <Col md="10">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Add note"
                      defaultValue={selectedData.family}
                      onChange={(e) => familyHistoryData(e.target.value)}
                    />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane
                eventKey="gynecology"
                className="add-scroll"
                style={{ height: '410px' }}
              >
                <GynecologyHistory
                  selectedData={selectedData}
                  selectedHistories={selectedHistories}
                  setSelectedHistories={setSelectedHistories}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="surgical">
                <Surgical
                  selectedData={selectedData}
                  selectedHistories={selectedHistories}
                  setSelectedHistories={setSelectedHistories}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="others">
                <Others
                  selectedData={selectedData}
                  selectedHistories={selectedHistories}
                  setSelectedHistories={setSelectedHistories}
                />
              </Tab.Pane>
            </Tab.Content>

            {selectedHistoryTab === 'medical' && (
              <>
                <hr className="selected-hr" />
                <div className="selected-item-title">
                  Selected Medical History
                </div>
                <div className="selected-item-area">
                  {selectedMedicalHistories()}
                </div>
              </>
            )}
            <MedicalHistoryGroupModal
              isGroupModal={isGroupModal}
              medicalHistoryIds={medical?.map((item) => item.id)}
              setIsGroupModal={setIsGroupModal}
              mergeGroup={mergeGroup}
            />
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(HistoryModal);
