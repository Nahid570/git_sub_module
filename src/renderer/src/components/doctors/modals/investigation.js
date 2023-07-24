import React, { useState, useEffect, memo } from 'react';
import { Modal, Row, Col, Form, Tab } from 'react-bootstrap';
import InvestigationGroupForm from './investigationGroupForm';
import {
  getRequest,
  postRequest,
  deleteRequest,
} from '../../../utils/axiosRequests';
import { useGetRequest } from '../../../hooks/useGetRequest';
import ItemWithDeleteIcon from '../partials/itemWithDeleteIcon';
import GroupWithDeleteIcon from '../partials/groupWithDeleteIcon';
import LoadMore from '../partials/loadMore';
import ModalHeader from '../partials/modalHeader';
import SearchArea from '../partials/searchArea';
import TabNav from '../partials/tabNav';

const InvestigationModal = ({
  selectedInvestigations,
  setSelectedInvestigations,
  selectedInvestigationGroups,
  setSelectedInvestigationGroups,
  showInvestigation,
  setShowInvestigation,
}) => {
  const [investigations, setInvestigations] = useState([]);
  const [investigationsInSearch, setInvestigationsInSearch] = useState([]);
  const [investigationGroups, setInvestigationGroups] = useState([]);
  const [isInvestigationGroupModal, setIsInvestigationGroupModal] = useState(
    false,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const perPage = 25;

  const closeShowInvestigationGroupModal = () => {
    setIsInvestigationGroupModal(false);
  };
  const mergeInvestigationGroup = (data) => {
    let newInvestigation = [];
    data.investigationIds.map((itemId) => {
      let investigationItem = investigations.filter((inv) => inv.id === itemId);
      if (investigationItem.length) {
        newInvestigation = [...newInvestigation, ...investigationItem];
      }
    });
    let newGroup = {
      id: data.id,
      name: data.name,
      doctorId: data.doctorId,
      Investigations: newInvestigation,
    };
    setInvestigationGroups([...investigationGroups, newGroup]);
  };
  const mergeInvestigation = (data) => {
    setInvestigations([...investigations, data]);
  };

  const {
    isLoading: isAdviceLoading,
    refetch: getInvestigations,
  } = useGetRequest(
    'getInvestigation',
    `investigations?page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        setInvestigations([...investigations, ...data.data]);
      } else {
        setInvestigations(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  useEffect(() => {
    getInvestigations();
  }, [currentPage]);

  useEffect(() => {
    getRequest('investigations/groups')
      .then((data) => {
        setInvestigationGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setInvestigationGroups]);

  const selectInvestigation = (item) => {
    if (
      selectedInvestigations.some(
        (selectedInvestigation) => selectedInvestigation.name === item.name,
      )
    ) {
      setSelectedInvestigations(
        selectedInvestigations.filter(
          (investigation) => investigation.name !== item.name,
        ),
      );
    } else {
      setSelectedInvestigations([
        ...selectedInvestigations,
        { id: item.id, name: item.name, instruction: '', result: '' },
      ]);
    }
  };

  const deleteInvestigation = (investigationId) => {
    deleteRequest(`investigations/${investigationId}`)
      .then((data) => {
        setInvestigations(
          investigations.filter(
            (investigation) => investigation.id !== investigationId,
          ),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteInvestigationGroup = (groupId) => {
    deleteRequest(`investigations/groups/${groupId}`)
      .then((data) => {
        setInvestigationGroups(
          investigationGroups.filter((group) => group.id !== groupId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectInvestigationGroup = (group) => {
    let isExist = selectedInvestigationGroups.some(
      (selectedGroup) => selectedGroup.id === group.id,
    );
    if (!isExist) {
      setSelectedInvestigationGroups([...selectedInvestigationGroups, group]);
      let result = [];
      group.Investigations.map((item) => {
        if (
          !selectedInvestigations.some(
            (investigation) => investigation.name === item.name,
          )
        ) {
          result.push({
            id: item?.id,
            name: item.name,
            duration: '',
            unit: 'Day(s)',
            note: '',
          });
        }
      });
      setSelectedInvestigations([...selectedInvestigations, ...result]);
    } else {
      let deletedItems = group?.Investigations.map((item) => item.name);
      const otherGroups = selectedInvestigationGroups?.filter(
        (data) => data.name !== group.name,
      );
      setSelectedInvestigationGroups(otherGroups);
      if (otherGroups.length) {
        const otherGroupItems = otherGroups.flatMap((obj) =>
          obj?.Investigations?.map((item) => item.name),
        );
        deletedItems = deletedItems.filter(
          (item) => !otherGroupItems.includes(item),
        );
      }
      setSelectedInvestigations(
        selectedInvestigations.filter(
          (item) => !deletedItems.includes(item.name),
        ),
      );
    }
  };

  const removeInvestigation = (item) => {
    setSelectedInvestigations(
      selectedInvestigations.filter(
        (selectedItem) => selectedItem.name !== item.name,
      ),
    );
  };

  const removeInvestigationGroup = (group) => {
    setSelectedInvestigationGroups(
      selectedInvestigationGroups.filter(
        (selectedGroup) => selectedGroup.name !== group.name,
      ),
    );
    setSelectedInvestigations(
      selectedInvestigations.filter(
        (i) => !group.investigations.find((f) => f.name === i.name),
      ),
    );
  };

  const handleInvestigationExtras = (item, fieldName, e) => {
    const objIndex = selectedInvestigations.findIndex(
      (investigation) => investigation.name == item.name,
    );
    selectedInvestigations[objIndex][fieldName] = e.target.value;
    setSelectedInvestigations([...selectedInvestigations]);
  };

  const selectedInvestigationList = selectedInvestigations.map(
    (item, index) => {
      return (
        <Row className="selected-item-row" key={index}>
          <Col>{item.name}</Col>
          <Col>
            <Form.Control
              size="sm"
              min={0}
              type="text"
              defaultValue={item.instruction}
              placeholder="Add instruction"
              onChange={(e) =>
                handleInvestigationExtras(item, 'instruction', e)
              }
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              type="text"
              defaultValue={item.result}
              placeholder="Add result"
              onChange={(e) => handleInvestigationExtras(item, 'result', e)}
            />
          </Col>
          <Col md={1} className="text-right">
            <i
              className="fa fa-times-circle pt-1"
              aria-hidden="true"
              onClick={() => removeInvestigation(item)}
            ></i>
          </Col>
        </Row>
      );
    },
  );

  let allInvestigations = investigations.map((item, index) => {
    let isSelected = selectedInvestigations.some(
      (data) => data.name === item.name,
    );
    isSelected = isSelected ? true : false;

    return (
      <ItemWithDeleteIcon
        key={index}
        item={item}
        isSelected={isSelected}
        itemClickAction={selectInvestigation}
        removeClickAction={deleteInvestigation}
      />
    );
  });

  const allInvestigationGroup = investigationGroups.map((group, index) => {
    let isSelected = selectedInvestigationGroups.some(
      (data) => data.id === group.id,
    );

    return (
      <GroupWithDeleteIcon
        key={index}
        item={group}
        isSelected={isSelected}
        itemClickAction={selectInvestigationGroup}
        removeClickAction={deleteInvestigationGroup}
      />
    );
  });

  const handleSearchOrNew = (selectedOption) => {
    let selectedData = selectedOption?.name;
    if (
      !selectedInvestigations.some(
        (investigate) => investigate.name === selectedData,
      ) &&
      selectedOption.id !== 'notFound'
    ) {
      setSelectedInvestigations([
        ...selectedInvestigations,
        {
          id: selectedOption?.id,
          name: selectedData,
          instruction: '',
          result: '',
        },
      ]);
    } else {
      postRequest('investigations', { name: selectedData })
        .then((data) => {
          setInvestigations([...investigations, data]);
          setSelectedInvestigations([
            ...selectedInvestigations,
            { id: data?.id, name: selectedData, instruction: '', result: '' },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setInvestigationsInSearch([]);
    setSearchQuery('');
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `investigations?name=${searchKey}`;
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
          setInvestigationsInSearch(customizedResults);
        } else {
          setInvestigationsInSearch([{ id: 'notFound', name: searchKey }]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        show={showInvestigation}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'Investigation'} action={setShowInvestigation} />
        <Modal.Body>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={investigationsInSearch}
            placeholder={'investigation'}
          />
          <Tab.Container id="left-tabs-example" defaultActiveKey="all">
            <TabNav
              action={setIsInvestigationGroupModal}
              selectedItems={selectedInvestigations}
            />
            <Tab.Content>
              <Tab.Pane eventKey="all" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">
                  {allInvestigations}
                </Row>
                <LoadMore
                  currentPage={currentPage}
                  totalItem={totalItem}
                  perPage={perPage}
                  currentPageAction={setCurrentPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="group" className="add-scroll">
                <Row className="complains-area mr-0 ml-0 mt-1">
                  {allInvestigationGroup}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <InvestigationGroupForm
            isInvestigationGroupModal={isInvestigationGroupModal}
            investigationIds={selectedInvestigations.map((item) => item.id)}
            closeGroupModal={closeShowInvestigationGroupModal}
            mergeInvestigationGroup={mergeInvestigationGroup}
          />
          <hr className="selected-hr" />
          <div className="selected-item-title">Selected Investigation</div>
          <div className="selected-item-area">{selectedInvestigationList}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(InvestigationModal);
