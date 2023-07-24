import React, { useState, useEffect, memo } from 'react';
import { Modal, Row, Col, Tab, Form } from 'react-bootstrap';
import {
  getRequest,
  postRequest,
  deleteRequest,
} from '../../../utils/axiosRequests';
import { useGetRequest } from '../../../hooks/useGetRequest';
import AdviceGroupForm from './adviceGroupForm';
import ItemWithDeleteIcon from '../partials/itemWithDeleteIcon';
import GroupWithDeleteIcon from '../partials/groupWithDeleteIcon';
import LoadMore from '../partials/loadMore';
import ModalHeader from '../partials/modalHeader';
import SearchArea from '../partials/searchArea';
import TabNav from '../partials/tabNav';

const AdviceModal = ({
  selectedAdvices,
  setSelectedAdvices,
  selectedAdvicesGroups,
  setSelectedAdvicesGroups,
  showAdvice,
  setShowAdvice,
}) => {
  const [advices, setAdvices] = useState([]);
  const [advicesInSearch, setAdvicesInSearch] = useState([]);
  const [adviceGroups, setAdviceGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdviceGroupModal, setIsAdviceGroupModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [selectedForSub, setSelectedForSub] = useState('');

  const perPage = 25;

  const closeAdviceGroupModal = () => {
    setIsAdviceGroupModal(false);
  };
  const mergeAdviceGroup = (data) => {
    let newAdvice = [];
    data.adviceIds.map((itemId) => {
      let adviceItem = advices.filter((comp) => comp.id === itemId);
      if (adviceItem.length) {
        newAdvice = [...newAdvice, ...adviceItem];
      }
    });
    let newGroup = {
      id: data.id,
      name: data.name,
      doctorId: data.doctorId,
      advice: newAdvice,
    };
    setAdviceGroups([...adviceGroups, newGroup]);
  };

  const { isLoading: isAdviceLoading, refetch: getAdvices } = useGetRequest(
    'getAdvice',
    `advice?page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        setAdvices([...advices, ...data.data]);
      } else {
        setAdvices(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  useEffect(() => {
    getAdvices();
  }, [currentPage]);

  useEffect(() => {
    getRequest('advice/groups')
      .then((data) => {
        setAdviceGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setAdviceGroups]);

  const selectAdvice = (item) => {
    if (!selectedForSub) {
      if (selectedAdvices.some((advice) => advice.id === item.id)) {
        setSelectedAdvices(
          selectedAdvices.filter((advice) => advice.id !== item.id),
        );
      } else {
        setSelectedAdvices([
          ...selectedAdvices,
          { id: item.id, name: item.name, note: '' },
        ]);
      }
    } else {
      const parentAdvice = selectedAdvices.find(
        (item) => item.id === selectedForSub,
      );
      let subAdvices = parentAdvice?.subAdvices ? parentAdvice?.subAdvices : [];
      if (subAdvices.length) {
        if (subAdvices.some((subAdvice) => subAdvice.id === item.id)) {
          subAdvices = subAdvices.filter(
            (subAdvice) => subAdvice.id !== item.id,
          );
        } else {
          const { priority, ...rest } = item;
          subAdvices.push(rest);
        }
      } else {
        const { priority, ...rest } = item;
        subAdvices.push(rest);
      }
      parentAdvice.subAdvices = subAdvices;
      setSelectedAdvices([...selectedAdvices]);
    }
  };

  const deleteAdvice = (AdviceId) => {
    deleteRequest(`advice/${AdviceId}`)
      .then((data) => {
        setAdvices(advices.filter((advice) => advice.id !== AdviceId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAdviceGroup = (groupId) => {
    deleteRequest(`advice/groups/${groupId}`)
      .then((data) => {
        setAdviceGroups(adviceGroups.filter((group) => group.id !== groupId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectAdviceGroup = (group) => {
    let isExist = selectedAdvicesGroups.some(
      (selectedGroup) => selectedGroup.id === group.id,
    );
    if (!isExist) {
      setSelectedAdvicesGroups([...selectedAdvicesGroups, group]);
      const groupInfos = group.subAdvices ? group.subAdvices : group.advice;
      groupInfos.map((item, index) => {
        if (!selectedAdvices.some((advice) => advice.id === item.id)) {
          const subAdvices = item.subAdvices ? item.subAdvices : [];
          const title = index === 0 && group.title ? group.title : '';
          const newItem = {
            id: item.id,
            name: item.name,
            note: '',
            subAdvices,
          };
          if (title) {
            newItem['title'] = title;
          }
          selectedAdvices = [...selectedAdvices, newItem];
        }
      });
      setSelectedAdvices([...selectedAdvices]);
    } else {
      let deletedItems = group?.advice.map((item) => item.name);
      const otherGroups = selectedAdvicesGroups?.filter(
        (data) => data.name !== group.name,
      );
      setSelectedAdvicesGroups(otherGroups);
      if (otherGroups.length) {
        const otherGroupItems = otherGroups.flatMap((obj) =>
          obj?.advice?.map((item) => item.name),
        );
        deletedItems = deletedItems.filter(
          (item) => !otherGroupItems.includes(item),
        );
      }
      setSelectedAdvices(
        selectedAdvices.filter((item) => !deletedItems.includes(item.name)),
      );
    }
  };

  const removeAdvice = (itemId) => {
    setSelectedAdvices(
      selectedAdvices.filter((selectedItem) => selectedItem.id !== itemId),
    );
  };
  const removeSubAdvice = (item, subItemId) => {
    let subItems = item?.subAdvices;
    subItems = subItems.filter((subItem) => subItem.id !== subItemId);
    item.subAdvices = subItems;
    const advices = selectedAdvices.map((advice) => {
      if (advice.id === item.id) {
        return item;
      } else {
        return advice;
      }
    });
    setSelectedAdvices([...advices]);
  };

  const handleAdviceNote = (key, val) => {
    selectedAdvices[key].note = val;
    setSelectedAdvices(selectedAdvices);
  };

  const handleSelectedForSub = (itemId) => {
    if (itemId === selectedForSub) {
      setSelectedForSub('');
    } else {
      setSelectedForSub(itemId);
    }
  };

  const selectedSubAdviceList = (itemMain) =>
    itemMain?.subAdvices?.map((item, index) => {
      return (
        <Row
          className="selected-item-row"
          key={index}
          style={{ marginLeft: '20px', marginRight: '20px' }}
        >
          <Col>{item.name}</Col>
          <Col>
            <Form.Control
              size="sm"
              type="text"
              defaultValue={item.note}
              placeholder="Enter note"
              onChange={(e) => handleAdviceNote(index, e.target.value)}
            />
          </Col>
          <Col md={1} className="text-right">
            {/* <span
              className="text-left"
              style={{
                width: '70%',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              {' '}
              <i
                className={`fa fa-plus ${
                  selectedForSub === item.id ? 'dark' : 'grey'
                }`}
                aria-hidden="true"
                onClick={() => handleSelectedForSub(item.id)}
              ></i>
            </span> */}

            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={() => removeSubAdvice(itemMain, item.id)}
            ></i>
          </Col>
        </Row>
      );
    });

  const selectedAdviceList = selectedAdvices.map((item, index) => {
    return (
      <>
        {item?.title && <span className="advice-title" key={index}>{item?.title}: </span>}
        <Row className="selected-item-row" key={index}>
          <Col>{item.name}</Col>
          <Col>
            <Form.Control
              size="sm"
              type="text"
              defaultValue={item.note}
              placeholder="Enter note"
              onChange={(e) => handleAdviceNote(index, e.target.value)}
            />
          </Col>
          <Col md={1}>
            <span
              className="text-left"
              style={{
                width: '70%',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              {' '}
              {/* <i
                className={`fa fa-plus ${
                  selectedForSub === item.id ? 'dark' : 'grey'
                }`}
                aria-hidden="true"
                onClick={() => handleSelectedForSub(item.id)}
              ></i> */}
              <i
                className={`fa fa-plus ${
                  selectedForSub === item.id ? 'dark' : 'grey'
                }`}
                aria-hidden="true"
                onClick={() => handleSelectedForSub(item.id)}
              ></i>
            </span>
            <span
              className="text-right"
              style={{ width: '30%', display: 'inline-block' }}
            >
              {' '}
              <i
                className="fa fa-times-circle"
                aria-hidden="true"
                onClick={() => removeAdvice(item.id)}
              ></i>
            </span>
          </Col>
        </Row>
        {selectedSubAdviceList(item)}
      </>
    );
  });

  let allAdvices = advices.map((item, index) => {
    const isSelected = selectedAdvices.some((data) => {
      if (
        data.id === item.id ||
        data?.subAdvices?.some((sub) => sub.id === item.id)
      ) {
        return true;
      } else {
        return false;
      }
    });

    return (
      <ItemWithDeleteIcon
        key={index}
        item={item}
        isSelected={isSelected}
        itemClickAction={selectAdvice}
        removeClickAction={deleteAdvice}
        itemType={`advice`}
      />
    );
  });

  const allAdviceGroup = adviceGroups.map((group, index) => {
    let isSelected = selectedAdvicesGroups.some((data) => data.id === group.id);

    return (
      <GroupWithDeleteIcon
        key={index}
        item={group}
        isSelected={isSelected}
        itemClickAction={selectAdviceGroup}
        removeClickAction={deleteAdviceGroup}
      />
    );
  });

  const handleSearchOrNew = (selectedOption) => {
    let selectedData = selectedOption;
    if (
      !selectedAdvices.some((advice) => advice.id === selectedData.id) &&
      selectedData.id !== 'notFound'
    ) {
      setSelectedAdvices([
        ...selectedAdvices,
        { id: selectedData.id, name: selectedData.name, note: '' },
      ]);
    } else {
      postRequest('advice', { name: selectedData.name })
        .then((data) => {
          setAdvices([...advices, data]);
          setSelectedAdvices([
            ...selectedAdvices,
            { id: data.id, name: data.name, note: '' },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setAdvicesInSearch([]);
    setSearchQuery('');
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `advice?name=${searchKey}`;
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
          setAdvicesInSearch(customizedResults);
        } else {
          setAdvicesInSearch([{ id: 'notFound', name: searchKey }]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateSubAdvices = () => {
    const subs = selectedAdvices?.map((item) => {
      const subAdvs = item?.subAdvices?.map((sub) => ({
        id: sub.id,
        name: sub.name,
      }));
      return { name: item.name, id: item.id, subAdvices: subAdvs };
    });
    return subs;
  };

  return (
    <>
      <Modal
        show={showAdvice}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'Advice'} action={setShowAdvice} />
        <Modal.Body>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={advicesInSearch}
            placeholder={'medicine'}
          />
          <Tab.Container id="left-tabs-example" defaultActiveKey="all">
            <TabNav
              action={setIsAdviceGroupModal}
              selectedItems={selectedAdvices}
            />
            <Tab.Content>
              <Tab.Pane eventKey="all" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">{allAdvices}</Row>
                <LoadMore
                  currentPage={currentPage}
                  totalItem={totalItem}
                  perPage={perPage}
                  currentPageAction={setCurrentPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="group" className="add-scroll">
                <Row className="complains-area mr-0 ml-0  mt-1">
                  {allAdviceGroup}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <AdviceGroupForm
            isAdviceGroupModal={isAdviceGroupModal}
            adviceIds={selectedAdvices.map((item) => item.id)}
            advices={selectedAdvices}
            subAdvices={generateSubAdvices()}
            mergeAdviceGroup={mergeAdviceGroup}
            closeAdviceGroupModal={closeAdviceGroupModal}
          />

          <hr className="selected-hr" />
          <div className="selected-item-title">Selected Advice</div>
          <div className="selected-item-area">{selectedAdviceList}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(AdviceModal);
