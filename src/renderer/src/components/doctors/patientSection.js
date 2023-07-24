import React, { useState, Fragment, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Form, InputGroup, Row } from 'react-bootstrap';
import {
  agePrint,
  sizeConverter,
  patientSizeConverter,
  calculatePatientLabelPadding,
} from '../../utils/helpers';
import { getRequest } from '../../utils/axiosRequests';
import AddPatientInfo from '../../components/doctors/modals/addPatientInfo';
import { flushSync } from 'react-dom';
import moment from 'moment';

const PatientSection = (props) => {
  let {
    patientInfo,
    isPad,
    appointmentInfo,
    prescriptionSetting,
    setPatientInfo,
    selectedOnExamination,
    setSelectedOnExamination,
  } = props;
  let { name, dob, gender, phoneNumber } = patientInfo;
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
  const patientSettings = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.patientSettings,
  );
  const firstRow = patientSettings?.items?.filter(
    (item) => item.rowNumber === 1 && item.isHidden === false,
  );
  const secondRow = patientSettings?.items?.filter(
    (item) => item.rowNumber === 2 && item.isHidden === false,
  );
  const ageProperties = patientSettings?.items?.find(
    (item) => item.name === 'age',
  );
  let { unitProperties } = ageProperties || {};
  let { years, months, days, hours } = unitProperties || {};
  // if (isNaN(dob)) {
  //   dob = ageCount(dob);
  // }
  // const handlePatientInput = (fieldName, val) => {
  //   setPatientInfo({
  //     ...patientInfo,
  //     [fieldName]: fieldName === 'dob' ? (val > 0 ? val : '') : val,
  //   });
  // };
  const handlePatientInput = (fieldName, val) => {
    setPatientInfo({
      ...patientInfo,
      [fieldName]: val,
    });
  };
  const handleAge = (fieldName, val) => {
    setPatientInfo({
      ...patientInfo,
      dob: { ...patientInfo.dob, [fieldName]: val },
    });
  };
  const handleOnInputChange = (searchKey) => {
    flushSync(() => {
      setIsLoading(true);
      const url = `patients?organizationId=${activeOrganization.id}&q=${searchKey}`;
      getRequest(url)
        .then((data) => {
          setPatientList(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const typeaheadRef = useRef(null);
  const handleSelectedPatient = (selectedOption) => {
    const patient = selectedOption[0];
    setPatientInfo({
      ...patientInfo,
      id: patient?.id,
      name: patient?.name,
      dob: patient?.dob,
      phoneNumber: patient?.phoneNumber,
      search: 'yes',
    });
    typeaheadRef.current.clear();
  };
  const filterBy = () => true;

  const actualWidth = prescriptionSetting?.page?.width?.quantity;
  const totalPadding = sizeConverter(
    actualWidth,
    parseFloat(prescriptionSetting?.page?.marginLeft?.quantity) +
      parseFloat(prescriptionSetting?.page?.marginRight?.quantity),
  );
  // const calculateLabelPadding = (
  //   data,
  //   paddingItem,
  //   paddingLeft,
  //   paddingRight,
  //   paddingTop,
  //   paddingBottom,
  // ) => {
  //   let result = {
  //     [paddingLeft]:
  //       patientSizeConverter(
  //         actualWidth,
  //         data[paddingItem]?.properties[paddingLeft]?.quantity,
  //         totalPadding,
  //       ) + data[paddingItem]?.properties[paddingLeft]?.unit,
  //     [paddingRight]:
  //       patientSizeConverter(
  //         actualWidth,
  //         data[paddingItem]?.properties[paddingRight]?.quantity,
  //         totalPadding,
  //       ) + data[paddingItem]?.properties[paddingRight]?.unit,
  //     [paddingTop]:
  //       data[paddingItem]?.properties[paddingTop]?.quantity +
  //       data[paddingItem]?.properties[paddingTop]?.unit,
  //     [paddingBottom]:
  //       data[paddingItem]?.properties[paddingBottom]?.quantity +
  //       data[paddingItem]?.properties[paddingBottom]?.unit,
  //   };
  //   if (paddingItem === 'value') {
  //     let width = data.width;
  //     if (!data?.label?.properties?.isHidden) {
  //       if (data.unit === 'in') {
  //         width = data.width - 0.6;
  //       }
  //     }
  //     result.width =
  //       patientSizeConverter(actualWidth, width, totalPadding) + data.unit;
  //   }
  //   if (
  //     paddingItem === 'label' &&
  //     isPad &&
  //     !data?.label?.properties?.isHidden
  //   ) {
  //     result.width = '0.6in';
  //   }
  //   return result;
  // };

  const patientSettingStyle = {
    marginLeft:
      prescriptionSetting?.patientSetting?.marginLeft?.quantity +
      prescriptionSetting?.patientSetting?.marginLeft?.unit,
    marginRight:
      prescriptionSetting?.patientSetting?.marginRight?.quantity +
      prescriptionSetting?.patientSetting?.marginRight?.unit,
    marginTop:
      prescriptionSetting?.patientSetting?.marginTop?.quantity +
      prescriptionSetting?.patientSetting?.marginTop?.unit,
    marginBottom:
      prescriptionSetting?.patientSetting?.marginBottom?.quantity +
      prescriptionSetting?.patientSetting?.marginBottom?.unit,
    borderLeft: prescriptionSetting?.patientSetting?.borderLeft,
    borderRight: prescriptionSetting?.patientSetting?.borderRight,
    borderTop: prescriptionSetting?.patientSetting?.borderTop,
    borderBottom: prescriptionSetting?.patientSetting?.borderBottom,
  };

  const appointmentDate = (appointmentDateTime) => {
    return appointmentInfo?.appointmentDateTime !== ''
      ? moment(appointmentInfo?.appointmentDateTime).format('DD/MM/YYYY')
      : moment().format('DD/MM/YYYY');
  };

  return (
    <>
      {firstRow?.length > 0 && (
        <Row
          className={`patient-section-print ${
            isPad ? '' : 'no-pad-patient-section'
          }`}
          style={isPad ? patientSettingStyle : {}}
        >
          {firstRow?.map((item, index) => {
            return (
              <Fragment key={index}>
                {isPad ? (
                  item?.label?.properties?.isHidden ? (
                    <div
                      style={calculatePatientLabelPadding(
                        item,
                        'label',
                        'paddingLeft',
                        'paddingRight',
                        'paddingTop',
                        'paddingBottom',
                        actualWidth,
                        totalPadding,
                        isPad,
                      )}
                    ></div>
                  ) : (
                    <div
                      style={calculatePatientLabelPadding(
                        item,
                        'label',
                        'paddingLeft',
                        'paddingRight',
                        'paddingTop',
                        'paddingBottom',
                        actualWidth,
                        totalPadding,
                        isPad,
                      )}
                    >
                      {item?.label?.labelName}:
                    </div>
                  )
                ) : (
                  ''
                )}
                {isPad ? (
                  <div
                    className="p-item-val"
                    style={
                      isPad
                        ? calculatePatientLabelPadding(
                            item,
                            'value',
                            'paddingLeft',
                            'paddingRight',
                            'paddingTop',
                            'paddingBottom',
                            actualWidth,
                            totalPadding,
                            isPad,
                          )
                        : {}
                    }
                  >
                    {item.name === 'age'
                      ? agePrint(dob, item?.unitProperties)
                      : item.name === 'date'
                      ? appointmentDate()
                      : patientInfo[item.name]}
                  </div>
                ) : (
                  <div className="n">
                    {item?.label?.labelName}: &nbsp;{' '}
                    {item.name === 'age'
                      ? agePrint(dob, item?.unitProperties)
                      : item.name === 'date'
                      ? appointmentDate()
                      : patientInfo[item.name]}
                  </div>
                )}
              </Fragment>
            );
          })}
        </Row>
      )}
      {secondRow?.length > 0 && (
        <Row
          className={`patient-section-print ${
            isPad ? '' : 'no-pad-patient-section'
          }`}
          style={isPad ? patientSettingStyle : {}}
        >
          {secondRow?.map((item, index) => {
            return (
              <Fragment key={index}>
                {isPad ? (
                  item?.label?.properties?.isHidden ? (
                    <div
                      style={calculatePatientLabelPadding(
                        item,
                        'label',
                        'paddingLeft',
                        'paddingRight',
                        'paddingTop',
                        'paddingBottom',
                        actualWidth,
                        totalPadding,
                        isPad,
                      )}
                    ></div>
                  ) : (
                    <div
                      style={calculatePatientLabelPadding(
                        item,
                        'label',
                        'paddingLeft',
                        'paddingRight',
                        'paddingTop',
                        'paddingBottom',
                        actualWidth,
                        totalPadding,
                        isPad,
                      )}
                    >
                      {item?.label?.labelName}:
                    </div>
                  )
                ) : (
                  ''
                )}
                {isPad ? (
                  <div
                    className="p-item-val"
                    style={
                      isPad
                        ? calculatePatientLabelPadding(
                            item,
                            'value',
                            'paddingLeft',
                            'paddingRight',
                            'paddingTop',
                            'paddingBottom',
                            actualWidth,
                            totalPadding,
                            isPad,
                          )
                        : {}
                    }
                  >
                    {item.name === 'age'
                      ? agePrint(dob, item?.unitProperties)
                      : item.name === 'date'
                      ? appointmentDate()
                      : patientInfo[item.name]}
                  </div>
                ) : (
                  <div className="n">
                    {item?.label?.labelName}: &nbsp;{' '}
                    {item.name === 'age'
                      ? agePrint(dob, item?.unitProperties)
                      : item.name === 'date'
                      ? appointmentDate()
                      : patientInfo[item.name]}
                  </div>
                )}
              </Fragment>
            );
          })}
        </Row>
      )}

      <Row className="patient-section mb-4">
        <div className="form-group form-inline">
          <label htmlFor="name">Name:</label>
          <Form.Control
            type="text"
            className={`name ${name ? '' : 'placeholder'}`}
            placeholder="Enter your patient name"
            value={name}
            onChange={(e) => handlePatientInput('name', e.target.value)}
          />
        </div>
        <div className="form-group form-inline">
          <label htmlFor="name">Age:</label>
          <InputGroup className="age-input-group">
            {(years?.enabled || !unitProperties) && (
              <>
                <Form.Control
                  size="sm"
                  type="number"
                  className={dob?.years ? '' : 'placeholder'}
                  defaultValue={dob?.years > 0 ? dob?.years : ''}
                  value={dob?.years > 0 ? dob?.years : ''}
                  placeholder="Yrs"
                  onChange={(e) => handleAge('years', e.target.value)}
                />
                {dob?.years > 0 && <span>{years?.label}</span>}
              </>
            )}
            {months?.enabled && (
              <>
                <Form.Control
                  size="sm"
                  type="number"
                  className={dob?.months ? '' : 'placeholder'}
                  defaultValue={dob?.months > 0 ? dob?.months : ''}
                  value={dob?.months > 0 ? dob?.months : ''}
                  placeholder="Mth"
                  onChange={(e) => handleAge('months', e.target.value)}
                />
                {dob?.months > 0 && <span>{months?.label}</span>}
              </>
            )}
            {days?.enabled && (
              <>
                <Form.Control
                  size="sm"
                  type="number"
                  className={dob?.days ? '' : 'placeholder'}
                  defaultValue={dob?.days > 0 ? dob?.days : ''}
                  value={dob?.days > 0 ? dob?.days : ''}
                  placeholder="Day"
                  onChange={(e) => handleAge('days', e.target.value)}
                />
                {dob?.days > 0 && <span>{days?.label}</span>}
              </>
            )}
            {hours?.enabled && (
              <>
                <Form.Control
                  size="sm"
                  type="number"
                  className={dob?.hours ? '' : 'placeholder'}
                  placeholder="Hr"
                  defaultValue={dob?.hours > 0 ? dob?.hours : ''}
                  value={dob?.hours > 0 ? dob?.hours : ''}
                  onChange={(e) => handleAge('hours', e.target.value)}
                />
                {dob?.hours > 0 && <span>{hours?.label}</span>}
              </>
            )}
          </InputGroup>
        </div>
        <div className="form-group form-inline">
          <label htmlFor="gender">Gender:</label>
          <Form.Select
            className={`form-control ${gender ? '' : 'placeholder'}`}
            size="sm"
            value={gender}
            onChange={(e) => handlePatientInput('gender', e.target.value)}
          >
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
            <option value={'others'}>Others</option>
          </Form.Select>
        </div>
        <div className="form-group form-inline">
          <label htmlFor="gender">Phone:</label>
          <Form.Control
            type="text"
            className={`phone-number ${phoneNumber ? '' : 'placeholder'}`}
            placeholder="01XXXXXXXXX"
            value={phoneNumber}
            onChange={(e) => handlePatientInput('phoneNumber', e.target.value)}
          />
        </div>
        <div className="form-group form-inline">
          <span className="add-more-info" onClick={() => setInfoModal(true)}>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            &nbsp;Add More
          </span>
          <label htmlFor="date">Date: </label>
          <span
            className="pl-1"
            style={{ fontWeight: 'normal', color: '#6e707e' }}
          >
            {moment().format('DD-MM-YYYY')}
          </span>
          {/* <Form.Control
            type="date"
            defaultValue={moment().format('YYYY-MM-DD')}
          /> */}
        </div>
        {/* <div className="form-group form-inline" style={{ maxWidth: '215px' }}>
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            options={patientList}
            placeholder="Search patient here ..."
            onChange={handleSelectedPatient}
            minLength={1}
            onSearch={handleOnInputChange}
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                <span>{option.name}</span>
              </Fragment>
            )}
          />
        </div> */}
      </Row>

      <AddPatientInfo
        patientInfo={patientInfo}
        setPatientInfo={setPatientInfo}
        infoModal={infoModal}
        setInfoModal={setInfoModal}
        selectedOnExamination={selectedOnExamination}
        setSelectedOnExamination={setSelectedOnExamination}
      />
    </>
  );
};

export default memo(PatientSection);
