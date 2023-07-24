import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Accordion,
  Modal,
} from 'react-bootstrap';
import {
  capitalizeFirstLetter,
  samplePatientItemData,
  arrayIntoSubArray,
} from '../../utils/helpers';
import MultiRanger from './multiRanger';
import Editor from './partials/editor';
import { useGetRequest } from '../../hooks/useGetRequest';
import { usePostRequest } from '../../hooks/usePostRequest';
import { usePatchRequest } from '../../hooks/usePatchRequest';
import { toast } from 'react-toastify';
import VerticalRanger from './verticalRanger';
import PatientSettingForm from './modals/patientSettingForm';
import PrescriptionItem from './modals/prescriptionItem';
import { prescriptionItems as pDataItems } from '../../store/slices/prescriptionSlice';
import ItemSetting from './modals/itemSetting';
import Signature from './partials/signature';

function PrescriptionSetings() {
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const dispatch = useDispatch();
  const [divCount, setDivCount] = useState([0, 50]);
  const [divCountFooter, setDivCountFooter] = useState([0, 50]);
  const [divCountBody, setDivCountBody] = useState([0, 50]);
  const [divProperties, setDivProperties] = useState({
    first: 0,
    second: 50,
    third: 50,
    count: 2,
  });
  const [divPropertiesFooter, setDivPropertiesFooter] = useState({
    first: 0,
    second: 50,
    third: 50,
    count: 2,
  });
  const [divPropertiesBody, setDivPropertiesBody] = useState({
    first: 0,
    second: 50,
    count: 2,
  });
  const [headerDataFirst, setHeaderDataFirst] = useState('');
  const [headerDataSecond, setHeaderDataSecond] = useState('');
  const [headerDataThird, setHeaderDataThird] = useState('');
  const [initiated, setInitiated] = useState(true);

  const [footerDataFirst, setFooterDataFirst] = useState('');
  const [footerDataSecond, setFooterDataSecond] = useState('');
  const [footerDataThird, setFooterDataThird] = useState('');
  const [initiatedFooter, setInitiatedFooter] = useState(true);
  const [leftSliderValue, setLeftSliderValue] = useState(0);
  const [rightSliderValue, setRightSliderValue] = useState(0);
  const [prescriptionItems, setPrescriptionItems] = useState(null);
  const [patientItems, setPatientItems] = useState([]);
  const [prescriptionPrintSetting, setPrescriptionPrintSetting] = useState(
    null,
  );
  const [isPatientSettingModal, setIsPatientSettingModal] = useState(false);
  const [patientItemSetting, setPatientItemSetting] = useState({});
  const [newItemStatus, setNewItemStatus] = useState(false);
  const [rows, setRows] = useState([]);
  const [showDelConfirmModal, setShowDelConfirmModal] = useState(false);
  const [deletePatientItem, setDeletePatientItem] = useState('');
  const [deletePatientItemType, setDeletePatientItemType] = useState('');
  const [verticalLineBorder, setVerticalLineBorder] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [isItemSettingModal, setIsItemSettingModal] = useState(false);
  const [prescriptionItemName, setPrescriptionItemName] = useState('');
  const [
    showPrescriptionItemDetails,
    setShowPrescriptionItemDetails,
  ] = useState('');
  const handleDelConfirmModalClose = () => setShowDelConfirmModal(false);

  const { isLoading, refetch } = useGetRequest(
    'prescriptionHeader',
    'settings/prescription-header?organizationId=' + activeOrganization.id,
    (data) => {
      const widthList = data.contents.map((item) => item.width);
      if (widthList.length === 1) {
        setDivCount([0, 100]);
        setHeaderDataSecond(data.contents[0].content);
      } else if (widthList.length === 2) {
        setDivCount([0, 100 - widthList[1]]);
        setHeaderDataSecond(data.contents[0].content);
        setHeaderDataThird(data.contents[1].content);
      } else if (widthList.length === 3) {
        setDivCount([100 - widthList[0] - widthList[1], 100 - widthList[1]]);
        setHeaderDataFirst(data.contents[0].content);
        setHeaderDataSecond(data.contents[1].content);
        setHeaderDataThird(data.contents[2].content);
      }
    },
    (e) => {
      if (e.message === 'Header not found') {
        setInitiated(false);
      }
    },
  );

  const contents = [];
  if (divProperties.first) {
    contents.push({
      content: headerDataFirst,
      width: divProperties.first,
    });
  }
  if (divProperties.second) {
    contents.push({
      content: headerDataSecond,
      width: divProperties.second,
    });
  }
  if (divProperties.third) {
    contents.push({
      content: headerDataThird,
      width: divProperties.third,
    });
  }

  const {
    isLoading: isLoadingSaveHeader,
    mutate: submitHeader,
  } = usePostRequest(
    'settings/prescription-header',
    {
      organizationId: activeOrganization.id,
      contents: contents,
    },
    (res) => {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const {
    isLoading: isLoadingUpdateHeader,
    mutate: updateHeader,
  } = usePatchRequest(
    'settings/prescription-header',
    {
      organizationId: activeOrganization.id,
      contents: contents,
    },
    (res) => {
      toast.success('Prescription Header saved successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const getHeaderButtonTitle = () => {
    if (isLoadingSaveHeader || isLoadingUpdateHeader) return 'Please wait...';
    else return 'Save Header';
  };

  const getBodyButtonTitle = () => {
    if (isPrintSettingsLoading || isLoadingPrescriptionItemsUpdate)
      return 'Please wait...';
    else return 'Save Body';
  };

  const { isLoading: isFooterLoading, refetch: footerRefetch } = useGetRequest(
    'prescriptionFooter',
    'settings/prescription-footer?organizationId=' + activeOrganization.id,
    (data) => {
      const widthList = data.contents.map((item) => item.width);
      if (widthList.length === 1) {
        setDivCountFooter([0, 100]);
        setFooterDataSecond(data.contents[0].content);
      } else if (widthList.length === 2) {
        setDivCountFooter([0, 100 - widthList[1]]);
        setFooterDataSecond(data.contents[0].content);
        setFooterDataThird(data.contents[1].content);
      } else if (widthList.length === 3) {
        setDivCountFooter([
          100 - widthList[0] - widthList[1],
          100 - widthList[1],
        ]);
        setFooterDataFirst(data.contents[0].content);
        setFooterDataSecond(data.contents[1].content);
        setFooterDataThird(data.contents[2].content);
      }
    },
    (e) => {
      if (e.message === 'Footer not found') {
        setInitiatedFooter(false);
      }
    },
  );

  const contentsFooter = [];
  if (divPropertiesFooter.first) {
    contentsFooter.push({
      content: footerDataFirst,
      width: divPropertiesFooter.first,
    });
  }
  if (divPropertiesFooter.second) {
    contentsFooter.push({
      content: footerDataSecond,
      width: divPropertiesFooter.second,
    });
  }
  if (divPropertiesFooter.third) {
    contentsFooter.push({
      content: footerDataThird,
      width: divPropertiesFooter.third,
    });
  }

  const {
    isLoading: isLoadingSaveFooter,
    mutate: submitFooter,
  } = usePostRequest(
    'settings/prescription-footer',
    {
      organizationId: activeOrganization.id,
      contents: contentsFooter,
    },
    (res) => {
      toast.success('Prescription Footer saved successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const {
    isLoading: isLoadingUpdateFooter,
    mutate: updateFooter,
  } = usePatchRequest(
    'settings/prescription-footer',
    {
      organizationId: activeOrganization.id,
      contents: contentsFooter,
    },
    (res) => {
      toast.success('Prescription Footer saved successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const {
    isLoading: isLoadingUpdatePrintSetting,
    mutate: updatePrintSetting,
  } = usePatchRequest(
    'settings/prescription-print-setting',
    {
      organizationId: activeOrganization.id,
      prescriptionBody: {
        leftContent: {
          width: {
            quantity: divPropertiesBody.second ? divPropertiesBody.second : 40,
            unit: '%',
          },
          marginLeft: {
            quantity: 0,
            unit: 'cm',
          },
          marginRight: {
            quantity: 0,
            unit: 'cm',
          },
          marginTop: {
            quantity: leftSliderValue,
            unit: '%',
          },
          marginBottom: {
            quantity: 0,
            unit: 'cm',
          },
          borderLeft: false,
          borderRight: false,
          borderTop: false,
          borderBottom: false,
        },
        rightContent: {
          width: {
            quantity: divPropertiesBody.third ? divPropertiesBody.third : 60,
            unit: '%',
          },
          marginLeft: {
            quantity: 0,
            unit: 'cm',
          },
          marginRight: {
            quantity: 0,
            unit: 'cm',
          },
          marginTop: {
            quantity: rightSliderValue,
            unit: '%',
          },
          marginBottom: {
            quantity: 0,
            unit: 'cm',
          },
          borderLeft: false,
          borderRight: false,
          borderTop: false,
          borderBottom: false,
        },
        verticalLineBorder: verticalLineBorder,
      },
    },
    (res) => {},
    (e) => {},
  );

  const {
    isLoading: isLoadingPrescriptionItemsUpdate,
    mutate: updatePrescriptionItems,
  } = usePatchRequest(
    'settings/prescription-item-setting',
    {
      organizationId: activeOrganization.id,
      items: prescriptionItems,
    },
    (res) => {
      toast.success('Prescription Items saved successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const {
    isLoading: isPrintSettingsLoading,
    refetch: getPrintSetting,
  } = useGetRequest(
    'prescriptionPrintSetting',
    'settings/prescription-print-setting?organizationId=' +
      activeOrganization.id,
    (data) => {
      setPrescriptionPrintSetting(data);
      setVerticalLineBorder(data?.prescriptionBody?.verticalLineBorder);
      const second = data?.prescriptionBody?.leftContent?.width?.quantity;
      const third = data?.prescriptionBody?.rightContent?.width?.quantity;
      setDivCountBody([0, second]);
      setLeftSliderValue(
        data?.prescriptionBody?.leftContent?.marginTop?.quantity,
      );
      setRightSliderValue(
        data?.prescriptionBody?.rightContent?.marginTop?.quantity,
      );
    },
    (e) => {
      console.log(e);
    },
  );

  const {
    isLoading: isLoadingPrescriptionItems,
    refetch: getPrescriptionItems,
  } = useGetRequest(
    'prescriptionItems',
    'settings/prescription-item-setting?organizationId=' +
      activeOrganization.id,
    (data) => {
      setPrescriptionItems(data.items);
      dispatch(pDataItems(data));
    },
    (e) => {
      console.log(e);
    },
  );

  const {
    isLoading: isLoadingPatientItems,
    refetch: getPatientItems,
  } = useGetRequest(
    'patientItems',
    'settings/prescription-patient-item-setting?organizationId=' +
      activeOrganization.id,
    (data) => {
      setPatientItems(data.items);
      let rows = data.items.map((row) => row.rowNumber);
      setRows([...new Set(rows)]);
    },
    (e) => {
      console.log(e);
    },
  );

  const getFooterButtonTitle = () => {
    if (isLoadingSaveHeader || isLoadingUpdateHeader) return 'Please wait...';
    else return 'Save Footer';
  };

  useEffect(() => {
    if (activeOrganization?.id) {
      refetch();
      footerRefetch();
      getPrintSetting();
      getPrescriptionItems();
      getPatientItems();
    }
  }, []);

  const handleHeaderSaveClick = () => {
    initiated ? updateHeader() : submitHeader();
  };

  const handleFooterSaveClick = () => {
    initiatedFooter ? updateFooter() : submitFooter();
  };

  // const handleItemChange = (e, itemProperty, item) => {
  //   let newItem;
  //   if (itemProperty === 'order') {
  //     newItem = {
  //       ...prescriptionItems[item],
  //       [itemProperty]: parseInt(e.target.value),
  //     };
  //   } else {
  //     newItem = {
  //       ...prescriptionItems[item],
  //       [itemProperty]: e.target.value,
  //     };
  //   }

  //   const newPrescriptionItems = {
  //     ...prescriptionItems,
  //     [item]: newItem,
  //   };
  //   setPrescriptionItems(newPrescriptionItems);
  // };

  const handleItemChange = (e, itemProperty, item) => {
    if (itemProperty === 'enabled') {
      const newItem = {
        ...prescriptionItems[item],
        [itemProperty]: e.target.checked,
      };
      const newPrescriptionItems = { ...prescriptionItems, [item]: newItem };
      setPrescriptionItems(newPrescriptionItems);
    } else if (itemProperty === 'lineDraw') {
      const newItem = {
        ...prescriptionItems[item],
        [itemProperty]: e.target.checked,
      };
      const newPrescriptionItems = { ...prescriptionItems, [item]: newItem };
      setPrescriptionItems(newPrescriptionItems);
    } else if (itemProperty === 'showGeneric') {
      const newItem = {
        ...prescriptionItems[item],
        [itemProperty]: e.target.checked,
      };
      const newPrescriptionItems = { ...prescriptionItems, [item]: newItem };
      setPrescriptionItems(newPrescriptionItems);
    } else {
      let newItem;
      if (itemProperty === 'order') {
        newItem = {
          ...prescriptionItems[item],
          [itemProperty]: parseInt(e.target.value),
        };
      } else {
        newItem = {
          ...prescriptionItems[item],
          [itemProperty]: e.target.value,
        };
      }

      const newPrescriptionItems = {
        ...prescriptionItems,
        [item]: newItem,
      };
      setPrescriptionItems(newPrescriptionItems);
    }
  };

  const handleSavePrescriptionItemsAndSettings = () => {
    updatePrintSetting();
    updatePrescriptionItems();
  };

  const printPrescriptionItems = (position) => {
    const items = [];
    for (let itemKey in prescriptionItems) {
      if (
        prescriptionItems[itemKey].position === position &&
        prescriptionItems[itemKey].enabled
      )
        items.push({ ...prescriptionItems[itemKey], name: itemKey });
    }
    items.sort((a, b) => parseInt(a.order) - parseInt(b.order));
    return items.map((item, index) => (
      <p key={index}>
        <span className="prescription-item">
          {item?.alterName ? item?.alterName : item.name + '+ '}
        </span>
      </p>
    ));
  };

  useEffect(() => {
    let [first, second] = divCount;
    let third = 100 - second;
    second = second - first;
    let count = 0;
    if (first > 0) {
      count++;
    }
    if (second) {
      count++;
    }
    if (third) {
      count++;
    }
    setDivProperties({ first, second, third, count });
  }, [divCount]);

  useEffect(() => {
    let [first, second] = divCountFooter;
    let third = 100 - second;
    second = second - first;
    let count = 0;
    if (first > 0) {
      count++;
    }
    if (second) {
      count++;
    }
    if (third) {
      count++;
    }
    setDivPropertiesFooter({ first, second, third, count });
  }, [divCountFooter]);

  useEffect(() => {
    let [first, second] = divCountBody;
    first = 0;
    let third = 100 - second;
    second = second - first;

    let count = 2;
    setDivPropertiesBody({ first: 0, second, third, count });
  }, [divCountBody]);

  useEffect(() => {}, [leftSliderValue, rightSliderValue]);

  const patientSettingModal = (patientItem) => {
    setPatientItemSetting(patientItem);
    setIsPatientSettingModal(true);
  };

  const closePatientSettingModal = () => {
    setIsPatientSettingModal(false);
  };

  const handlePatientItemSetting = (patientItemSetting) => {
    const index = patientItems
      .map((item) => item.name)
      .indexOf(patientItemSetting.name);
    patientItems[index] = patientItemSetting;
    setPatientItems([...patientItems]);
  };

  const addPatientItem = (val, rowNumber) => {
    const index = patientItems.map((item) => item.name).indexOf(val);
    if (index == -1) {
      let newItem = samplePatientItemData();
      newItem.name = val;
      newItem.rowNumber = rowNumber;
      newItem.label.labelName = capitalizeFirstLetter(val);
      setPatientItems([...patientItems, newItem]);
      setNewItemStatus(true);
    } else {
      alert('already added');
    }
  };

  useEffect(() => {
    if (newItemStatus) {
      submitPatientPrintSetting();
    }
  }, [newItemStatus]);

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
      toast.success('Updated successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setNewItemStatus(false);
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const addNewRow = () => {
    setRows([...rows, rows.length + 1]);
  };

  const deleteHandleClick = (value, type) => {
    setDeletePatientItem(value);
    setDeletePatientItemType(type);
    setShowDelConfirmModal(true);
  };

  const {
    isLoading: isPatientDeleteLoading,
    mutate: patientItemDelete,
  } = usePatchRequest(
    `settings/prescription-patient-item-setting`,
    {
      organizationId: activeOrganization.id,
      items:
        deletePatientItemType === 'row'
          ? patientItems.filter((item) => item.rowNumber !== deletePatientItem)
          : patientItems.filter((item) => item.name !== deletePatientItem),
    },
    (data) => {
      if (deletePatientItemType === 'row') {
        setRows([...rows.filter((row) => row !== deletePatientItem)]);
      }
      setPatientItems(data.items);
      setShowDelConfirmModal(false);
      toast.success('Deleted successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const handleItemSetting = (itemName) => {
    setIsItemSettingModal(true);
    setPrescriptionItemName(itemName);
  };

  return (
    <Container fluid>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Header className="profile-setting-menu-item">
            Patient Settings
          </Accordion.Header>
          <Accordion.Body>
            {rows.map((row, index) => (
              <Row className="patient-settings-container">
                <Col md={10} className="item-container">
                  {patientItems
                    .filter((item) => item.rowNumber === row)
                    ?.map((patientItem) => (
                      <div className="single-patient-item">
                        <div>
                          <span style={{ float: 'left' }}>
                            {patientItem.name}
                          </span>
                          <i
                            onClick={() =>
                              deleteHandleClick(patientItem.name, 'item')
                            }
                            className="fa fa-times cursor-pointer ml-3"
                            style={{ float: 'right', marginTop: '3px' }}
                          ></i>
                          <i
                            onClick={() => patientSettingModal(patientItem)}
                            className="fa fa-cog cursor-pointer"
                            style={{
                              float: 'right',
                              marginTop: '3px',
                              fontSize: '15px',
                            }}
                          ></i>
                        </div>
                      </div>
                    ))}
                  {/* {patientItems.filter(item => item.rowNumber === row)?.map((patientItem) => (
                    <div className="single-patient-item">
                      <div>
                        <span style={{ float: "left" }}>
                          {patientItem.name}
                        </span>
                        <i
                          onClick={() => deleteHandleClick(patientItem)}
                          className="fa fa-times cursor-pointer ml-3"
                          style={{ float: "right", marginTop: "3px" }}
                        ></i>
                        <i
                          onClick={() => patientSettingModal(patientItem)}
                          className="fa fa-cog cursor-pointer"
                          style={{ float: "right", marginTop: "3px", fontSize: "15px" }}
                        ></i>
                      </div>
                    </div>
                  ))} */}
                  <br style={{ clear: 'both' }} />
                </Col>
                <Col md={1}>
                  <Form.Select
                    className="form-control"
                    style={{ marginTop: '1rem' }}
                    onChange={(e) => addPatientItem(e.target.value, row)}
                  >
                    <option value="">Select</option>
                    <option value={'patientId'}>Patient Id</option>
                    <option value={'name'}>Name</option>
                    <option value={'gender'}>Gender</option>
                    <option value={'age'}>Age</option>
                    <option value={'height'}>Height</option>
                    <option value={'weight'}>Weight</option>
                    <option value={'phoneNumber'}>Phone no</option>
                    <option value={'date'}>Date</option>
                  </Form.Select>
                </Col>
                <Col>
                  <div
                    className="setting-icon allCenter cursor-pointer"
                    onClick={() => deleteHandleClick(row, 'row')}
                  >
                    <i className="fa fa-times"></i>
                  </div>
                </Col>
              </Row>
            ))}
            <Row className="allCenter mb-3">
              <Col md={11}>
                <div
                  className="setting-icon allCenter cursor-pointer"
                  onClick={() => addNewRow()}
                >
                  <i className="fa fa-plus"></i>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <PatientSettingForm
              isPatientSettingModal={isPatientSettingModal}
              patientItemSetting={patientItemSetting}
              patientItems={patientItems}
              handlePatientItemSetting={handlePatientItemSetting}
              closePatientSettingModal={closePatientSettingModal}
            />
            <Modal
              size="lg"
              show={showDelConfirmModal}
              onHide={handleDelConfirmModalClose}
            >
              <Modal.Header className="common-modal-header">
                <Col>
                  <Modal.Title> Delete</Modal.Title>
                </Col>
                <Col md={4}></Col>
                <Col md={1} style={{ textAlign: 'end' }}>
                  <i
                    className="fa fa-times cursor-pointer"
                    aria-hidden="true"
                    onClick={handleDelConfirmModalClose}
                  ></i>
                </Col>
              </Modal.Header>
              <Modal.Body>Are you sure want to delete?</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleDelConfirmModalClose}
                >
                  Cancel
                </Button>{' '}
                <Button variant="primary" onClick={patientItemDelete}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="profile-setting-menu-item">
            Prescription Header
          </Accordion.Header>
          <Accordion.Body>
            <Row style={{ marginBottom: '10px' }}></Row>
            <Row>
              <Col>
                <div
                  style={{
                    width: '100%',
                    border: '1px solid grey',
                    height: '400px',
                    marginBottom: '30px',
                  }}
                >
                  {divProperties.first > 0 && (
                    <div
                      style={{
                        width: divProperties.first + '%',
                        borderRight: '1px solid lightgrey',
                        height: '100%',
                        overflow: 'hidden',
                        float: 'left',
                      }}
                    >
                      <Editor
                        data={headerDataFirst}
                        setData={setHeaderDataFirst}
                      />
                    </div>
                  )}

                  {divProperties.second > 0 && (
                    <div
                      style={{
                        width: divProperties.second + '%',
                        borderRight: '1px solid lightgrey',
                        height: '100%',
                        overflow: 'hidden',
                        float: 'left',
                      }}
                    >
                      <Editor
                        data={headerDataSecond}
                        setData={setHeaderDataSecond}
                      />
                    </div>
                  )}

                  {divProperties.third > 0 && (
                    <div
                      style={{
                        width: divProperties.third + '%',
                        borderRight: '1px solid lightgrey',
                        height: '100%',
                        overflow: 'hidden',
                        float: 'left',
                      }}
                    >
                      <Editor
                        data={headerDataThird}
                        setData={setHeaderDataThird}
                      />
                    </div>
                  )}
                </div>

                <br style={{ clear: 'both' }} />
                <MultiRanger divCount={divCount} setDivCount={setDivCount} />
                <br />

                <Button
                  style={{ marginBottom: '30px' }}
                  onClick={() => handleHeaderSaveClick()}
                >
                  {getHeaderButtonTitle()}
                </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header className="profile-setting-menu-item">
            Prescription Body
          </Accordion.Header>
          <Accordion.Body>
            <Row className="prescription-item-container">
              <Col>
                {prescriptionItems &&
                  arrayIntoSubArray(Object.keys(prescriptionItems), 2).map(
                    (items, index) => {
                      return (
                        <Row className="prescriptionItem">
                          {items.map((item, key) => {
                            return (
                              <>
                                <Col md={2}>
                                  <span
                                    className="settings-rx-item"
                                    onClick={() =>
                                      handleItemSetting(
                                        item,
                                        prescriptionItems[item],
                                      )
                                    }
                                  >
                                    <i className="fa fa-cog cursor-pointer pr-1"></i>
                                    {item}{' '}
                                  </span>
                                  <Form.Check
                                    type="checkbox"
                                    label="Enable"
                                    style={{
                                      display: 'inline-block',
                                      float: 'right',
                                      paddingRight: '.5rem',
                                    }}
                                    checked={
                                      prescriptionItems &&
                                      prescriptionItems[item].enabled
                                        ? true
                                        : false
                                    }
                                    onChange={(e) =>
                                      handleItemChange(e, 'enabled', item)
                                    }
                                  />
                                  <div style={{ clear: 'both' }}></div>
                                </Col>
                                <Col md={1}>
                                  <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder="Rename"
                                    value={
                                      prescriptionItems &&
                                      prescriptionItems[item].alterName
                                        ? prescriptionItems[item].alterName
                                        : ''
                                    }
                                    onChange={(e) =>
                                      handleItemChange(e, 'alterName', item)
                                    }
                                  />
                                </Col>
                                <Col md={2} className="text-center">
                                  <Form.Check
                                    inline
                                    type="radio"
                                    name={`${item}-position`}
                                    value={'left'}
                                    label="Left"
                                    checked={
                                      prescriptionItems &&
                                      prescriptionItems[item].position ===
                                        'left'
                                        ? true
                                        : false
                                    }
                                    onChange={(e) =>
                                      handleItemChange(e, 'position', item)
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    name={`${item}-position`}
                                    value={'right'}
                                    label="Right"
                                    checked={
                                      prescriptionItems &&
                                      prescriptionItems[item].position ===
                                        'right'
                                        ? true
                                        : false
                                    }
                                    onChange={(e) =>
                                      handleItemChange(e, 'position', item)
                                    }
                                  />
                                </Col>
                                <Col md={1}>
                                  <Form.Control
                                    size="sm"
                                    type="text"
                                    placeholder="Order No"
                                    value={
                                      prescriptionItems &&
                                      prescriptionItems[item].order
                                        ? prescriptionItems[item].order
                                        : ''
                                    }
                                    onChange={(e) =>
                                      handleItemChange(e, 'order', item)
                                    }
                                  />
                                </Col>
                              </>
                            );
                          })}
                        </Row>
                      );
                    },
                  )}
              </Col>
            </Row>
            <Row className="mt-1 mb-3">
              <Col md={11} className="d-flex">
                Vertical Line (Middle):
                <Form.Check
                  className="ml-3"
                  type="checkbox"
                  label="Enable"
                  value={true}
                  checked={verticalLineBorder ? true : false}
                  onChange={(e) => setVerticalLineBorder(e.target.checked)}
                />
              </Col>
              <Col>
                <Button
                  className="btn btn-sm ml-4"
                  onClick={() => setIsNewItem(true)}
                >
                  Add New
                </Button>

                <PrescriptionItem
                  isNewItem={isNewItem}
                  setIsNewItem={setIsNewItem}
                  prescriptionItems={prescriptionItems}
                  setPrescriptionItems={setPrescriptionItems}
                  handleSavePrescriptionItemsAndSettings={
                    handleSavePrescriptionItemsAndSettings
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col md={1} className="text-center">
                <VerticalRanger
                  onChangeVerticalHandler={setLeftSliderValue}
                  value={leftSliderValue}
                />
              </Col>
              <Col md={10}>
                <div
                  style={{
                    width: '100%',
                    border: '1px solid grey',
                    height: '400px',
                    marginBottom: '30px',
                  }}
                >
                  {divPropertiesBody.second > 0 && (
                    <div
                      style={{
                        marginTop: `${(400 * leftSliderValue) / 100}px`,
                        width: divPropertiesBody.second + '%',
                        borderRight: '1px solid lightgrey',
                        borderTop: '1px solid lightgrey',
                        height: `${400 - (400 * leftSliderValue) / 100}px`,
                        overflow: 'hidden',
                        float: 'left',
                        padding: '15px',
                      }}
                    >
                      {printPrescriptionItems('left')}
                    </div>
                  )}

                  {divPropertiesBody.third > 0 && (
                    <div
                      style={{
                        marginTop: `${(400 * rightSliderValue) / 100}px`,
                        width: divPropertiesBody.third + '%',
                        borderRight: '1px solid lightgrey',
                        borderTop: '1px solid lightgrey',
                        height: `${400 - (400 * rightSliderValue) / 100}px`,
                        overflow: 'hidden',
                        float: 'left',
                        padding: '15px',
                      }}
                    >
                      {printPrescriptionItems('right')}
                    </div>
                  )}
                </div>

                <br style={{ clear: 'both' }} />
                <MultiRanger
                  divCount={divCountBody}
                  setDivCount={setDivCountBody}
                />
                <br />

                <Button
                  style={{ marginBottom: '30px' }}
                  onClick={() => handleSavePrescriptionItemsAndSettings()}
                >
                  {getBodyButtonTitle()}
                </Button>
              </Col>
              <Col md={1} className="text-center">
                <VerticalRanger
                  onChangeVerticalHandler={setRightSliderValue}
                  value={rightSliderValue}
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header className="profile-setting-menu-item">
            Prescription Footer
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <div
                  style={{
                    width: '100%',
                    border: '1px solid grey',
                    height: '400px',
                    marginBottom: '30px',
                  }}
                >
                  {divPropertiesFooter.first > 0 && (
                    <div
                      style={{
                        width: divPropertiesFooter.first + '%',
                        borderRight: '1px solid lightgrey',
                        height: '100%',
                        overflow: 'hidden',
                        float: 'left',
                      }}
                    >
                      <Editor
                        data={footerDataFirst}
                        setData={setFooterDataFirst}
                      />
                    </div>
                  )}

                  {divPropertiesFooter.second > 0 && (
                    <div
                      style={{
                        width: divPropertiesFooter.second + '%',
                        borderRight: '1px solid lightgrey',
                        height: '100%',
                        overflow: 'hidden',
                        float: 'left',
                      }}
                    >
                      <Editor
                        data={footerDataSecond}
                        setData={setFooterDataSecond}
                      />
                    </div>
                  )}

                  {divPropertiesFooter.third > 0 && (
                    <div
                      style={{
                        width: divPropertiesFooter.third + '%',
                        borderRight: '1px solid lightgrey',
                        height: '100%',
                        overflow: 'hidden',
                        float: 'left',
                      }}
                    >
                      <Editor
                        data={footerDataThird}
                        setData={setFooterDataThird}
                      />
                    </div>
                  )}
                </div>

                <br style={{ clear: 'both' }} />
                <MultiRanger
                  divCount={divCountFooter}
                  setDivCount={setDivCountFooter}
                />
                <br />

                <Button onClick={() => handleFooterSaveClick()}>
                  {getFooterButtonTitle()}
                </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header className="profile-setting-menu-item">
            Signature
          </Accordion.Header>
          <Accordion.Body>
            <Signature />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {prescriptionItems && prescriptionItemName && (
        <ItemSetting
          isItemSettingModal={isItemSettingModal}
          setIsItemSettingModal={setIsItemSettingModal}
          // prescriptionItemSetting={prescriptionItemSetting}
          prescriptionItems={prescriptionItems}
          setPrescriptionItems={setPrescriptionItems}
          prescriptionItemName={prescriptionItemName}
        />
      )}
    </Container>
  );
}

export default PrescriptionSetings;
