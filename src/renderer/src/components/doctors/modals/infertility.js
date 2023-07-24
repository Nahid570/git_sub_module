import React, { useState, useEffect, memo } from 'react';
import { Modal, Row, Col, Tab, Form } from 'react-bootstrap';
import {
  getRequest,
  postRequest,
  deleteRequest,
} from '../../../utils/axiosRequests';
import { useGetRequest } from '../../../hooks/useGetRequest';
import InfertilityGroupForm from './infertilityGroupForm';
import ItemWithDeleteIcon from '../partials/itemWithDeleteIcon';
import GroupWithDeleteIcon from '../partials/groupWithDeleteIcon';
import LoadMore from '../partials/loadMore';
import ModalHeader from '../partials/modalHeader';
import SearchArea from '../partials/searchArea';
import InfertilityTabNav from '../partials/infertilityTabNav';

const InfertilityModal = ({
  selectedInfertilities,
  setSelectedInfertilities,
  selectedInfertilityWomenGroups,
  setSelectedInfertilityWomenGroups,
  selectedInfertilityManGroups,
  setSelectedInfertilityManGroups,
  showInfertility,
  setShowInfertility,
}) => {
  const [infertilitiesForWoman, setInfertilitiesForWoman] = useState([]);
  const [infertilitiesForMan, setInfertilitiesForMan] = useState([]);
  const [infertilitiesInSearch, setInfertilitiesInSearch] = useState([]);
  const [groupsForMan, setGroupsForMan] = useState([]);
  const [groupsForWoman, setGroupsForWoman] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInfertilityGroupModal, setIsInfertilityGroupModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [tabKey, setTabKey] = useState('woman');
  const perPage = 25;
  let selectedManData = selectedInfertilities?.man || [];
  let selectedWomanData = selectedInfertilities?.woman || [];
  const mergeGroup = (data) => {
    groupTabKey() === 'man'
      ? setGroupsForMan([...groupsForMan, data])
      : setGroupsForWoman([...groupsForWoman, data]);
  };

  const {
    isLoading: isAdviceLoading,
    refetch: getInfertilityList,
  } = useGetRequest(
    'getInfertilityList',
    `infertilities?type=${tabKey}&page=${currentPage}&perPage=${perPage}`,
    (data) => {
      if (currentPage > 1) {
        tabKey === 'man'
          ? setInfertilitiesForMan(data.data)
          : setInfertilitiesForWoman(data.data);
      } else {
        tabKey === 'man'
          ? setInfertilitiesForMan(data.data)
          : setInfertilitiesForWoman(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  useEffect(() => {
    if (tabKey === 'man' || tabKey === 'woman') {
      getInfertilityList();
    }
  }, [currentPage, tabKey]);

  const groupTabKey = () => {
    return tabKey === 'group-for-woman' ? 'woman' : 'man';
  };

  useEffect(() => {
    if (tabKey === 'group-for-woman' || tabKey === 'group-for-man') {
      getRequest(`infertilities/groups?type=${groupTabKey()}`)
        .then((data) => {
          if (groupTabKey() === 'man') {
            setGroupsForMan(data);
          } else {
            setGroupsForWoman(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tabKey]);

  const selectInfertility = (item) => {
    if (tabKey === 'man') {
      if (selectedManData?.some((data) => data.id === item.id)) {
        selectedManData = selectedManData?.filter(
          (data) => data.id !== item.id,
        );
      } else {
        selectedManData = [
          ...selectedManData,
          {
            id: item.id,
            name: item.name,
            instruction: '',
            result: '',
          },
        ];
      }
      selectedInfertilities.man = selectedManData;
      setSelectedInfertilities({ ...selectedInfertilities });
    } else {
      if (selectedWomanData?.some((data) => data.id === item.id)) {
        selectedWomanData = selectedWomanData?.filter(
          (data) => data.id !== item.id,
        );
      } else {
        selectedWomanData = [
          ...selectedWomanData,
          {
            id: item.id,
            name: item.name,
            instruction: '',
            result: '',
          },
        ];
      }
      selectedInfertilities.woman = selectedWomanData;
      setSelectedInfertilities({ ...selectedInfertilities });
    }
  };

  const deleteAdviceGroup = (groupId) => {
    deleteRequest(`infertilities/groups/${groupId}`)
      .then((data) => {
        if (groupTabKey() === 'man') {
          setGroupsForMan(groupsForMan.filter((group) => group.id !== groupId));
        } else {
          setGroupsForWoman(
            groupsForWoman.filter((group) => group.id !== groupId),
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectGroup = (group) => {
    if (tabKey === 'man' || groupTabKey() === 'man') {
      let isExist = selectedInfertilityManGroups.some(
        (selectedGroup) => selectedGroup.id === group.id,
      );
      if (!isExist) {
        setSelectedInfertilityManGroups([
          ...selectedInfertilityManGroups,
          group,
        ]);
        group.infertilities.map((item) => {
          if (!selectedManData?.some((data) => data.id === item.id)) {
            selectedManData = [
              ...selectedManData,
              {
                id: item.id,
                name: item.name,
                instruction: '',
                result: '',
              },
            ];
          }
        });
        selectedInfertilities.man = selectedManData;
        setSelectedInfertilities({ ...selectedInfertilities });
      } else {
        const ids = group.infertilities.map((item) => item.id);
        selectedInfertilities.man = selectedManData?.filter(
          (item) => !ids.includes(item.id),
        );
        setSelectedInfertilities({ ...selectedInfertilities });
        setSelectedInfertilityManGroups(
          selectedInfertilityManGroups.filter(
            (selectedGroup) => selectedGroup.id !== group.id,
          ),
        );
      }
    } else {
      let isExist = selectedInfertilityWomenGroups.some(
        (grp) => grp.id === group.id,
      );
      if (!isExist) {
        setSelectedInfertilityWomenGroups([
          ...selectedInfertilityWomenGroups,
          group,
        ]);
        group.infertilities.map((item) => {
          if (!selectedWomanData?.some((data) => data.id === item.id)) {
            selectedWomanData = [
              ...selectedWomanData,
              {
                id: item.id,
                name: item.name,
                instruction: '',
                result: '',
              },
            ];
          }
        });
        selectedInfertilities.woman = selectedWomanData;
        setSelectedInfertilities({ ...selectedInfertilities });
      } else {
        const ids = group.infertilities.map((item) => item.id);
        selectedInfertilities.woman = selectedWomanData?.filter(
          (item) => !ids.includes(item.id),
        );
        setSelectedInfertilities({ ...selectedInfertilities });
        setSelectedInfertilityWomenGroups(
          selectedInfertilityWomenGroups.filter(
            (selectedGroup) => selectedGroup.id !== group.id,
          ),
        );
      }
    }
  };
  const removeItem = (itemId) => {
    selectedInfertilities[tabKey] = selectedInfertilities[tabKey]?.filter(
      (selectedItem) => selectedItem.id !== itemId,
    );
    setSelectedInfertilities({ ...selectedInfertilities });
  };

  const handleExtraInfo = (key, fieldName, val) => {
    selectedInfertilities[tabKey][key][fieldName] = val;
    setSelectedInfertilities({ ...selectedInfertilities });
  };

  const infertilityList = () => {
    let allData = infertilitiesForWoman;
    let selectedData = selectedWomanData;
    if (tabKey === 'man') {
      allData = infertilitiesForMan;
      selectedData = selectedManData;
    }
    return allData.map((item, index) => {
      const isSelected = selectedData?.some((data) => data.id === item.id);
      return (
        <ItemWithDeleteIcon
          key={index}
          item={item}
          isSelected={isSelected}
          itemClickAction={selectInfertility}
          itemType={`advice`}
        />
      );
    });
  };

  const groupList = (allGroup) => {
    //let allGroup = groupsForWoman;
    let selectedData = selectedWomanData;
    if (tabKey === 'group-for-man') {
      //allData = groupsForWoman;
      selectedData = selectedManData;
    }
    return allGroup.map((group, index) => {
      let groupData =
        groupTabKey() === 'man'
          ? selectedInfertilityManGroups
          : selectedInfertilityWomenGroups;
      let isSelected = groupData.some((data) => data.id === group.id);

      return (
        <GroupWithDeleteIcon
          key={index}
          item={group}
          isSelected={isSelected}
          itemClickAction={selectGroup}
          removeClickAction={deleteAdviceGroup}
        />
      );
    });
  };

  const handleSearchOrNew = (selectedData) => {
    if (
      !selectedInfertilityManGroups?.some(
        (data) => data.id === selectedData.id,
      ) &&
      selectedData.id !== 'notFound'
    ) {
      let newData = {
        id: selectedData.id,
        name: selectedData.name,
        type: selectedData.type,
        instruction: '',
        result: '',
      };
      if (tabKey === 'woman') {
        selectedInfertilities[tabKey] = [...selectedWomanData, newData];
      } else {
        selectedInfertilities[tabKey] = [...selectedManData, newData];
      }
      setSelectedInfertilities({ ...selectedInfertilities });
    } else {
      postRequest('infertilities', { name: selectedData.name, type: tabKey })
        .then((data) => {
          let newResult = {
            id: data.id,
            name: data.name,
            type: data.type,
            instruction: '',
            result: '',
          };
          if (tabKey === 'woman') {
            selectedInfertilities[tabKey] = [...selectedWomanData, newResult];
            setInfertilitiesForWoman([...infertilitiesForWoman, data]);
          } else {
            selectedInfertilities[tabKey] = [...selectedManData, newResult];
            setInfertilitiesForMan([...infertilitiesForMan, data]);
          }
          setSelectedInfertilities({ ...selectedInfertilities });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setInfertilitiesInSearch([]);
    setSearchQuery('');
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `infertilities?type=${tabKey}&name=${searchKey}`;
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
          setInfertilitiesInSearch(customizedResults);
        } else {
          setInfertilitiesInSearch([{ id: 'notFound', name: searchKey }]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedItemList = (selectedData) => {
    return selectedData?.map((item, index) => {
      return (
        <Row className="selected-item-row" key={`${tabKey}-${index}`}>
          <Col>{item.name}</Col>
          <Col>
            <Form.Control
              size="sm"
              min={0}
              type="text"
              defaultValue={item.instruction}
              placeholder="Add instruction"
              onChange={(e) =>
                handleExtraInfo(index, 'instruction', e.target.value)
              }
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              type="text"
              defaultValue={item.result}
              placeholder="Add result"
              onChange={(e) => handleExtraInfo(index, 'result', e.target.value)}
            />
          </Col>
          <Col md={1} className="text-right">
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={() => removeItem(item.id)}
            ></i>
          </Col>
        </Row>
      );
    });
  };

  const getInfertilityIds = () => {
    let data = selectedWomanData;
    if (tabKey === 'man' || groupTabKey() === 'man') {
      data = selectedManData;
    }
    return data?.map((item) => item.id);
  };

  return (
    <>
      <Modal
        show={showInfertility}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'Infertility'} action={setShowInfertility} />
        <Modal.Body>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={infertilitiesInSearch}
            placeholder={'infertility'}
          />
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="all-for-woman"
          >
            <InfertilityTabNav
              tabKey={tabKey}
              setTabKey={setTabKey}
              action={setIsInfertilityGroupModal}
              selectedItems={selectedInfertilities[tabKey]}
            />
            <Tab.Content>
              <Tab.Pane eventKey="all-for-woman" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">
                  {infertilityList()}
                </Row>
                <LoadMore
                  currentPage={currentPage}
                  totalItem={totalItem}
                  perPage={perPage}
                  currentPageAction={setCurrentPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="group-for-woman" className="add-scroll">
                <Row className="complains-area mr-0 ml-0  mt-1">
                  {groupList(groupsForWoman)}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="all-for-man" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">
                  {infertilityList()}
                </Row>
                <LoadMore
                  currentPage={currentPage}
                  totalItem={totalItem}
                  perPage={perPage}
                  currentPageAction={setCurrentPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="group-for-man" className="add-scroll">
                <Row className="complains-area mr-0 ml-0  mt-1">
                  {groupList(groupsForMan)}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          <InfertilityGroupForm
            infertilityIds={getInfertilityIds()}
            mergeGroup={mergeGroup}
            isInfertilityGroupModal={isInfertilityGroupModal}
            setIsInfertilityGroupModal={setIsInfertilityGroupModal}
            type={tabKey}
          />
          <hr className="selected-hr" />
          <div className="selected-item-title">
            {tabKey === 'man' || tabKey === 'group-for-man'
              ? 'Selected infertility for man'
              : 'Selected infertility for woman'}
          </div>
          {(tabKey === 'woman' || tabKey === 'group-for-woman') && (
            <div className="selected-item-area">
              {selectedItemList(selectedWomanData)}
            </div>
          )}
          {(tabKey === 'man' || tabKey === 'group-for-man') && (
            <div className="selected-item-area">
              {selectedItemList(selectedManData)}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(InfertilityModal);
