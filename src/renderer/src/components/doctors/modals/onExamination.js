import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { getRequest, postRequest } from '../../../utils/axiosRequests';
import { Modal, Row, Col, Tab, Form } from 'react-bootstrap';
import GyneExamination from '../partials/gyneExamination';
import Observation from '../partials/observation';
import GeneralExamination from '../partials/generalExamination';
import OcularExamination from '../partials/ocularExamination';
import DentalExamination from '../partials/dentalExamination';
import SystemicExamination from '../partials/systemicExamination';
import ModalHeader from '../partials/modalHeader';
import SearchArea from '../partials/searchArea';
import OnExaminationTabNav from '../partials/onExaminationTabNav';
import OncologyExamination from '../partials/oncologyExamination';
import BreastExamination from '../partials/breastExamination';

const OnExamination = ({
  patientInfo,
  setPatientInfo,
  showOnExamination,
  setShowOnExamination,
  handleOnExaminations,
  selectedOnExamination,
  selectedOnExaminationTab,
  setSelectedOnExaminationTab,
}) => {
  let {
    observations,
    gyneExamination,
    breastExamination,
    dentalExamination,
  } = selectedOnExamination;
  const [allObservations, setAllObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [observationsInSearch, setObservationsInSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const perPage = 25;
  const specialties = useSelector(
    (state) => state.specialtyReducer.specialties,
  );

  const {
    isLoading: isObservationLoading,
    refetch: getObservations,
  } = useGetRequest(
    'getObservation',
    `observations?page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        setAllObservations([...allObservations, ...data.data]);
      } else {
        setAllObservations(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  useEffect(() => {
    getObservations();
  }, [currentPage]);

  const handleOnExaminationData = (updatedData, type) => {
    switch (type) {
      case 'observation':
        selectedOnExamination.observations = updatedData;
        break;
      case 'gyneExamination':
        selectedOnExamination.gyneExamination = updatedData;
        break;
      case 'breastExamination':
        selectedOnExamination.breastExamination = updatedData;
        break;
      case 'ocularExamination':
        selectedOnExamination.ocularExamination = updatedData;
        break;
      case 'generalExamination':
        selectedOnExamination.generalExaminations = updatedData;
        break;
      case 'dental':
        selectedOnExamination.dentalExamination = updatedData;
        break;
      case 'systemicExamination':
        selectedOnExamination[type] = updatedData;
        break;
      case 'oncologyExamination':
        selectedOnExamination[type] = updatedData;
        break;
    }
    handleOnExaminations({ ...selectedOnExamination });
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `observations?name=${searchKey}`;
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
          setObservationsInSearch(customizedResults);
        } else {
          setObservationsInSearch([{ id: 'notFound', name: searchKey }]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchOrNew = (selectedOption) => {
    let selectedData = selectedOption;
    if (
      allObservations.some(
        (observation) => observation?.name === selectedData?.name,
      )
    ) {
      if (
        !selectedOnExamination.observations.some(
          (item) => item.name === selectedData.name,
        )
      ) {
        selectedOnExamination.observations = [
          ...selectedOnExamination.observations,
          { name: selectedData.name, note: '' },
        ];
        handleOnExaminations({ ...selectedOnExamination });
      }
    } else {
      postRequest('observations', { name: selectedData.name })
        .then((data) => {
          setAllObservations([...allObservations, data]);
          selectedOnExamination.observations = [
            ...selectedOnExamination.observations,
            { name: selectedData.name, note: '' },
          ];
          handleOnExaminations({ ...selectedOnExamination });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setObservationsInSearch([]);
    setSearchQuery('');
  };

  const handleNoteOfObservation = (index, note) => {
    observations[index].note = note;
    handleOnExaminationData(observations, 'observation');
  };

  const removeObservation = (itemName) => {
    observations = observations.filter(
      (selectedItem) => selectedItem.name !== itemName,
    );
    handleOnExaminationData(observations, 'observation');
  };

  const selectedObs = observations?.map((item, index) => {
    return (
      <Row className="selected-item-row" key={index}>
        <Col>{item.name}</Col>
        <Col>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Enter note"
            defaultValue={item.note}
            onChange={(e) => handleNoteOfObservation(index, e.target.value)}
          />
        </Col>
        <Col md="1" className="text-right">
          <i
            className="fa fa-times-circle pt-1"
            aria-hidden="true"
            onClick={() => removeObservation(item.name)}
          ></i>
        </Col>
      </Row>
    );
  });

  return (
    <>
      <Modal
        show={showOnExamination}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'On Examination'} action={setShowOnExamination} />
        <Modal.Body>
          {selectedOnExaminationTab === 'observation' && (
            <SearchArea
              handleOnInputChange={handleOnInputChange}
              handleSearchOrNew={handleSearchOrNew}
              searchQuery={searchQuery}
              options={observationsInSearch}
              placeholder={'observation'}
            />
          )}
          <Tab.Container id="left-tabs-example" defaultActiveKey="observation">
            <OnExaminationTabNav
              tabKey={selectedOnExaminationTab}
              setSelectedOnExaminationTab={setSelectedOnExaminationTab}
              specialties={specialties}
            />
            <Tab.Content>
              <Tab.Pane eventKey="observation" className="add-scroll">
                <Observation
                  allObservations={allObservations}
                  selectedOnExamination={selectedOnExamination}
                  handleOnExaminationData={handleOnExaminationData}
                  currentPage={currentPage}
                  totalItem={totalItem}
                  perPage={perPage}
                  setCurrentPage={setCurrentPage}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="generalExamination"
                style={{ height: '415px' }}
              >
                <GeneralExamination
                  selectedOnExamination={selectedOnExamination}
                  handleOnExaminationData={handleOnExaminationData}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="ocularExamination"
                className="add-scroll ocular-examination pt-2"
                style={{ height: '455px' }}
              >
                <OcularExamination
                  selectedOnExamination={selectedOnExamination}
                  handleOnExaminationData={handleOnExaminationData}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="gyneExamination"
                className="add-scroll pt-2"
                style={{ height: '452px' }}
              >
                <GyneExamination
                  gyneExamination={gyneExamination}
                  handleOnExaminationData={handleOnExaminationData}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="breastExamination"
                className="add-scroll pt-2"
                style={{ height: '453px' }}
              >
                <BreastExamination
                  breastExamination={breastExamination}
                  handleOnExaminationData={handleOnExaminationData}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="dentalExamination">
                <DentalExamination
                  dentalExamination={dentalExamination}
                  handleOnExaminationData={handleOnExaminationData}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="systemicExamination"
                className="systemic-examination"
              >
                <SystemicExamination
                  selectedOnExamination={selectedOnExamination}
                  handleOnExaminationData={handleOnExaminationData}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="oncologyExamination"
                className="oncology-examination"
              >
                <OncologyExamination
                  patientInfo={patientInfo}
                  setPatientInfo={setPatientInfo}
                  selectedOnExamination={selectedOnExamination}
                  handleOnExaminationData={handleOnExaminationData}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          {selectedOnExaminationTab === 'observation' && (
            <>
              <hr className="selected-hr" />
              <div className="selected-item-title">Selected Observation</div>
              <div className="selected-item-area">{selectedObs}</div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(OnExamination);
