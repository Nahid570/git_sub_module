import React, { useState, useRef, Fragment } from 'react'
import { Modal, Row, Col, Table, Form } from 'react-bootstrap'
import CommonButtons from '../partials/commonButtons'
import EyeGlassSlider from '../partials/eyeGlassSlider'
import { Typeahead } from 'react-bootstrap-typeahead'

function EyeGlass(props) {
  let {
    showEyeGlass,
    setShowEyeGlass,
    selectedEyeGlass,
    setSelectedEyeGlass,
    deletePrescriptionItem
  } = props

  let { isPlano, leftPlano, rightPlano, add, lens, pd, r, l, remarks } = selectedEyeGlass
  const [isRBtn, setIsRBtn] = useState(false)
  const [isLBtn, setIsLBtn] = useState('')
  const [domainVal, setDomainVal] = useState([])
  const [isRSph, setIsRSph] = useState(false)
  const [isRCyl, setIsRCyl] = useState(false)
  const [isRAxis, setIsRAxis] = useState(false)
  const [isLSph, setIsLSph] = useState(false)
  const [isLCyl, setIsLCyl] = useState(false)
  const [isLAxis, setIsLAxis] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [instructions, setInstructions] = useState([
    { id: 1, name: 'Test Remarks 01' },
    { id: 2, name: 'Test Remarks 02' },
    { id: 3, name: 'Test Remarks 03' },
    { id: 5, name: 'Test Remarks 04' },
    { id: 6, name: 'Test Remarks 05' },
  ])
  const tickCount = 10;
  const angleButtonArray = [
    '6/6',
    '6/9',
    '6/12',
    '6/18',
    '6/24',
    '6/36',
    '6/60',
    '5/60',
    '4/60',
    '3/60',
    '2/60',
    '1/60',
  ]

  const handleData = (rowName, fieldName, value, vaVal, actionType) => {
    if (fieldName === 'isPlano') {
      selectedEyeGlass.r = { sph: '', cyl: '', axis: '' }
      selectedEyeGlass.l = { sph: '', cyl: '', axis: '' }
      selectedEyeGlass.add = ''
      selectedEyeGlass.lens = ''
      selectedEyeGlass.pd = ''
      selectedEyeGlass[fieldName] = value
    } else if (rowName) {
      selectedEyeGlass[rowName][fieldName] = vaVal ? vaVal : value
      setIsLBtn(false)
      setIsRBtn(false)
    } else {
      selectedEyeGlass[fieldName] = value
    }
    setSelectedEyeGlass({ ...selectedEyeGlass })
    if (actionType === 'click') {
      clearSlider()
    }
    setSelectedEyeGlass({ ...selectedEyeGlass })
  }

  const clearSlider = () => {
    setIsAdd(false)
    setIsRSph(false)
    setIsRCyl(false)
    setIsRAxis(false)
    setIsLSph(false)
    setIsLCyl(false)
    setIsLAxis(false)
  }

  const handleSlider = (rowName, name) => {
    clearSlider()
    setIsRBtn(false)
    setIsLBtn(false)

    if (rowName === 'r') {
      if (name === 'sph') {
        setDomainVal([-20, 20])
        setIsRSph(true)
      } else if (name === 'cyl') {
        setDomainVal([-5, 5])
        setIsRCyl(true)
      } else if (name === 'axis') {
        setDomainVal([0, 180])
        setIsRAxis(true)
      }
    } else {
      if (name === 'sph') {
        setDomainVal([-20, 20])
        setIsLSph(true)
      } else if (name === 'cyl') {
        setDomainVal([-5, 5])
        setIsLCyl(true)
      } else if (name === 'axis') {
        setDomainVal([0, 180])
        setIsLAxis(true)
      }
    }
  }

  const typeaheadRef = useRef(null)
  const handleRemark = (selectedOption) => {
    const selectedData = selectedOption[0].name
    if (!selectedEyeGlass?.remarks.some((remark) => remark === selectedData)) {
      selectedEyeGlass.remarks.push(selectedData)
      setSelectedEyeGlass({ ...selectedEyeGlass })
    }
    typeaheadRef.current.clear()
  }

  // const handleOnInputChange = (searchKey) => {
  //   setIsLoading(true)
  //   const url = `chief-complains?name=${searchKey}`
  //   setSearchQuery(searchKey)

  //   getRequest(url)
  //     .then((data) => {
  //       if (data.data.length > 0) {
  //         const customizedResults = data.data.map((item) => {
  //           return {
  //             ...item,
  //             label: item.name,
  //             value: item.name,
  //           }
  //         })
  //         setChiefComplainsInSearch(customizedResults)
  //       } else {
  //         setChiefComplainsInSearch([{ id: 'notFound', name: searchKey }])
  //       }
  //       setIsLoading(false)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  return (
    <>
      <Modal
        show={showEyeGlass}
        size="lg"
        className="customize-modal-size eye-glass-modal glass-table"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Modal.Body style={{ background: '#F8F8F8' }}>
          <div className="eye-glass-title">
            <span>Eye glass</span>
            <span onClick={() => setShowEyeGlass(false)}>
              <i className="fa fa-times-circle" />
            </span>
          </div>
          <hr style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }} />
          <Row className="pt-1 pb-2">
            <Col>
              <Form.Check
                type={`checkbox`}
                id={`query`}
                label={`Plano`}
                checked={isPlano}
                onChange={(e) => handleData('', 'isPlano', e.target.checked)}
              />
            </Col>
            <Col>
              <Form.Check
                type={`checkbox`}
                id={`query`}
                label={`Left Plano`}
                checked={leftPlano}
                onChange={(e) => handleData('', 'leftPlano', e.target.checked)}
              />
            </Col>
            <Col>
              <Form.Check
                type={`checkbox`}
                id={`query`}
                label={`Right Plano`}
                checked={rightPlano}
                onChange={(e) => handleData('', 'rightPlano', e.target.checked)}
              />
            </Col>
          </Row>
          <Row style={{ position: 'relative' }}>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th colSpan={2} width="18%">
                      -
                    </th>
                    <th>SPH(D)</th>
                    <th>CYL(D)</th>
                    <th>Axis(°)</th>
                    <th style={{ width: '20%' }}>V/A</th>
                  </tr>
                </thead>
                <tbody style={{ position: 'relative' }}>
                  <tr>
                    <td rowSpan={2}>DIST</td>
                    <td>R</td>
                    {isPlano || rightPlano ? (
                      <>
                        <td colSpan={3}>
                          <b>Plano</b>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            defaultValue={r?.sph}
                            onClick={() => handleSlider('r', 'sph')}
                            onChange={(e) =>
                              handleData('r', 'sph', e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            defaultValue={r?.cyl}
                            onClick={() => handleSlider('r', 'cyl')}
                            onChange={(e) =>
                              handleData('r', 'cyl', e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            defaultValue={r?.axis}
                            onClick={() => handleSlider('r', 'axis')}
                            onChange={(e) => handleSlider('r', 'axis')}
                          />
                        </td>
                      </>
                    )}
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        defaultValue={r?.v_a}
                        onClick={() => {
                          setIsRBtn(isRBtn ? false : true)
                          setIsLBtn(false)
                          clearSlider()
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>L</td>
                    {isPlano || leftPlano ? (
                      <>
                        <td colSpan={3}>
                          <b>Plano</b>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            defaultValue={l?.sph}
                            onClick={() => handleSlider('l', 'sph')}
                            onChange={(e) =>
                              handleData('l', 'sph', e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            defaultValue={l?.cyl}
                            onClick={() => handleSlider('l', 'cyl')}
                            onChange={(e) =>
                              handleData('l', 'cyl', e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            defaultValue={l?.axis}
                            onClick={() => handleSlider('l', 'axis')}
                            onChange={(e) =>
                              handleData('l', 'axis', e.target.value)
                            }
                          />
                        </td>
                      </>
                    )}
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        defaultValue={l?.v_a}
                        onClick={() => {
                          setIsLBtn(isLBtn ? false : true)
                          setIsRBtn(false)
                          clearSlider()
                        }}
                      />
                    </td>
                  </tr>
                  {isRBtn && (
                    <CommonButtons
                      unitArray={angleButtonArray}
                      clickAction={handleData}
                      rowName="r"
                      colName="v_a"
                      indexName="r-va-btn"
                    />
                  )}
                  {isLBtn && (
                    <CommonButtons
                      unitArray={angleButtonArray}
                      clickAction={handleData}
                      rowName="l"
                      colName="v_a"
                      indexName="l-va-btn"
                    />
                  )}
                </tbody>
              </Table>

              {isRSph && (
                <div className="glass-slider-area rsph">
                  <EyeGlassSlider
                    domain={domainVal}
                    tickCount={tickCount}
                    handleData={handleData}
                    rowName={'r'}
                    fieldName={'sph'}
                  />
                </div>
              )}
              {isRCyl && (
                <div className="glass-slider-area rcyl">
                  <EyeGlassSlider
                    domain={domainVal}
                    tickCount={tickCount}
                    handleData={handleData}
                    rowName={'r'}
                    fieldName={'cyl'}
                  />
                </div>
              )}
              {isRAxis && (
                <div className="glass-slider-area raxis">
                  <EyeGlassSlider
                    domain={domainVal}
                    tickCount={tickCount}
                    handleData={handleData}
                    rowName={'r'}
                    fieldName={'axis'}
                  />
                </div>
              )}
              {isLSph && (
                <div className="glass-slider-area lsph">
                  <EyeGlassSlider
                    domain={domainVal}
                    tickCount={tickCount}
                    handleData={handleData}
                    rowName={'l'}
                    fieldName={'sph'}
                  />
                </div>
              )}
              {isLCyl && (
                <div className="glass-slider-area lcyl">
                  <EyeGlassSlider
                    domain={domainVal}
                    tickCount={tickCount}
                    handleData={handleData}
                    rowName={'l'}
                    fieldName={'cyl'}
                  />
                </div>
              )}
              {isLAxis && (
                <div className="glass-slider-area laxis">
                  <EyeGlassSlider
                    domain={domainVal}
                    tickCount={tickCount}
                    handleData={handleData}
                    rowName={'l'}
                    fieldName={'axis'}
                  />
                </div>
              )}
            </Col>
          </Row>
          <Row className="pt-1 pb-2" style={{ position: 'relative' }}>
            <Col className="eye-glass-bottom">
              <div>Add:</div>
              <Form.Control
                size="sm"
                disabled={isPlano}
                type="text"
                defaultValue={add}
                onChange={(e) => handleData('', 'add', e.target.value)}
                onClick={() => {
                  clearSlider()
                  setIsAdd(isAdd ? false : true)
                }}
              />{' '}
              <div>&nbsp;D</div>
            </Col>
            <Col className="eye-glass-bottom">
              <div>Lens:</div>{' '}
              <Form.Control
                disabled={isPlano}
                size="sm"
                type="text"
                defaultValue={lens}
                onChange={(e) => handleData('', 'lens', e.target.value)}
              />
            </Col>
            <Col className="eye-glass-bottom">
              <div>PD:</div>
              <Form.Control
                size="sm"
                disabled={isPlano}
                type="text"
                defaultValue={pd}
                onChange={(e) => handleData('', 'pd', e.target.value)}
              />
              <div>&nbsp;mm</div>
            </Col>
            {isAdd && (
              <div className="glass-slider-area add-slider">
                <EyeGlassSlider
                  domain={[0, 3.5]}
                  handleData={handleData}
                  fieldName={'add'}
                  tickCount={tickCount}
                />
              </div>
            )}
          </Row>

          <Row className="pt-2 pb-2">
            <Col md={5} className="eye-glass-bottom">
              <div>Remarks:</div>
              <Typeahead
                style={{ width: '83%' }}
                allowNew
                labelKey="name"
                ref={typeaheadRef}
                id="custom-selections-example"
                newSelectionPrefix="Click to add new: "
                options={instructions}
                placeholder="Search / Add remarks here ..."
                onChange={handleRemark}
                size="sm"
                renderMenuItemChildren={(option, props) => (
                  <Fragment>
                    <span>{option.name}</span>
                  </Fragment>
                )}
              />
            </Col>
          </Row>
          {remarks?.length > 0 && (
            <Row>
              <Col>
                <div>
                  {remarks.map((remark, index) => {
                    return (
                      <div key={index}>
                        <span className="text-left" style={{color: '#6e707e'}}>{remark}</span>
                        <span
                          className="float-right cursor-pointer"
                          onClick={() =>
                            deletePrescriptionItem('eyeGlassRemark', remark)
                          }
                        >
                          <i
                            className="fa fa-times-circle"
                            style={{ color: '#CB2020D9' }}
                          ></i>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
export default EyeGlass
