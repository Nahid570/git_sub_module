import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import {
  getRequest,
  postRequest,
  deleteRequest,
} from '../../../utils/axiosRequests';
import { englishToBanglaNumber } from '../../../utils/helpers';
import ItemWithDeleteIcon from '../partials/itemWithDeleteIcon';
import ModalHeader from '../partials/modalHeader';
import SearchArea from '../partials/searchArea';

function FollowUpModal(props) {
  let {
    selectedFollowUps,
    setSelectedFollowUps,
    showFollowUp,
    setShowFollowUp,
  } = props;
  const [followUps, setFollowUps] = useState([]);
  const [followUpsInSearch, setFollowUpsInSearch] = useState([]);
  const [comeAfter, setComeAfter] = useState(0);
  const [timeUnit, setTimeUnit] = useState('দিন');
  const [comeDate, setComeDays] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getRequest('followups')
      .then((data) => {
        setFollowUps(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectFollowUps = (item) => {
    if (selectedFollowUps.some((follow) => follow === item.name)) {
      setSelectedFollowUps(selectedFollowUps.filter((f) => f !== item.name));
    } else {
      setSelectedFollowUps([...selectedFollowUps, item.name]);
    }
  };

  const deleteFollowUp = (followupId) => {
    deleteRequest(`followups/${followupId}`)
      .then((data) => {
        setFollowUps(
          followUps.filter((followup) => followup.id !== followupId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedFollowUpList = selectedFollowUps.map((item, index) => {
    return (
      <Row className="selected-item-row" key={index}>
        <Col>{item}</Col>
        <Col md="1" className="text-right">
          <i
            className="fa fa-times-circle"
            aria-hidden="true"
            onClick={() => removeFollowUp(item)}
          ></i>
        </Col>
      </Row>
    );
  });

  let allFollowUp = followUps?.map((item, index) => {
    let isSelected = selectedFollowUps.some((data) => data === item.name);

    return (
      <ItemWithDeleteIcon
        key={index}
        item={item}
        isSelected={isSelected}
        itemClickAction={selectFollowUps}
        removeClickAction={deleteFollowUp}
      />
    );
  });

  const typeaheadRef = useRef(null);
  const handleSearchOrNew = (selectedOption) => {
    const name = selectedOption.name;
    if (followUps.some((followUp) => followUp.name === name)) {
      if (!selectedFollowUps.some((followUp) => followUp === name)) {
        setSelectedFollowUps([...selectedFollowUps, name]);
      }
    } else {
      postRequest('followups', { name: name })
        .then((data) => {
          setFollowUps([...followUps, data]);
          setSelectedFollowUps([...selectedFollowUps, data.name]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setFollowUpsInSearch([]);
    setSearchQuery('');
  };

  const handleFollowInput = (fieldName, e) => {
    const val = e.target.value;
    if (fieldName === 'comeDate') {
      selectedFollowUps[0] = englishToBanglaNumber(val) + ' তারিখে আসবেন';
      setSelectedFollowUps([...selectedFollowUps]);
    } else if (fieldName === 'comeAfter') {
      selectedFollowUps[0] =
        englishToBanglaNumber(val) + ' ' + timeUnit + ' পর আসবেন';
      setSelectedFollowUps([...selectedFollowUps]);
    } else if (fieldName === 'unit') {
      selectedFollowUps[0] =
        englishToBanglaNumber(comeAfter) + ' ' + val + ' পর আসবেন';
      setSelectedFollowUps([...selectedFollowUps]);
    }
  };

  const removeFollowUp = (item) => {
    setSelectedFollowUps(
      selectedFollowUps.filter((selectedItem) => selectedItem !== item),
    );
  };

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true);
    const url = `followups?name=${searchKey}`;
    setSearchQuery(searchKey);

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
          setFollowUpsInSearch(customizedResults);
        } else {
          setFollowUpsInSearch([{ id: 'notFound', name: searchKey }]);
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
        show={showFollowUp}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader title={'Follow Up'} action={setShowFollowUp} />
        <Modal.Body>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={followUpsInSearch}
            placeholder={'follow up'}
          />
          <hr />
          <Row>
            <Col md={8}>
              <Form.Group as={Row} className="text-left">
                <Col sm="3" className="text-right mt-1">
                  পরবর্তী ভিজিট:
                </Col>
                <Col sm="5">
                  <Form.Control
                    className="form-control form-control-sm"
                    type="number"
                    min={0}
                    defaultValue={0}
                    onChange={(e) => {
                      setComeAfter(e.target.value);
                      handleFollowInput('comeAfter', e);
                    }}
                  />
                </Col>
                <Col sm="3">
                  <Form.Select
                    className="form-control form-control-sm"
                    onChange={(evt) => {
                      setTimeUnit(evt.target.value);
                      handleFollowInput('unit', evt);
                    }}
                  >
                    <option value={'দিন'}>দিন</option>
                    <option value="সপ্তাহ">সপ্তাহ</option>
                    <option value={'মাস'}>মাস</option>
                    <option value={'বছর'}>বছর</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="5">
                  Add Date:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="date"
                    className="form-control form-control-sm"
                    onChange={(evt) => handleFollowInput('comeDate', evt)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <hr className="custom-hr" />
          <div
            className="add-scroll"
            style={{ height: '211px', background: '#F5F5F5' }}
          >
            <Row className="complains-area" style={{ margin: 0 }}>
              {allFollowUp}
            </Row>
          </div>
          <hr className="selected-hr" />
          <div className="selected-item-title">Selected Follow Up</div>
          <div className="selected-item-area">{selectedFollowUpList}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default FollowUpModal;
