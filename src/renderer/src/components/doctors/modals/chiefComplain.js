import React, { useState, useEffect, memo } from 'react';
import { Modal, Row, Col, Form, Tab } from 'react-bootstrap';
import ChiefComplainGroupForm from '../modals/chiefComplainGroupForm';
import {
  getRequest,
  postRequest,
  deleteRequest,
} from '../../../utils/axiosRequests';
import { useValidation } from '../../../hooks/validationHooks/useValiation';
import { useGetRequest } from '../../../hooks/useGetRequest';
import ItemWithDeleteIcon from '../partials/itemWithDeleteIcon';
import GroupWithDeleteIcon from '../partials/groupWithDeleteIcon';
import LoadMore from '../partials/loadMore';
import ModalHeader from '../partials/modalHeader';
import SearchArea from '../partials/searchArea';
import TabNav from '../partials/tabNav';

const ChiefComplainModal = ({
  selectedChiefComplains,
  setSelectedChiefComplains,
  selectedComplainGroups,
  setSelectedComplainGroups,
  showChiefComplain,
  setShowChiefComplain,
}) => {
  const [chiefComplains, setChiefComplains] = useState([]);
  const [chiefComplainsInSearch, setChiefComplainsInSearch] = useState([]);
  const [complainGroups, setComplainGroups] = useState([]);
  const [isComplainGroupModal, setIsComplainGroupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const perPage = 25;
  const validation = useValidation;

  const closeShowComplainGroupModal = () => {
    setIsComplainGroupModal(false);
  };

  const mergeComplainGroup = (data) => {
    let newChiefComplain = [];
    data.chiefComplainIds.map((itemId) => {
      let complainItem = chiefComplains.filter((comp) => comp.id === itemId);
      if (complainItem.length) {
        newChiefComplain = [...newChiefComplain, ...complainItem];
      }
    });
    let newGroup = {
      id: data.id,
      name: data.name,
      doctorId: data.doctorId,
      chiefComplains: newChiefComplain,
    };
    setComplainGroups([...complainGroups, newGroup]);
  };
  const mergeChiefComplain = (data) => {
    setChiefComplains([...chiefComplains, data]);
  };

  useEffect(() => {
    getRequest('chief-complains/groups')
      .then((data) => {
        setComplainGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    isLoading: isChipComplainLoading,
    refetch: getChipComplain,
  } = useGetRequest(
    'getChipComplain',
    `chief-complains?page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        setChiefComplains([...chiefComplains, ...data.data]);
      } else {
        setChiefComplains(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  useEffect(() => {
    getChipComplain();
  }, [currentPage]);

  const selectChiefComplain = (item) => {
    if (selectedChiefComplains.some((complain) => complain.id === item.id)) {
      setSelectedChiefComplains(
        selectedChiefComplains.filter((complain) => complain.id !== item.id),
      );
    } else {
      setSelectedChiefComplains([
        ...selectedChiefComplains,
        {
          id: item.id,
          name: item.name,
          duration: '',
          unit: 'day(s)',
          note: '',
        },
      ]);
    }
  };

  const deleteChiefComplain = (complainId) => {
    deleteRequest(`chief-complains/${complainId}`)
      .then((data) => {
        setChiefComplains(
          chiefComplains.filter((complain) => complain.id !== complainId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteChiefComplainGroup = (groupId) => {
    deleteRequest(`chief-complains/groups/${groupId}`)
      .then((data) => {
        setComplainGroups(
          complainGroups.filter((group) => group.id !== groupId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectComplainGroup = (group) => {
    let isExist = selectedComplainGroups.some(
      (selectedGroup) => selectedGroup.id === group.id,
    );
    if (!isExist) {
      setSelectedComplainGroups([...selectedComplainGroups, group]);
      let result = [];
      group.chiefComplains.map((item) => {
        if (
          !selectedChiefComplains.some(
            (complain) => complain.name === item.name,
          )
        ) {
          result.push({
            name: item.name,
            duration: '',
            unit: 'day(s)',
            note: '',
          });
        }
      });
      setSelectedChiefComplains([...selectedChiefComplains, ...result]);
    } else {
      let deletedItems = group?.chiefComplains.map((item) => item.name);
      const otherGroups = selectedComplainGroups?.filter(
        (data) => data.name !== group.name,
      );
      setSelectedComplainGroups(otherGroups);
      if (otherGroups.length) {
        const otherGroupItems = otherGroups.flatMap((obj) =>
          obj?.chiefComplains?.map((item) => item.name),
        );
        deletedItems = deletedItems.filter(
          (item) => !otherGroupItems.includes(item),
        );
      }
      setSelectedChiefComplains(
        selectedChiefComplains.filter(
          (item) => !deletedItems.includes(item.name),
        ),
      );
    }
  };

  const removeChiefComplain = (item) => {
    setSelectedChiefComplains(
      selectedChiefComplains.filter(
        (selectedItem) => selectedItem.name !== item.name,
      ),
    );
  };

  const handleChiefComplainExtras = (item, fieldName, e) => {
    const objIndex = selectedChiefComplains.findIndex(
      (complain) => complain.name == item.name,
    );
    selectedChiefComplains[objIndex][fieldName] = e.target.value;
    setSelectedChiefComplains([...selectedChiefComplains]);
  };

  const selectedComplainList = selectedChiefComplains.map((item, index) => {
    return (
      <Row className="selected-item-row" key={index}>
        <Col md="3">{item.name}</Col>
        <Col md="1">for</Col>
        <Col md="4">
          <Row>
            <Col md="7" className="pr-0">
              <Form.Control
                size="sm"
                defaultValue={item.duration}
                min={0}
                type="number"
                placeholder="Enter duration"
                onChange={(e) => handleChiefComplainExtras(item, 'duration', e)}
              />
            </Col>
            <Col md="5">
              <Form.Select
                className="form-control form-control-sm"
                defaultValue={item.unit}
                onChange={(e) => handleChiefComplainExtras(item, 'unit', e)}
              >
                <option value={'day(s)'}>Day(s)</option>
                <option value={'week(s)'}>Week(s)</option>
                <option value={'month(s)'}>Month(s)</option>
                <option value={'year(s)'}>Year(s)</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col md="4">
          <Row>
            <Col md="10">
              <Form.Control
                size="sm"
                type="text"
                defaultValue={item.note}
                placeholder="Enter note"
                onChange={(e) => handleChiefComplainExtras(item, 'note', e)}
              />
            </Col>
            <Col md="1">
              <i
                className="fa fa-times-circle pt-2 cursor-pointer"
                aria-hidden="true"
                onClick={() => removeChiefComplain(item)}
              ></i>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  });

  let allChiefComplains = chiefComplains?.map((item, index) => {
    let isSelected = selectedChiefComplains.some(
      (data) => data.name === item.name,
    );
    isSelected = isSelected ? true : false;

    return (
      <ItemWithDeleteIcon
        key={index}
        item={item}
        isSelected={isSelected}
        itemClickAction={selectChiefComplain}
        removeClickAction={deleteChiefComplain}
      />
    );
  });

  let groupWithMinusBtn = complainGroups.map((group, index) => {
    let isSelected = selectedComplainGroups.some(
      (data) => data.id === group.id,
    );

    return (
      <GroupWithDeleteIcon
        key={index}
        item={group}
        isSelected={isSelected}
        itemClickAction={selectComplainGroup}
        removeClickAction={deleteChiefComplainGroup}
      />
    );
  });

  const handleSearchOrNew = (selectedOption) => {
    let selectedData = selectedOption;
    if (selectedData.doctorId) {
      if (
        !selectedChiefComplains.some(
          (complain) => complain.name === selectedData.name,
        )
      ) {
        setSelectedChiefComplains([
          ...selectedChiefComplains,
          {
            id: selectedData?.id,
            name: selectedData.name,
            duration: '',
            unit: 'day(s)',
            note: '',
          },
        ]);
      }
    } else {
      postRequest('chief-complains', { name: selectedData.name })
        .then((data) => {
          setChiefComplains([...chiefComplains, data]);
          setSelectedChiefComplains([
            ...selectedChiefComplains,
            {
              id: data?.id,
              name: selectedData.name,
              duration: '',
              unit: 'day(s)',
              note: '',
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setChiefComplainsInSearch([]);
    setSearchQuery('');
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `chief-complains?name=${searchKey}`;
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
          setChiefComplainsInSearch(customizedResults);
        } else {
          setChiefComplainsInSearch([{ id: 'notFound', name: searchKey }]);
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
        show={showChiefComplain}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'Chief Complain'} action={setShowChiefComplain} />
        <Modal.Body>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={chiefComplainsInSearch}
            placeholder={'chief complain'}
          />
          <Tab.Container id="left-tabs-example" defaultActiveKey="all">
            <TabNav
              action={setIsComplainGroupModal}
              selectedItems={selectedChiefComplains}
            />
            <Tab.Content>
              <Tab.Pane eventKey="all" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">
                  {allChiefComplains}
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
                  {groupWithMinusBtn}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <ChiefComplainGroupForm
            isComplainGroupModal={isComplainGroupModal}
            chiefComplainIds={selectedChiefComplains.map((item) => item.id)}
            closeGroupModal={closeShowComplainGroupModal}
            mergeComplainGroup={mergeComplainGroup}
          />

          <hr className="selected-hr" />
          <div className="selected-item-title">Selected Chief Complain</div>
          <div className="selected-item-area">{selectedComplainList}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(ChiefComplainModal);
