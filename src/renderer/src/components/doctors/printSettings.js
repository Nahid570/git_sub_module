import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MultiRanger from './multiRanger'
import Button from 'react-bootstrap/Button'
import Editor from './partials/editor'
import { useGetRequest } from '../../hooks/useGetRequest'
import { usePostRequest } from '../../hooks/usePostRequest'
import { usePatchRequest } from '../../hooks/usePatchRequest'
import { toast } from 'react-toastify'
import Accordion from 'react-bootstrap/Accordion'
import VerticalRanger from './verticalRanger'
import Form from 'react-bootstrap/Form'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1'

function PrintSettings() {
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  )
  const [prescriptionPrintSetting, setPrescriptionPrintSetting] = useState(null)
  const [
    prescriptionPrintSettingForBlankPage,
    setPrescriptionPrintSettingForBlankPage,
  ] = useState(null)

  const {
    isLoading: isPrintSettingsLoading,
    refetch: getPrintSetting,
  } = useGetRequest(
    'printSetting',
    'settings/prescription-print-setting?organizationId=' +
      activeOrganization.id,
    (data) => {
      setPrescriptionPrintSetting(data)
      setPrescriptionPrintSettingForBlankPage(data)
    },
    (e) => {
      console.log(e)
    },
  )

  useEffect(() => {
    if (activeOrganization.id) {
      getPrintSetting()
    }
  }, [])

  const unitToRem = (value, unit, percent = '') => {
    if (unit === 'cm') return value
    else if (unit === 'in') return value * 2.54
    else if (unit === '%' && percent !== '') return (value * percent) / 100
    else if (unit === 'px') return value * 0.0625
    else return null
  }

  const updatePrintSetting = (firstLevelItem, item, value, unit) => {
    if (value) {
      const newItem = {
        ...prescriptionPrintSetting[firstLevelItem][item],
        quantity: value,
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        [firstLevelItem]: {
          ...prescriptionPrintSetting[firstLevelItem],
          [item]: newItem,
        },
      })
    } else if (unit) {
      const newItem = {
        ...prescriptionPrintSetting[firstLevelItem][item],
        unit: unit,
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        [firstLevelItem]: {
          ...prescriptionPrintSetting[firstLevelItem],
          [item]: newItem,
        },
      })
    } else {
      const newItem = {
        ...prescriptionPrintSetting[firstLevelItem][item],
        quantity: 0,
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        [firstLevelItem]: {
          ...prescriptionPrintSetting[firstLevelItem],
          [item]: newItem,
        },
      })
    }
  }

  const updatePrintBorders = (mainItem, item, e) => {
    const newSettings = {
      ...prescriptionPrintSetting,
      [mainItem]: {
        ...prescriptionPrintSetting[mainItem],
        [item]: e.target.checked,
      },
    }
    setPrescriptionPrintSetting({ ...newSettings })
  }

  const updatePrintBordersBody = (item, e) => {
    if (item === 'borderLeft') {
      const leftContent = {
        ...prescriptionPrintSetting.leftContent,
        [item]: e.target.checked,
      }
      setPrescriptionPrintSetting({ ...prescriptionPrintSetting, leftContent })
    } else if (item === 'borderRight') {
      const rightContent = {
        ...prescriptionPrintSetting.rightContent,
        [item]: e.target.checked,
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        rightContent,
      })
    } else if (item === 'borderTop') {
      const leftContent = {
        ...prescriptionPrintSetting.leftContent,
        [item]: e.target.checked,
      }
      const rightContent = {
        ...prescriptionPrintSetting.rightContent,
        [item]: e.target.checked,
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        leftContent,
        rightContent,
      })
    } else if (item === 'borderBottom') {
      const leftContent = {
        ...prescriptionPrintSetting.leftContent,
        [item]: e.target.checked,
      }
      const rightContent = {
        ...prescriptionPrintSetting.rightContent,
        [item]: e.target.checked,
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        leftContent,
        rightContent,
      })
    }
  }

  const updatePrintSettingBody = (item, value, unit) => {
    if (item === 'marginLeft' && value) {
      const leftContent = {
        ...prescriptionPrintSetting.prescriptionBody.leftContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.leftContent[item],
          quantity: value,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          leftContent,
        },
      })
    } else if (item === 'marginLeft' && unit) {
      const leftContent = {
        ...prescriptionPrintSetting.prescriptionBody.leftContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.leftContent[item],
          unit,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          leftContent,
        },
      })
    } else if (item === 'marginRight' && value) {
      const rightContent = {
        ...prescriptionPrintSetting.prescriptionBody.rightContent,
        marginRight: {
          ...prescriptionPrintSetting.prescriptionBody.rightContent[item],
          quantity: value,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          rightContent,
        },
      })
    } else if (item === 'marginRight' && unit) {
      const rightContent = {
        ...prescriptionPrintSetting.prescriptionBody.rightContent,
        marginRight: {
          ...prescriptionPrintSetting.prescriptionBody.rightContent[item],
          unit,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          rightContent,
        },
      })
    } else if (item === 'marginTop' && value) {
      const rightContent = {
        ...prescriptionPrintSetting.prescriptionBody.rightContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.rightContent[item],
          quantity: value,
        },
      }
      const leftContent = {
        ...prescriptionPrintSetting.prescriptionBody.leftContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.leftContent[item],
          quantity: value,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          leftContent,
          rightContent,
        },
      })
    } else if (item === 'marginTop' && unit) {
      const rightContent = {
        ...prescriptionPrintSetting.prescriptionBody.rightContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.rightContent[item],
          unit,
        },
      }
      const leftContent = {
        ...prescriptionPrintSetting.prescriptionBody.leftContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.leftContent[item],
          unit,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          leftContent,
          rightContent,
        },
      })
    } else if (item === 'marginBottom' && value) {
      const rightContent = {
        ...prescriptionPrintSetting.prescriptionBody.rightContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.rightContent[item],
          quantity: value,
        },
      }
      const leftContent = {
        ...prescriptionPrintSetting.prescriptionBody.leftContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.leftContent[item],
          quantity: value,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          leftContent,
          rightContent,
        },
      })
    } else if (item === 'marginBottom' && unit) {
      const rightContent = {
        ...prescriptionPrintSetting.prescriptionBody.rightContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.rightContent[item],
          unit,
        },
      }
      const leftContent = {
        ...prescriptionPrintSetting.prescriptionBody.leftContent,
        [item]: {
          ...prescriptionPrintSetting.prescriptionBody.leftContent[item],
          unit,
        },
      }
      setPrescriptionPrintSetting({
        ...prescriptionPrintSetting,
        prescriptionBody: {
          ...prescriptionPrintSetting.prescriptionBody,
          leftContent,
          rightContent,
        },
      })
    }
  }

  const getHeaderWidth = () => {
    if (prescriptionPrintSetting) {
      const width =
        prescriptionPrintSetting.page.width.quantity -
        (prescriptionPrintSetting.page.marginLeft.quantity +
          prescriptionPrintSetting.page.marginRight.quantity) -
        (prescriptionPrintSetting.header.marginLeft.quantity +
          prescriptionPrintSetting.header.marginRight.quantity * 2)

      if (prescriptionPrintSetting.header.width.unit === '%') {
        return unitToRem(
          width,
          prescriptionPrintSetting.header.width.unit,
          prescriptionPrintSetting.header.width.quantity,
        )
      } else {
        return unitToRem(
          prescriptionPrintSetting.header.width.quantity,
          prescriptionPrintSetting.header.width.unit,
        )
      }
    } else {
      return 0
    }
  }

  const getPatientSectionWidth = () => {
    if (prescriptionPrintSetting) {
      const width =
        prescriptionPrintSetting.page.width.quantity -
        (prescriptionPrintSetting.page.marginLeft.quantity +
          prescriptionPrintSetting.page.marginRight.quantity) -
        (prescriptionPrintSetting.patientSetting.marginLeft.quantity +
          prescriptionPrintSetting.patientSetting.marginRight.quantity * 2)

      if (prescriptionPrintSetting.patientSetting.width.unit === '%') {
        return unitToRem(
          width,
          prescriptionPrintSetting.patientSetting.width.unit,
          prescriptionPrintSetting.patientSetting.width.quantity,
        )
      } else {
        return unitToRem(
          prescriptionPrintSetting.patientSetting.width.quantity,
          prescriptionPrintSetting.patientSetting.width.unit,
        )
      }
    } else {
      return 0
    }
  }

  const getFooterWidth = () => {
    if (prescriptionPrintSetting) {
      const width =
        prescriptionPrintSetting.page.width.quantity -
        (prescriptionPrintSetting.page.marginLeft.quantity +
          prescriptionPrintSetting.page.marginRight.quantity) -
        (prescriptionPrintSetting.footer.marginLeft.quantity +
          prescriptionPrintSetting.footer.marginRight.quantity * 2)

      if (prescriptionPrintSetting.footer.width.unit === '%') {
        return unitToRem(
          width,
          prescriptionPrintSetting.footer.width.unit,
          prescriptionPrintSetting.footer.width.quantity,
        )
      } else {
        return unitToRem(
          prescriptionPrintSetting.footer.width.quantity,
          prescriptionPrintSetting.footer.width.unit,
        )
      }
    } else {
      return 0
    }
  }

  const getBodyHeight = () => {
    if (prescriptionPrintSetting) {
      const headerHeight =
        prescriptionPrintSetting.header.marginTop.quantity +
        prescriptionPrintSetting.header.height.quantity +
        prescriptionPrintSetting.header.marginBottom.quantity
      const footerHeight =
        prescriptionPrintSetting.footer.marginTop.quantity +
        prescriptionPrintSetting.footer.height.quantity +
        prescriptionPrintSetting.footer.marginBottom.quantity
      const patientSettingHeight =
        prescriptionPrintSetting.patientSetting.marginTop.quantity +
        prescriptionPrintSetting.patientSetting.height.quantity +
        prescriptionPrintSetting.patientSetting.marginBottom.quantity
      const allRemainHeight =
        prescriptionPrintSetting.page.marginTop.quantity +
        prescriptionPrintSetting.page.marginBottom.quantity
      const height =
        prescriptionPrintSetting.page.height.quantity -
        headerHeight -
        footerHeight -
        patientSettingHeight -
        allRemainHeight

      return unitToRem(height, prescriptionPrintSetting.page.height.unit)
    } else {
      return 0
    }
  }

  const getBodyWidth = () => {
    if (prescriptionPrintSetting) {
      const width =
        prescriptionPrintSetting.page.width.quantity -
        (prescriptionPrintSetting.page.marginLeft.quantity +
          prescriptionPrintSetting.page.marginRight.quantity) -
        (prescriptionPrintSetting.prescriptionBody.leftContent.marginLeft
          .quantity +
          prescriptionPrintSetting.prescriptionBody.rightContent.marginRight
            .quantity *
            2)
      return unitToRem(width, prescriptionPrintSetting.page.width.unit)
    } else {
      return 0
    }
  }

  const {
    isLoading: isLoadingUpdatePrintSetting,
    mutate: savePrintSetting,
  } = usePatchRequest(
    'settings/prescription-print-setting',
    {
      organizationId: activeOrganization.id,
      ...prescriptionPrintSetting,
    },
    (res) => {
      toast.success('Prescription print settings saved successfully', {
        position: toast.POSITION.TOP_RIGHT,
      })
    },
    (e) => {
      console.log(e)
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    },
  )

  const {
    isLoading: isLoadingUpdatePrintSettingBlank,
    mutate: savePrintSettingBlankPage,
  } = usePatchRequest(
    'settings/prescription-print-setting',
    {
      organizationId: activeOrganization.id,
      ...prescriptionPrintSettingForBlankPage,
    },
    (res) => {
      toast.success('Prescription print settings saved successfully', {
        position: toast.POSITION.TOP_RIGHT,
      })
    },
    (e) => {
      console.log(e)
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    },
  )

  const handlePrescriptionPrintOn = (e) => {
    setPrescriptionPrintSettingForBlankPage({
      ...prescriptionPrintSettingForBlankPage,
      isPadPrescription: e.target.value === 'blank' ? false : true,
    })

    setPrescriptionPrintSetting({
      ...prescriptionPrintSetting,
      isPadPrescription: e.target.value === 'blank' ? false : true,
    })
  }

  const handleSaveSettings = () => {
    if (
      prescriptionPrintSettingForBlankPage &&
      prescriptionPrintSettingForBlankPage.isPadPrescription
    ) {
      savePrintSetting()
    } else {
      savePrintSettingBlankPage()
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <p>
            <span style={{ paddingRight: '20px' }}>Prescription Print on:</span>
            <Form.Check
              inline
              label="Blank Page"
              name="page-border"
              type={'radio'}
              value="blank"
              checked={
                prescriptionPrintSetting &&
                !prescriptionPrintSetting.isPadPrescription
                  ? true
                  : false
              }
              onChange={(e) => handlePrescriptionPrintOn(e)}
            />
            <Form.Check
              inline
              label="Prescription Pad"
              name="page-border"
              type={'radio'}
              value="pad"
              checked={
                prescriptionPrintSetting &&
                prescriptionPrintSetting.isPadPrescription
                  ? true
                  : false
              }
              onChange={(e) => handlePrescriptionPrintOn(e)}
            />
          </p>
        </Col>
      </Row>

      {prescriptionPrintSettingForBlankPage &&
        prescriptionPrintSettingForBlankPage.isPadPrescription && (
          <Row>
            <Col md={8}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="profile-setting-menu-item">
                    Prescription Body
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row className="mt-2">
                      <Col md={12}>
                        <Row className="mb-2">
                          <Col md={12}>
                            <Row>
                              <Col md={2} className="text-right mt-2">
                                Total Hight:{' '}
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.height
                                      .quantity
                                      ? prescriptionPrintSetting.page.height
                                          .quantity
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'height',
                                      e.target.value,
                                      '',
                                    )
                                  }
                                />
                              </Col>
                              <Col md={2} style={{ width: '100px' }}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.height.unit
                                      ? prescriptionPrintSetting.page.height
                                          .unit
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'height',
                                      '',
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                              <Col md={2} className="text-right mt-2">
                                Total Width:{' '}
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.width.quantity
                                      ? prescriptionPrintSetting.page.width
                                          .quantity
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'width',
                                      e.target.value,
                                      '',
                                    )
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.width.unit
                                      ? prescriptionPrintSetting.page.width.unit
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'width',
                                      '',
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                            </Row>
                            <Row className="mt-2">
                              <Col md={2} className="text-right mt-2">
                                Padding Left (<i className="fas fa-arrow-right"></i>
                                )
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.marginLeft
                                      .quantity
                                      ? prescriptionPrintSetting.page.marginLeft
                                          .quantity
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'marginLeft',
                                      e.target.value,
                                      '',
                                    )
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.marginLeft
                                      .unit
                                      ? prescriptionPrintSetting.page.marginLeft
                                          .unit
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'marginLeft',
                                      '',
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                              <Col md={2} className="text-right mt-2">
                                Padding Right (<i className="fas fa-arrow-left"></i>
                                )
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.marginRight
                                      .quantity
                                      ? prescriptionPrintSetting.page
                                          .marginRight.quantity
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'marginRight',
                                      e.target.value,
                                      '',
                                    )
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.page &&
                                    prescriptionPrintSetting.page.marginRight
                                      .unit
                                      ? prescriptionPrintSetting.page
                                          .marginRight.unit
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'page',
                                      'marginRight',
                                      '',
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                            </Row>
                            {/* <Row>
                              <Col md={2} className="text-right mt-2">
                                Padding Top:{" "}
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                      prescriptionPrintSetting.page &&
                                      prescriptionPrintSetting.page.marginTop
                                        .quantity
                                      ? prescriptionPrintSetting.page.marginTop
                                        .quantity
                                      : "0"
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      "page",
                                      "marginTop",
                                      e.target.value,
                                      ""
                                    )
                                  }
                                />
                              </Col>
                              <Col md={1}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  style={{ width: "100px" }}
                                  value={
                                    prescriptionPrintSetting &&
                                      prescriptionPrintSetting.page &&
                                      prescriptionPrintSetting.page.marginTop.unit
                                      ? prescriptionPrintSetting.page.marginTop
                                        .unit
                                      : "0"
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      "page",
                                      "marginTop",
                                      "",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                              <Col md={2} className="text-right mt-2">
                                Padding Bottom:{" "}
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                      prescriptionPrintSetting.page &&
                                      prescriptionPrintSetting.page.marginBottom
                                        .quantity
                                      ? prescriptionPrintSetting.page
                                        .marginBottom.quantity
                                      : "0"
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      "page",
                                      "marginBottom",
                                      e.target.value,
                                      ""
                                    )
                                  }
                                />
                              </Col>
                              <Col md={1}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  style={{ width: "100px" }}
                                  value={
                                    prescriptionPrintSetting &&
                                      prescriptionPrintSetting.page &&
                                      prescriptionPrintSetting.page.marginBottom
                                        .unit
                                      ? prescriptionPrintSetting.page
                                        .marginBottom.unit
                                      : "0"
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      "page",
                                      "marginBottom",
                                      "",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                            </Row> */}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="profile-setting-menu-item">
                    Header
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={12}>
                        <Row className="mb-2">
                          <Col md={12}>
                            <Row>
                              <Col md={2} className="text-right mt-2">
                                Total Hight:{' '}
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.header &&
                                    prescriptionPrintSetting.header.height
                                      .quantity
                                      ? prescriptionPrintSetting.header.height
                                          .quantity
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'header',
                                      'height',
                                      e.target.value,
                                      '',
                                    )
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.header &&
                                    prescriptionPrintSetting.header.height.unit
                                      ? prescriptionPrintSetting.header.height
                                          .unit
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'header',
                                      'height',
                                      '',
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                            </Row>
                            {/* <Row>
                              <Col md={2} className="text-right mt-2">
                                Border:{" "}
                              </Col>
                              <Col md={1} className="mt-2">
                                <Form.Check
                                  inline
                                  label="Left"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders(
                                      "header",
                                      "borderLeft",
                                      e
                                    )
                                  }
                                />
                              </Col>
                              <Col md={1} className="mt-2">
                                {" "}
                                <Form.Check
                                  inline
                                  label="Right"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders(
                                      "header",
                                      "borderRight",
                                      e
                                    )
                                  }
                                />
                              </Col>
                              <Col md={1} className="mt-2">
                                {" "}
                                <Form.Check
                                  inline
                                  label="Top"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders("header", "borderTop", e)
                                  }
                                />
                              </Col>
                              <Col md={1} className="mt-2">
                                {" "}
                                <Form.Check
                                  inline
                                  label="Bottom"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders(
                                      "header",
                                      "borderBottom",
                                      e
                                    )
                                  }
                                />
                              </Col>
                            </Row> */}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header className="profile-setting-menu-item">
                    Footer
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col>
                        <Row className="mb-2">
                          <Col md={12}>
                            <Row>
                              <Col md={2} className="text-right mt-2">
                                Total Hight:{' '}
                              </Col>
                              <Col md={2}>
                                <Form.Control
                                  type="number"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.footer &&
                                    prescriptionPrintSetting.footer.height
                                      .quantity
                                      ? prescriptionPrintSetting.footer.height
                                          .quantity
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'footer',
                                      'height',
                                      e.target.value,
                                      '',
                                    )
                                  }
                                />
                              </Col>
                              <Col md={2}>
                                <Form.Select
                                  name="measurement"
                                  className="form-control"
                                  value={
                                    prescriptionPrintSetting &&
                                    prescriptionPrintSetting.footer &&
                                    prescriptionPrintSetting.footer.height.unit
                                      ? prescriptionPrintSetting.footer.height
                                          .unit
                                      : '0'
                                  }
                                  onChange={(e) =>
                                    updatePrintSetting(
                                      'footer',
                                      'height',
                                      '',
                                      e.target.value,
                                    )
                                  }
                                >
                                  <option value="cm">cm</option>
                                  <option value="px">px</option>
                                  <option value="in">inches</option>
                                  <option value="%">%</option>
                                </Form.Select>
                              </Col>
                            </Row>
                            {/* <Row>
                              <Col md={2} className="text-right mt-2">
                                Border:{" "}
                              </Col>
                              <Col md={1} className="mt-2">
                                {" "}
                                <Form.Check
                                  inline
                                  label="Left"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders(
                                      "footer",
                                      "borderLeft",
                                      e
                                    )
                                  }
                                />
                              </Col>
                              <Col md={1} className="mt-2">
                                {" "}
                                <Form.Check
                                  inline
                                  label="Right"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders(
                                      "footer",
                                      "borderRight",
                                      e
                                    )
                                  }
                                />
                              </Col>
                              <Col md={1} className="mt-2">
                                {" "}
                                <Form.Check
                                  inline
                                  label="Top"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders("footer", "borderTop", e)
                                  }
                                />
                              </Col>
                              <Col md={1} className="mt-2">
                                {" "}
                                <Form.Check
                                  inline
                                  label="Bottom"
                                  name="page-border"
                                  type={"checkbox"}
                                  onChange={(e) =>
                                    updatePrintBorders(
                                      "footer",
                                      "borderBottom",
                                      e
                                    )
                                  }
                                />
                              </Col>
                            </Row> */}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col md={4}>
              <div
                style={{
                  height: `${
                    prescriptionPrintSetting && prescriptionPrintSetting.page
                      ? unitToRem(
                          prescriptionPrintSetting.page.height.quantity,
                          prescriptionPrintSetting.page.height.unit,
                          '',
                        )
                      : 16
                  }rem`,
                  // minHeight: "16rem",
                  // maxHeight: "25rem",
                  width: `${
                    prescriptionPrintSetting && prescriptionPrintSetting.page
                      ? unitToRem(
                          prescriptionPrintSetting.page.width.quantity,
                          prescriptionPrintSetting.page.width.unit,
                          '',
                        )
                      : 9
                  }rem`,
                  // maxWidth: "15rem",
                  // minWidth: "7rem",
                  border: '1px solid lightgrey',
                  margin: '50px auto',
                  // boxSizing: "border-box",
                  //this will be used as margin measurement as pad padding
                  paddingLeft: `${
                    prescriptionPrintSetting && prescriptionPrintSetting.page
                      ? unitToRem(
                          prescriptionPrintSetting.page.marginLeft.quantity,
                          prescriptionPrintSetting.page.marginLeft.unit,
                          '',
                        )
                      : 0
                  }rem`, //0.0625×5
                  paddingRight: `${
                    prescriptionPrintSetting && prescriptionPrintSetting.page
                      ? unitToRem(
                          prescriptionPrintSetting.page.marginRight.quantity,
                          prescriptionPrintSetting.page.marginRight.unit,
                          '',
                        )
                      : 0
                  }rem`,
                  paddingTop: `${
                    prescriptionPrintSetting && prescriptionPrintSetting.page
                      ? unitToRem(
                          prescriptionPrintSetting.page.marginTop.quantity,
                          prescriptionPrintSetting.page.marginTop.unit,
                          '',
                        )
                      : 0
                  }rem`,
                  paddingBottom: `${
                    prescriptionPrintSetting && prescriptionPrintSetting.page
                      ? unitToRem(
                          prescriptionPrintSetting.page.marginBottom.quantity,
                          prescriptionPrintSetting.page.marginBottom.unit,
                          '',
                        )
                      : 0
                  }rem`,
                }}
              >
                {/* div for margin line */}
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    border: '1px dotted lightgrey',
                  }}
                >
                  {/* div for header */}
                  <div
                    style={{
                      height: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.header
                          ? unitToRem(
                              prescriptionPrintSetting.header.height.quantity,
                              prescriptionPrintSetting.header.height.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      borderTop: '0.0625rem solid lightgrey',
                      borderBottom: '0.0625rem solid lightgrey',
                      borderLeft: '0.0625rem solid lightgrey',
                      borderRight: '0.0625rem solid lightgrey',
                      //this will be used as margin measurement as header padding
                      //this will be used as margin measurement as header padding
                      marginLeft: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.header
                          ? unitToRem(
                              prescriptionPrintSetting.header.marginLeft
                                .quantity,
                              prescriptionPrintSetting.header.marginLeft.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginRight: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.header
                          ? unitToRem(
                              prescriptionPrintSetting.header.marginRight
                                .quantity,
                              prescriptionPrintSetting.header.marginRight.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginTop: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.header
                          ? unitToRem(
                              prescriptionPrintSetting.header.marginTop
                                .quantity,
                              prescriptionPrintSetting.header.marginTop.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginBottom: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.header
                          ? unitToRem(
                              prescriptionPrintSetting.header.marginBottom
                                .quantity,
                              prescriptionPrintSetting.header.marginBottom.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      width: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.header
                          ? getHeaderWidth()
                          : 0
                      }rem`, //need to calculate for 100% or 50% of width 11.375 or fixed measurement
                    }}
                  ></div>

                  {/* div for patient section */}
                  <div
                    style={{
                      height: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.patientSetting
                          ? unitToRem(
                              prescriptionPrintSetting.patientSetting.height
                                .quantity,
                              prescriptionPrintSetting.patientSetting.height
                                .unit,
                              '',
                            )
                          : 0
                      }rem`,
                      borderTop: '0.0625rem solid lightgrey',
                      borderBottom: '0.0625rem solid lightgrey',
                      borderLeft: '0.0625rem solid lightgrey',
                      borderRight: '0.0625rem solid lightgrey',
                      //this will be used as margin measurement as header padding
                      //this will be used as margin measurement as header padding
                      marginLeft: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.patientSetting
                          ? unitToRem(
                              prescriptionPrintSetting.patientSetting.marginLeft
                                .quantity,
                              prescriptionPrintSetting.patientSetting.marginLeft
                                .unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginRight: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.patientSetting
                          ? unitToRem(
                              prescriptionPrintSetting.patientSetting
                                .marginRight.quantity,
                              prescriptionPrintSetting.patientSetting
                                .marginRight.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginTop: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.patientSetting
                          ? unitToRem(
                              prescriptionPrintSetting.patientSetting.marginTop
                                .quantity,
                              prescriptionPrintSetting.patientSetting.marginTop
                                .unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginBottom: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.patientSetting
                          ? unitToRem(
                              prescriptionPrintSetting.patientSetting
                                .marginBottom.quantity,
                              prescriptionPrintSetting.patientSetting
                                .marginBottom.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      width: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.patientSetting
                          ? getPatientSectionWidth()
                          : 0
                      }rem`, //need to calculate for 100% or 50% of width 11.375 or fixed measurement
                    }}
                  ></div>

                  {/* div for body */}
                  <div
                    style={{
                      height: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.prescriptionBody
                          ? getBodyHeight()
                          : 0
                      }rem`,
                      // width: "100%",
                      width: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.prescriptionBody
                          ? getBodyWidth()
                          : 0
                      }rem`,

                      marginLeft: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.prescriptionBody
                          ? unitToRem(
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginLeft.quantity,
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginLeft.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginRight: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.prescriptionBody
                          ? unitToRem(
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginRight.quantity,
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginRight.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginTop: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.prescriptionBody
                          ? unitToRem(
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginTop.quantity,
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginTop.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginBottom: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.prescriptionBody
                          ? unitToRem(
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginBottom.quantity,
                              prescriptionPrintSetting.prescriptionBody
                                .leftContent.marginBottom.unit,
                              '',
                            )
                          : 0
                      }rem`,

                      borderTop: '0.0625rem solid lightgrey',
                      borderBottom: '0.0625rem solid lightgrey',
                      borderLeft: '0.0625rem solid lightgrey',
                      borderRight: '0.0625rem solid lightgrey',
                    }}
                  ></div>

                  {/* div for footer */}
                  <div
                    style={{
                      height: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.footer
                          ? unitToRem(
                              prescriptionPrintSetting.footer.height.quantity,
                              prescriptionPrintSetting.footer.height.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      width: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.footer
                          ? getFooterWidth()
                          : 0
                      }rem`, //need to calculate for 100% or 50% of width 11.375 or fixed measurement

                      marginLeft: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.footer
                          ? unitToRem(
                              prescriptionPrintSetting.footer.marginLeft
                                .quantity,
                              prescriptionPrintSetting.footer.marginLeft.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginRight: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.footer
                          ? unitToRem(
                              prescriptionPrintSetting.footer.marginRight
                                .quantity,
                              prescriptionPrintSetting.footer.marginRight.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginTop: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.footer
                          ? unitToRem(
                              prescriptionPrintSetting.footer.marginTop
                                .quantity,
                              prescriptionPrintSetting.footer.marginTop.unit,
                              '',
                            )
                          : 0
                      }rem`,
                      marginBottom: `${
                        prescriptionPrintSetting &&
                        prescriptionPrintSetting.footer
                          ? unitToRem(
                              prescriptionPrintSetting.footer.marginBottom
                                .quantity,
                              prescriptionPrintSetting.footer.marginBottom.unit,
                              '',
                            )
                          : 0
                      }rem`,

                      borderTop: '0.0625rem solid lightgrey',
                      borderBottom: '0.0625rem solid lightgrey',
                      borderLeft: '0.0625rem solid lightgrey',
                      borderRight: '0.0625rem solid lightgrey',
                    }}
                  ></div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      <Row>
        <Col md={2}></Col>
        <Col md={4}>
          <Button
            style={{ width: '250px', marginTop: '20px', marginBottom: '20px' }}
            onClick={handleSaveSettings}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default PrintSettings
