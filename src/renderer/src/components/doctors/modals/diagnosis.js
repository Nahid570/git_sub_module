import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Row, Col, Form, Tab } from 'react-bootstrap';
import DiagnosisGroupForm from './diagnosisGroupForm';
import {
  getRequest,
  postRequest,
  deleteRequest,
} from '../../../utils/axiosRequests';
import { checkDoctorDept } from '../../../utils/helpers';
import { useValidation } from '../../../hooks/validationHooks/useValiation';
import { useGetRequest } from '../../../hooks/useGetRequest';
import ItemWithDeleteIcon from '../partials/itemWithDeleteIcon';
import GroupWithDeleteIcon from '../partials/groupWithDeleteIcon';
import LoadMore from '../partials/loadMore';
import ModalHeader from '../partials/modalHeader';
import SearchArea from '../partials/searchArea';
import TabNav from '../partials/tabNav';
import Staging from '../partials/staging';

const DiagnosisModal = ({
  selectedDiagnosis,
  setSelectedDiagnosis,
  selectedDiagnosisGroups,
  setSelectedDiagnosisGroups,
  showDiagnosis,
  setShowDiagnosis,
}) => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [diagnosesInSearch, setDiagnosesInSearch] = useState([]);
  const [diagnosisGroups, setDiagnosisGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDiagnosisGroupModal, setIsDiagnosisGroupModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const perPage = 25;
  const validation = useValidation;

  const userInfo = useSelector((state) => state.authReducer.data);
  const specialties = useSelector(
    (state) => state.specialtyReducer.specialties,
  );

  const closeShowGroupModal = () => {
    setIsDiagnosisGroupModal(false);
  };

  const mergeDiagnosisGroup = (data) => {
    let newDiagnosis = [];
    data.diagnosisIds.map((itemId) => {
      let diagnosisItem = diagnoses.filter((comp) => comp.id === itemId);
      if (diagnosisItem.length) {
        newDiagnosis = [...newDiagnosis, ...diagnosisItem];
      }
    });
    let newGroup = {
      id: data.id,
      name: data.name,
      doctorId: data.doctorId,
      diagnoses: newDiagnosis,
    };
    setDiagnosisGroups([...diagnosisGroups, newGroup]);
  };
  const mergeDiagnosis = (data) => {
    setDiagnoses([...diagnoses, data]);
  };

  const {
    isLoading: isDiagnosisLoading,
    refetch: getDiagnosisList,
  } = useGetRequest(
    'getDiagnosis',
    `diagnoses?page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        setDiagnoses([...diagnoses, ...data.data]);
      } else {
        setDiagnoses(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  useEffect(() => {
    getDiagnosisList();
  }, [currentPage]);

  useEffect(() => {
    getRequest('diagnoses/groups')
      .then((data) => {
        setDiagnosisGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDiagnosisGroups]);

  const selectDiagnosis = (item) => {
    if (selectedDiagnosis.some((diagnosis) => diagnosis.id === item.id)) {
      setSelectedDiagnosis(
        selectedDiagnosis.filter((diagnosis) => diagnosis.id !== item.id),
      );
    } else {
      setSelectedDiagnosis([
        ...selectedDiagnosis,
        { id: item.id, name: item.name, query: false, note: '' },
      ]);
    }
  };

  const deleteDiagnosis = (diagnosisId) => {
    deleteRequest(`diagnoses/${diagnosisId}`)
      .then((data) => {
        setDiagnoses(
          diagnoses.filter((diagnosis) => diagnosis.id !== diagnosisId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDiagnosisGroup = (groupId) => {
    deleteRequest(`diagnoses/groups/${groupId}`)
      .then((data) => {
        setDiagnosisGroups(
          diagnosisGroups.filter((group) => group.id !== groupId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectDiagnosisGroup = (group) => {
    let isExist = selectedDiagnosisGroups.some(
      (selectedGroup) => selectedGroup.id === group.id,
    );
    if (!isExist) {
      setSelectedDiagnosisGroups([...selectedDiagnosisGroups, group]);
      let result = [];
      group.diagnoses.map((item) => {
        if (!selectedDiagnosis.some((diagnosis) => diagnosis.id === item.id)) {
          result.push({ id: item.id, name: item.name, query: '', note: '' });
        }
      });
      setSelectedDiagnosis([...selectedDiagnosis, ...result]);
    } else {
      let deletedItems = group?.diagnoses.map((item) => item.name);
      const otherGroups = selectedDiagnosisGroups?.filter(
        (data) => data.name !== group.name,
      );
      setSelectedDiagnosisGroups(otherGroups);
      if (otherGroups.length) {
        const otherGroupItems = otherGroups.flatMap((obj) =>
          obj?.diagnoses?.map((item) => item.name),
        );
        deletedItems = deletedItems.filter(
          (item) => !otherGroupItems.includes(item),
        );
      }
      setSelectedDiagnosis(
        selectedDiagnosis.filter((item) => !deletedItems.includes(item.name)),
      );
    }
  };
  const removeDiagnosis = (item) => {
    setSelectedDiagnosis(
      selectedDiagnosis.filter((selectedItem) => selectedItem.id !== item.id),
    );
  };

  const handleDiagnosesExtra = (item, fieldName, value) => {
    const objIndex = selectedDiagnosis.findIndex(
      (diagnosis) => diagnosis.id == item.id,
    );
    selectedDiagnosis[objIndex][fieldName] = value;
    setSelectedDiagnosis([...selectedDiagnosis]);
  };

  let allDiagnose = diagnoses.map((item, index) => {
    let isSelected = selectedDiagnosis.find((data) => data.name === item.name);
    isSelected = isSelected ? true : false;

    return (
      <ItemWithDeleteIcon
        key={index}
        item={item}
        isSelected={isSelected}
        itemClickAction={selectDiagnosis}
        removeClickAction={deleteDiagnosis}
      />
    );
  });

  let groupWithMinusBtn = diagnosisGroups.map((group, index) => {
    let isSelected = selectedDiagnosisGroups.find(
      (data) => data.id === group.id,
    );
    isSelected = isSelected ? true : false;

    return (
      <GroupWithDeleteIcon
        key={index}
        item={group}
        isSelected={isSelected}
        itemClickAction={selectDiagnosisGroup}
        removeClickAction={deleteDiagnosisGroup}
      />
    );
  });

  const handleSearchOrNew = (selectedOption) => {
    let selectedData = selectedOption;
    if (
      !selectedDiagnosis.some(
        (diagnosis) => diagnosis.id === selectedData.id,
      ) &&
      selectedData.id !== 'notFound'
    ) {
      setSelectedDiagnosis([...selectedDiagnosis, selectedData]);
    } else {
      postRequest('diagnoses', { name: selectedData?.name })
        .then((data) => {
          setDiagnoses([...diagnoses, data]);
          setSelectedDiagnosis([...selectedDiagnosis, data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setDiagnosesInSearch([]);
    setSearchQuery('');
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `diagnoses?name=${searchKey}`;
    setSearchQuery(searchKey);

    searchKey.length &&
      getRequest(url)
        .then((data) => {
          if (data?.data?.length > 0) {
            const customizedResults = data.data.map((item) => {
              return {
                ...item,
                label: item.name,
                value: item.name,
              };
            });
            setDiagnosesInSearch(customizedResults);
          } else {
            setDiagnosesInSearch([{ id: 'notFound', name: searchKey }]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const selectedDiagnosisList = selectedDiagnosis.map((item, index) => {
    return (
      <Row className="selected-item-row" key={index}>
        <Col>{item.name}</Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`query`}
            label={`Query`}
            checked={item.query}
            onChange={(evt) =>
              handleDiagnosesExtra(item, 'query', evt.target.checked)
            }
          />
        </Col>
        <Col>
          <Form.Control
            size="sm"
            type="text"
            defaultValue={item.note}
            placeholder="Enter note"
            onChange={(evt) =>
              handleDiagnosesExtra(item, 'note', evt.target.value)
            }
          />
        </Col>
        <Col md={1} className="text-right">
          <i
            className="fa fa-times-circle cursor-pointer"
            aria-hidden="true"
            onClick={() => removeDiagnosis(item)}
          ></i>
        </Col>
      </Row>
    );
  });

  const isOncologyOrHematolgy = (specialityName) => {
    const result = checkDoctorDept(
      specialityName,
      userInfo?.speciality[0],
      specialties,
    );
    return result ? 'staging' : '';
  };

  return (
    <>
      <Modal
        show={showDiagnosis}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'Diagnosis'} action={setShowDiagnosis} />
        <Modal.Body>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={diagnosesInSearch}
            placeholder={'diagnosis'}
          />
          <Tab.Container id="left-tabs-example" defaultActiveKey="all">
            <TabNav
              action={setIsDiagnosisGroupModal}
              selectedItems={selectedDiagnosis}
              type={
                isOncologyOrHematolgy('oncology') ||
                isOncologyOrHematolgy('hematology')
              }
            />
            <Tab.Content>
              <Tab.Pane eventKey="all" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">{allDiagnose}</Row>
                <LoadMore
                  currentPage={currentPage}
                  totalItem={totalItem}
                  perPage={perPage}
                  currentPageAction={setCurrentPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="group" className="add-scroll">
                <Row className="complains-area mr-0 ml-0 mt-1">
                  {groupWithMinusBtn}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="staging" className="add-scroll">
                <Staging />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <DiagnosisGroupForm
            isDiagnosisGroupModal={isDiagnosisGroupModal}
            diagnosisIds={selectedDiagnosis.map((diagnosis) => diagnosis.id)}
            closeGroupModal={closeShowGroupModal}
            mergeDiagnosisGroup={mergeDiagnosisGroup}
          />
          <hr className="selected-hr" />
          <div className="selected-item-title">Selected Diagnosis</div>
          <div className="selected-item-area">{selectedDiagnosisList}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(DiagnosisModal);
