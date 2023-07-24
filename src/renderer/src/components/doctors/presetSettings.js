import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { useGetRequest } from '../../hooks/useGetRequest';
import { usePostRequest } from '../../hooks/usePostRequest';
import { usePatchRequest } from '../../hooks/usePatchRequest';
import { useDeleteRequest } from '../../hooks/useDeleteRequest';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { MEDICINE_TYPES } from '../../utils/helpers';

function PresetSettings() {
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const [presetSetting, setPresetSetting] = useState([]);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('');
  const [activeItem, setActiveItem] = useState('chief-complains');
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const [newItem, setNewItem] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [singleInnerItem, setSingleInnerItem] = useState(null);
  const [singleInnerItemForSave, setSingleInnerItemForSave] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pageTitle, setPageTitle] = useState('Chief Complain');
  const userInfo = useSelector((state) => state.authReducer.data);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [medicineType, setMedicineType] = useState('Tablet');

  const handlePresetModalClose = () => setShowEditModal(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleConfirmModalClose = () => setShowConfirmModal(false);

  const medicineTypes = MEDICINE_TYPES.map((type) => ({
    value: type,
    label: type,
  }));

  // const medicineTypes = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  const {
    isLoading: isPresetSettingsLoading,
    refetch: getPresetSetting,
  } = useGetRequest(
    'presetSetting',
    `${activeItem}?organizationId=${activeOrganization.id}&page=${currentPage}&name=${name}`,
    (data) => {
      if (currentPage > 1) {
        setPresetSetting([...presetSetting, ...data.data]);
      } else {
        setPresetSetting(data.data);
        setTotalItem(data.total);
      }
    },
    (e) => {
      console.log(e);
    },
  );

  const {
    isLoading: isSavePresetLoading,
    mutate: updatePresetItem,
  } = usePatchRequest(
    `${activeItem}/${singleInnerItem ? singleInnerItem.id : ''}`,
    singleInnerItemForSave,
    (data) => {
      const itemIndex = presetSetting.indexOf(singleInnerItem);
      const newPreset = [...presetSetting];
      // newPreset[itemIndex] = singleInnerItemForSave;
      newPreset[itemIndex] = data;
      setPresetSetting([...newPreset]);
      setShowEditModal(false);
    },
    (e) => {
      console.log(e);
      setShowEditModal(true);
    },
  );

  const {
    isLoading: isSaveNewPresetLoading,
    mutate: addPresetItem,
  } = usePostRequest(
    `${activeItem}`,
    newItem,
    (data) => {
      // setPresetSetting([...presetSetting, data]);
      setShowAddModal(false);
      setNewItem({});
      getPresetSetting();
    },
    (e) => {
      console.log(e);
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowAddModal(true);
    },
  );

  const {
    isLoading: isPresetDeleteLoading,
    mutate: deletePreset,
  } = useDeleteRequest(
    `${activeItem}/${
      singleInnerItem ? singleInnerItem.id || singleInnerItem._id : ''
    }`,
    (data) => {
      const itemIndex = presetSetting.indexOf(singleInnerItem);
      const newPreset = [...presetSetting];
      newPreset.splice(itemIndex, 1);
      setPresetSetting([...newPreset]);
      setShowConfirmModal(false);
    },
    (e) => {
      console.log(e);
    },
  );

  useEffect(() => {
    setName('');
    setCurrentPage(1);
    getPresetSetting();
  }, [activeItem]);

  useEffect(() => {
    getPresetSetting();
  }, [currentPage]);

  useEffect(() => {
    getPresetSetting();
  }, [filter]);

  const handleItemSelection = (value) => {
    setActiveItem(value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setFilter(name);
  };

  const handleClear = () => {
    setFilter('');
  };

  const handleEditClick = (innerObj) => {
    setSingleInnerItem(innerObj);
    setMedicineType(innerObj.type);
    setShowEditModal(true);
  };

  const handleAddClick = (innerObj) => {
    addPresetItem();
  };

  const handleDeleteClick = (innerObj) => {
    setSingleInnerItem(innerObj);
    setShowConfirmModal(true);
  };

  const handleChangeInnerItem = (type = 'name', value) => {
    const currentItem =
      singleInnerItemForSave?.id === singleInnerItem?.id
        ? singleInnerItemForSave
        : singleInnerItem;
    const newItem = { ...currentItem, [type]: value };
    setSingleInnerItemForSave(newItem);
    // setPresetSetting([...newPreset]);
  };

  const handleAdNewItem = (type = 'name', value) => {
    setNewItem({ ...newItem, [type]: value });
  };

  const getModalTitle = () => {
    if (activeItem === 'chief-complains') {
      return 'Chief Complain';
    } else if (activeItem === 'diagnoses') {
      return 'Diagnosis';
    } else if (activeItem === 'medicines') {
      return 'Medicines';
    } else if (activeItem === 'advice') {
      return 'Advice';
    } else if (activeItem === 'followups') {
      return 'Follow Up';
    } else if (activeItem === 'observations') {
      return 'Observations';
    } else if (activeItem === 'investigations') {
      return 'Investigations';
    } else if (activeItem === 'instructions') {
      return 'Remarks';
    } else if (activeItem === 'physical-therapies') {
      return 'Physical Therapy';
    } else if (activeItem === 'exercises') {
      return 'Exercises';
    } else if (activeItem === 'orthoses') {
      return 'Orthoses';
    } else if (activeItem === 'medical-histories') {
      return 'Medical Histories';
    }
  };

  const getInnterItemName = (item) => {
    if (activeItem === 'medicines') {
      return `${item.brandName} ${
        item.strength ? '(' + item.strength + ')' : ''
      }`;
    } else {
      return item.name;
    }
  };

  const doctorId = userInfo.id;

  return (
    <div fluid>
      <Row>
        <Col md={2} className="presetItemContainer">
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'chief-complains' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('chief-complains')}
          >
            Chief Complains
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'diagnoses' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('diagnoses')}
          >
            Diagnosis
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'medicines' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('medicines')}
          >
            Rx
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'advice' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('advice')}
          >
            Advice
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'followups' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('followups')}
          >
            Follow Up
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'observations' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('observations')}
          >
            Observations
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'investigations' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('investigations')}
          >
            Investigations
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'medical-histories' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('medical-histories')}
          >
            Medical Histories
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'physical-therapies' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('physical-therapies')}
          >
            Physical Therapies
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'exercises' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('exercises')}
          >
            Exercises
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'orthoses' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('orthoses')}
          >
            Orthoses
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'instructions' ? 'presetItemSelected' : ''
            }`}
            onClick={() => handleItemSelection('instructions')}
          >
            Remarks
          </li>
          <li
            className={`cursor-pointer presetItem ${
              activeItem === 'prescriptions/templates'
                ? 'presetItemSelected'
                : ''
            }`}
            onClick={() => handleItemSelection('prescriptions/templates')}
          >
            Prescription Templates
          </li>
        </Col>
        <Col md={10} fluid>
          <div className="col-xl-12 col-lg-12">
            <div className="mb-4 py-3">
              {/* <div className="py-3 d-flex flex-row align-items-center justify-content-between"> */}
              <div className="row">
                <Col md={10}>
                  <h6 className="m-0 font-weight-bold">
                    {getModalTitle()} <br />
                    <small>
                      Showed{' '}
                      {currentPage * perPage < totalItem
                        ? currentPage * perPage
                        : totalItem}{' '}
                      of {totalItem}
                    </small>
                  </h6>
                </Col>
                <Col md={2} className="text-center">
                  {activeItem !== 'prescriptions/templates' && (
                    <Button
                      variant="default"
                      className="btn btn-success btn-sm"
                      onClick={() => setShowAddModal(true)}
                    >
                      <i className="fa fa-plus-circle"></i> Create New
                    </Button>
                  )}
                </Col>
              </div>
              {/* </div> */}
              <div className="card-body py-5" style={{ minHeight: '75vh' }}>
                <Form className="mb-4">
                  <Row>
                    <Col md={9} sm={8}>
                      <Form.Control
                        type="text"
                        className="form-control-sm"
                        placeholder="Search here"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                    <Col md={3} sm={4}>
                      <Button
                        variant="outline-success"
                        type="submit"
                        className="btn-sm"
                        onClick={handleFilter}
                      >
                        <i className="fa fa-filter"></i> Filter
                      </Button>
                      <Button
                        style={{ marginLeft: '10px' }}
                        variant="outline-danger"
                        type="button"
                        className="btn-sm"
                        onClick={(e) => {
                          setName('');
                          handleClear();
                        }}
                      >
                        <i className="fa fa-redo" title="Show More"></i> Clear
                      </Button>
                    </Col>
                  </Row>
                </Form>

                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: '60%' }}>Name</th>
                      <th style={{ width: '20%' }}>Priority</th>
                      <th style={{ width: '20%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {presetSetting &&
                      presetSetting.map((item) => (
                        <tr key={item.id}>
                          <td>{getInnterItemName(item)}</td>
                          <td>{item.priority ? item.priority : 0}</td>
                          <td>
                            <>
                              {activeItem !== 'prescriptions/templates' && (
                                <i
                                  style={{
                                    cursor: 'pointer',
                                    color: 'green',
                                  }}
                                  className="far fa-edit"
                                  onClick={() => handleEditClick(item)}
                                ></i>
                              )}
                              {activeItem !== 'medicines' && (
                                <i
                                  style={{
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                  }}
                                  className="far fa-trash-alt v-error"
                                  onClick={() => handleDeleteClick(item)}
                                ></i>
                              )}

                              {activeItem === 'medicines' &&
                                item.createdBy === doctorId && (
                                  <i
                                    style={{
                                      cursor: 'pointer',
                                      marginLeft: '10px',
                                    }}
                                    className="far fa-trash-alt v-error"
                                    onClick={() => handleDeleteClick(item)}
                                  ></i>
                                )}
                            </>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <div>
                  {presetSetting.length !== totalItem && (
                    <Button
                      className="btn-sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Load More
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal size="lg" show={showEditModal} onHide={handlePresetModalClose}>
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>{getModalTitle()} Edit</Modal.Title>
          </Col>
          <Col md={4}></Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={handlePresetModalClose}
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body>
          {activeItem === 'medicines' &&
            singleInnerItem &&
            singleInnerItem.createdBy === doctorId && (
              <>
                <div className="form-group">
                  <label htmlFor="mobile-number">Brand Name</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={
                      singleInnerItem ? singleInnerItem.brandName : ''
                    }
                    onChange={(e) =>
                      handleChangeInnerItem('brandName', e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile-number">Strength</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={
                      singleInnerItem ? singleInnerItem.strength : ''
                    }
                    onChange={(e) =>
                      handleChangeInnerItem('strength', e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile-number">Generic Name</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={
                      singleInnerItem ? singleInnerItem.genericName : ''
                    }
                    onChange={(e) =>
                      handleChangeInnerItem('genericName', e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile-number">Type</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="Select Type"
                    defaultValue={{ label: 'Tablet', value: 'Tablet' }}
                    value={medicineTypes.filter(
                      (option) => option.label === medicineType,
                    )}
                    // isDisabled={isDisabled}
                    // isLoading={isLoading}
                    isClearable={true}
                    // isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="type"
                    options={medicineTypes}
                    onChange={(e) => {
                      if (e) {
                        setMedicineType(e.value);
                        handleChangeInnerItem('type', e.value);
                      } else {
                        setMedicineType('Tablet');
                        handleChangeInnerItem('type', 'Tablet');
                      }
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile-number">Company</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={
                      singleInnerItem ? singleInnerItem.companyName : ''
                    }
                    onChange={(e) =>
                      handleChangeInnerItem('companyName', e.target.value)
                    }
                  />
                </div>
              </>
            )}

          {activeItem !== 'medicines' && (
            <div className="form-group">
              <label htmlFor="mobile-number">Name</label>
              <input
                className="form-control"
                type="text"
                defaultValue={singleInnerItem ? singleInnerItem.name : ''}
                onChange={(e) => handleChangeInnerItem('name', e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="mobile-number">Priority</label>
            <input
              className="form-control"
              type="text"
              defaultValue={singleInnerItem ? singleInnerItem.priority : ''}
              onChange={(e) =>
                handleChangeInnerItem('priority', e.target.value)
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePresetModalClose}>
            Cancel
          </Button>{' '}
          <Button variant="primary" onClick={updatePresetItem}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>{getModalTitle()} Add</Modal.Title>
          </Col>
          <Col md={4}></Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={handleAddModalClose}
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body>
          {activeItem === 'medicines' && (
            <>
              <div className="form-group">
                <label htmlFor="mobile-number">Brand Name</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={''}
                  placeholder="Enter only brand name please"
                  onChange={(e) => handleAdNewItem('brandName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile-number">Strength</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={''}
                  onChange={(e) => handleAdNewItem('strength', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile-number">Generic Name</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={''}
                  onChange={(e) =>
                    handleAdNewItem('genericName', e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile-number">Type</label>
                <Select
                  className="basic-single"
                  classNamePrefix="Select Type"
                  defaultValue={'Tablet'}
                  // isDisabled={isDisabled}
                  // isLoading={isLoading}
                  isClearable={true}
                  // isRtl={isRtl}
                  isSearchable={isSearchable}
                  name="type"
                  options={medicineTypes}
                  onChange={(e) => {
                    if (e) {
                      handleAdNewItem('type', e.value);
                    } else {
                      handleAdNewItem('type', 'Tablet');
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile-number">Company</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={''}
                  onChange={(e) =>
                    handleAdNewItem('companyName', e.target.value)
                  }
                />
              </div>
            </>
          )}

          {activeItem !== 'medicines' && (
            <div className="form-group">
              <label htmlFor="mobile-number">Name</label>
              <input
                className="form-control"
                type="text"
                defaultValue={''}
                onChange={(e) => handleAdNewItem('name', e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="mobile-number">Priority</label>
            <input
              className="form-control"
              type="text"
              defaultValue={'0'}
              onChange={(e) => handleAdNewItem('priority', e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Cancel
          </Button>{' '}
          <Button variant="primary" onClick={handleAddClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showConfirmModal} onHide={handleConfirmModalClose}>
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>{getModalTitle()} Delete</Modal.Title>
          </Col>
          <Col md={4}></Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={handlePresetModalClose}
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmModalClose}>
            Cancel
          </Button>{' '}
          <Button variant="primary" onClick={deletePreset}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PresetSettings;
