import React, { memo } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { usePatchRequest } from '../../../hooks/usePatchRequest';
import { capitalizeFirstLetter } from '../../../utils/helpers';

const ItemSetting = ({
  isItemSettingModal,
  setIsItemSettingModal,
  prescriptionItems,
  setPrescriptionItems,
  prescriptionItemName,
}) => {
  let itemStyle = prescriptionItems[prescriptionItemName]?.itemStyle || {};
  let subItemStyle =
    prescriptionItems[prescriptionItemName]?.subItemStyle || {};
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const fontSizeOptions = [
    '6px',
    '7px',
    '8px',
    '9px',
    '10px',
    '11px',
    '12px',
    '13px',
    '14px',
    '15px',
    '16px',
    '17px',
    '18px',
  ];
  const fontFamilyOptions = [
    'Times New Roman',
    'Calibri',
    'Verdana',
    'Arial',
    'Snell Roundhand Script',
    'Helvetica',
    'Arial Black',
  ];

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
      setIsItemSettingModal(false);
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

  const handleTextTransform = (itemName, fieldName, val) => {
    const style = itemName === 'itemStyle' ? itemStyle : subItemStyle;
    const data = {
      ...style,
      capitalize: false,
      uppercase: false,
      lowercase: false,
      [fieldName]: val,
    };
    const result = {
      ...prescriptionItems[prescriptionItemName],
      [itemName]: data,
    };
    prescriptionItems = {
      ...prescriptionItems,
      [prescriptionItemName]: result,
    };
    setPrescriptionItems({ ...prescriptionItems });
  };

  const handleInputSetting = (itemName, fieldName, val) => {
    const style = itemName === 'itemStyle' ? itemStyle : subItemStyle;
    const data = { ...style, [fieldName]: val };
    const result = {
      ...prescriptionItems[prescriptionItemName],
      [itemName]: data,
    };
    prescriptionItems = {
      ...prescriptionItems,
      [prescriptionItemName]: result,
    };
    setPrescriptionItems({ ...prescriptionItems });
  };

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

  return (
    <>
      <Modal show={isItemSettingModal} size="lg">
        <Modal.Header className="common-modal-header">
          <Col className="pl-0">
            <Modal.Title>
              Style Settings For {capitalizeFirstLetter(prescriptionItemName)}
            </Modal.Title>
          </Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              onClick={() => setIsItemSettingModal(false)}
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body className="pb-3">
          <h4>Item Style</h4>
          <hr className="custom-hr" />
          <Row className="mb-2">
            <Col>
              <Form.Check
                inline
                label="Capitalize"
                name="transform"
                type={'radio'}
                checked={!itemStyle?.capitalize === false}
                onChange={(e) =>
                  handleTextTransform(
                    'itemStyle',
                    'capitalize',
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Uppercase"
                name="transform"
                type={'radio'}
                checked={!itemStyle?.uppercase === false}
                onChange={(e) =>
                  handleTextTransform(
                    'itemStyle',
                    'uppercase',
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Lowercase"
                name="transform"
                type={'radio'}
                checked={!itemStyle?.lowercase === false}
                onChange={(e) =>
                  handleTextTransform(
                    'itemStyle',
                    'lowercase',
                    e.target.checked,
                  )
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                inline
                label="Bold"
                name="fontStyle"
                type={'checkbox'}
                checked={!itemStyle?.bold === false}
                onChange={(e) =>
                  handleInputSetting('itemStyle', 'bold', e.target.checked)
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Italic"
                name="fontSty"
                type={'checkbox'}
                checked={!itemStyle?.italic === false}
                onChange={(e) =>
                  handleInputSetting('itemStyle', 'italic', e.target.checked)
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Underline"
                name="fontSty"
                type={'checkbox'}
                checked={!itemStyle?.underline === false}
                onChange={(e) =>
                  handleInputSetting('itemStyle', 'underline', e.target.checked)
                }
              />
            </Col>
          </Row>
          <hr className="custom-hr" />
          <Row className="align-items-center mb-3">
            <Col md={2}>Font Style: </Col>
            <Col>
              <Form.Select
                className="form-control form-control-sm"
                defaultValue={itemStyle?.fontSize}
                onChange={(e) =>
                  handleInputSetting('itemStyle', 'fontSize', e.target.value)
                }
              >
                {fontSizeOptions?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                size="sm"
                type="color"
                placeholder="color"
                defaultValue={itemStyle?.color}
                onChange={(e) =>
                  handleInputSetting('itemStyle', 'color', e.target.value)
                }
              />
            </Col>
            <Col>
              <Form.Select
                className="form-control form-control-sm"
                defaultValue={itemStyle?.fontFamily}
                onChange={(e) =>
                  handleInputSetting('itemStyle', 'fontFamily', e.target.value)
                }
              >
                {fontFamilyOptions?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <hr className="custom-hr" />
          <h4>Sub Item Style</h4>
          <hr className="custom-hr" />
          <Row className="mb-2">
            <Col>
              <Form.Check
                inline
                label="Capitalize"
                name="text-transform"
                type={'radio'}
                checked={subItemStyle?.capitalize === true}
                onChange={(e) =>
                  handleTextTransform(
                    'subItemStyle',
                    'capitalize',
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Uppercase"
                name="text-transform"
                type={'radio'}
                checked={subItemStyle?.uppercase === true}
                onChange={(e) =>
                  handleTextTransform(
                    'subItemStyle',
                    'uppercase',
                    e.target.checked,
                  )
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Lowercase"
                name="text-transform"
                type={'radio'}
                checked={subItemStyle?.lowercase === true}
                onChange={(e) =>
                  handleTextTransform(
                    'subItemStyle',
                    'lowercase',
                    e.target.checked,
                  )
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                inline
                label="Bold"
                type={'checkbox'}
                checked={!subItemStyle?.bold === false}
                onChange={(e) =>
                  handleInputSetting('subItemStyle', 'bold', e.target.checked)
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Italic"
                type={'checkbox'}
                checked={!subItemStyle?.italic === false}
                onChange={(e) =>
                  handleInputSetting('subItemStyle', 'italic', e.target.checked)
                }
              />
            </Col>
            <Col>
              <Form.Check
                inline
                label="Underline"
                type={'checkbox'}
                checked={!subItemStyle?.underline === false}
                onChange={(e) =>
                  handleInputSetting(
                    'subItemStyle',
                    'underline',
                    e.target.checked,
                  )
                }
              />
            </Col>
          </Row>
          <hr className="custom-hr" />
          <Row className="align-items-center mb-3">
            <Col md={2}>Font Style: </Col>
            <Col>
              <Form.Select
                className="form-control form-control-sm"
                defaultValue={subItemStyle?.fontSize}
                onChange={(e) =>
                  handleInputSetting('subItemStyle', 'fontSize', e.target.value)
                }
              >
                {fontSizeOptions?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                size="sm"
                type="color"
                placeholder="color"
                defaultValue={subItemStyle?.color}
                onChange={(e) =>
                  handleInputSetting('subItemStyle', 'color', e.target.value)
                }
              />
            </Col>
            <Col>
              <Form.Select
                className="form-control form-control-sm"
                defaultValue={subItemStyle?.fontFamily}
                onChange={(e) =>
                  handleInputSetting(
                    'subItemStyle',
                    'fontFamily',
                    e.target.value,
                  )
                }
              >
                {fontFamilyOptions?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          {prescriptionItemName === 'rx' && (
            <>
              <hr className="custom-hr" />
              <h4>Generic Name &amp; Line Style</h4>
              <hr className="custom-hr" />
              <Row className="align-items-center mb-3">
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Show Generic Name"
                    value={true}
                    checked={
                      prescriptionItems &&
                      prescriptionItems[prescriptionItemName]?.showGeneric
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handleItemChange(e, 'showGeneric', prescriptionItemName)
                    }
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Enable Line Draw"
                    value={true}
                    checked={
                      prescriptionItems &&
                      prescriptionItems[prescriptionItemName]?.lineDraw
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handleItemChange(e, 'lineDraw', prescriptionItemName)
                    }
                  />
                </Col>
              </Row>
              {prescriptionItems[prescriptionItemName]?.lineDraw && (
                <Row>
                  <Col md={2}>
                    <label>Line type: </label>
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      name={`lineType`}
                      value={'dot'}
                      // checked={true}
                      checked={
                        prescriptionItems &&
                        prescriptionItems[prescriptionItemName]?.lineType ===
                          'dot'
                          ? true
                          : false
                      }
                      label="..............."
                      onChange={(e) =>
                        handleItemChange(e, 'lineType', prescriptionItemName)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      name={`lineType`}
                      value={'dash'}
                      label="-------------"
                      checked={
                        prescriptionItems &&
                        prescriptionItems[prescriptionItemName]?.lineType ===
                          'dash'
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        handleItemChange(e, 'lineType', prescriptionItemName)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      name={`lineType`}
                      value={'underscore'}
                      label="________"
                      checked={
                        prescriptionItems &&
                        prescriptionItems[prescriptionItemName]?.lineType ===
                          'underscore'
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        handleItemChange(e, 'lineType', prescriptionItemName)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      type="radio"
                      name={`lineType`}
                      value={'none'}
                      label="None"
                      checked={
                        prescriptionItems &&
                        prescriptionItems[prescriptionItemName]?.lineType ===
                          'none'
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        handleItemChange(e, 'lineType', prescriptionItemName)
                      }
                    />
                  </Col>
                </Row>
              )}
            </>
          )}
          <hr className="custom-hr" />
          <Row>
            <Col className="text-center">
              <Button
                variant="primary"
                size="md"
                onClick={updatePrescriptionItems}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(ItemSetting);
