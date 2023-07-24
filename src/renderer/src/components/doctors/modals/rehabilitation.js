import React, { useState, useEffect, memo } from 'react'
import { Modal, Row, Col, Form, Tab, Nav } from 'react-bootstrap'
import { getRequest, postRequest } from '../../../utils/axiosRequests'
import { useGetRequest } from '../../../hooks/useGetRequest'
import ItemWithDeleteIcon from '../partials/itemWithDeleteIcon'
import LoadMore from '../partials/loadMore'
import ModalHeader from '../partials/modalHeader'
import SearchArea from '../partials/searchArea'
import { capitalizeFirstLetter } from '../../../utils/helpers'

const RehabilitationModal = (props) => {
  let {
    showRehabilitation,
    setShowRehabilitation,
    selectedRehabilitation,
    setSelectedRehabilitation,
  } = props

  let { physicalTherapies, exercises, orthoses } = selectedRehabilitation
  const [physicalTherapyList, setPhysicalTherapyList] = useState([])
  const [orthosisList, setOrthosisList] = useState([])
  const [exerciseList, setExerciseList] = useState([])
  const [tabKey, setTabKey] = useState('physicalTherapy')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [therapyPage, setTherapyPage] = useState(1)
  const [exercisePage, setExercisePage] = useState(1)
  const [orthosisPage, setOrthosisPage] = useState(1)
  const [totalTherapies, setTotalTherapies] = useState(0)
  const [totalExercises, setTotalExercises] = useState(0)
  const [totalOrthoses, setTotalOrthoses] = useState(0)
  const [searchResults, setSearchResults] = useState([])
  const perPage = 25

  const { isLoading: isPhysicalTherapy, refetch: getTherapies } = useGetRequest(
    'getTherapies',
    'physical-therapies?page=' + therapyPage + '&perPage=' + perPage,
    (data) => {
      if (therapyPage > 1) {
        setPhysicalTherapyList([...physicalTherapyList, ...data.data])
      } else {
        setPhysicalTherapyList(data.data)
        setTotalTherapies(data.total)
      }
    },
    (e) => {
      console.log(e)
    },
  )

  const { isLoading: isExercise, refetch: getExercises } = useGetRequest(
    'getExercises',
    `exercises?page=${exercisePage}&perPage=${perPage}`,
    (data) => {
      if (exercisePage > 1) {
        setExerciseList([...exerciseList, ...data.data])
      } else {
        setExerciseList(data.data)
        setTotalExercises(data.total)
      }
    },
    (e) => {
      console.log(e)
    },
  )

  const { isLoading: isOrthosesLoading, refetch: getOrthoses } = useGetRequest(
    'getOrthoses',
    `orthoses?page=${orthosisPage}&perPage=${perPage}`,
    (data) => {
      if (orthosisPage > 1) {
        setOrthosisList([...orthosisList, ...data.data])
      } else {
        setOrthosisList(data.data)
        setTotalOrthoses(data.total)
      }
    },
    (e) => {
      console.log(e)
    },
  )

  useEffect(() => {
    getTherapies()
  }, [therapyPage])

  useEffect(() => {
    getExercises()
  }, [exercisePage])

  useEffect(() => {
    getOrthoses()
  }, [orthosisPage])

  const handleSelectedRehabilitation = (type, data) => {
    if (type === 'physicalTherapy') {
      selectedRehabilitation.physicalTherapies = data
    } else if (type === 'exercise') {
      selectedRehabilitation.exercises = data
    }
    if (type === 'orthosis') {
      selectedRehabilitation.orthoses = data
    }
    setSelectedRehabilitation({ ...selectedRehabilitation })
  }

  const getSelectedData = () => {
    let result
    if (tabKey === 'exercise') {
      result = exercises
    } else if (tabKey === 'orthosis') {
      result = orthoses
    } else {
      result = physicalTherapies
    }
    return result
  }

  const selectUnSelectAction = (item) => {
    let newData
    let selectedData = getSelectedData()
    if (selectedData.some((data) => data.id === item.id)) {
      newData = selectedData.filter((data) => data.id !== item.id)
    } else {
      newData = {
        id: item.id,
        name: item.name,
        duration: '',
        unit: 'day(s)',
        note: '',
      }
      newData = [...selectedData, newData]
    }
    handleSelectedRehabilitation(tabKey, newData)
  }

  const handleSelectedExtraData = (item, fieldName, e) => {
    let selectedData = getSelectedData()
    const objIndex = selectedData?.findIndex((data) => data.name == item.name)
    selectedData[objIndex][fieldName] = e.target.value
    handleSelectedRehabilitation(tabKey, selectedData)
  }

  const handleSearchOrNew = (selectedOption) => {
    let selectedData = selectedOption
    let selectedTabData = getSelectedData()
    if (
      !selectedTabData?.some((item) => item.name === selectedData.name) &&
      selectedData.id !== 'notFound'
    ) {
      let result = [
        ...selectedTabData,
        {
          id: selectedData?.id,
          name: selectedData.name,
          duration: '',
          unit: 'day(s)',
          note: '',
        },
      ]
      handleSelectedRehabilitation(tabKey, result)
    } else {
      postRequest(getSelectedUrl(), { name: selectedData.name })
        .then((data) => {
          if (tabKey === 'exercise') {
            setExerciseList([...exerciseList, data])
          } else if (tabKey === 'orthosis') {
            setOrthosisList([...orthosisList, data])
          } else {
            setPhysicalTherapyList([...physicalTherapyList, data])
          }

          let result = [
            ...selectedTabData,
            {
              id: data?.id,
              name: selectedData.name,
              duration: '',
              unit: 'day(s)',
              note: '',
            },
          ]
          handleSelectedRehabilitation(tabKey, result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    setSearchResults([])
    setSearchQuery('')
  }

  const getSelectedUrl = () => {
    let result
    if (tabKey === 'exercise') {
      result = 'exercises'
    } else if (tabKey === 'orthosis') {
      result = 'orthoses'
    } else {
      result = 'physical-therapies'
    }
    return result
  }

  const handleOnInputChange = (searchKey) => {
    setIsLoading(true)
    const url = `${getSelectedUrl()}?name=${searchKey}`
    setSearchQuery(searchKey)

    getRequest(url)
      .then((data) => {
        if (data.data.length > 0) {
          const customizedResults = data.data.map((item) => {
            return {
              ...item,
              label: item.name,
              value: item.name,
            }
          })
          setSearchResults(customizedResults)
        } else {
          setSearchResults([{ id: 'notFound', name: searchKey }])
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const selectedList = (selectedData) => {
    return selectedData?.map((item, index) => {
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
                  onChange={(e) => handleSelectedExtraData(item, 'duration', e)}
                />
              </Col>
              <Col md="5">
                <Form.Select
                  className="form-control form-control-sm"
                  defaultValue={item.unit}
                  onChange={(e) => handleSelectedExtraData(item, 'unit', e)}
                >
                  <option value={'day(s)'}>Day(s)</option>
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
                  onChange={(e) => handleSelectedExtraData(item, 'note', e)}
                />
              </Col>
              <Col md="1">
                <i
                  className="fa fa-times-circle pt-2 cursor-pointer"
                  aria-hidden="true"
                  onClick={() => selectUnSelectAction(item)}
                ></i>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    })
  }

  const allData = (dataList) => {
    return dataList?.map((item, index) => {
      const isSelected = getSelectedData()?.some(
        (data) => data.name === item.name,
      )
      return (
        <ItemWithDeleteIcon
          key={index}
          item={item}
          isSelected={isSelected}
          itemClickAction={selectUnSelectAction}
        />
      )
    })
  }

  return (
    <>
      <Modal
        show={showRehabilitation}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <ModalHeader title={'Rehabilitation'} action={setShowRehabilitation} />
        <Modal.Body>
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={searchQuery}
            options={searchResults}
            placeholder={
              tabKey === 'physicalTherapy' ? 'physical therapy' : tabKey
            }
          />
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="physicalTherapy"
          >
            <Nav variant="pills" className="custom-tab">
              <Row style={{ display: 'contents' }}>
                <Col>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="physicalTherapy"
                      onClick={() => {
                        setTabKey('physicalTherapy')
                        setSearchResults([])
                      }}
                    >
                      Physical Therapy
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="exercise"
                      onClick={() => {
                        setTabKey('exercise')
                        setSearchResults([])
                      }}
                    >
                      Exercise
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="orthosis"
                      onClick={() => {
                        setTabKey('orthosis')
                        setSearchResults([])
                      }}
                    >
                      Orthosis
                    </Nav.Link>
                  </Nav.Item>
                </Col>
              </Row>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="physicalTherapy" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">
                  {allData(physicalTherapyList)}
                </Row>{' '}
                <LoadMore
                  currentPage={therapyPage}
                  totalItem={totalTherapies}
                  perPage={perPage}
                  currentPageAction={setTherapyPage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="exercise" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">
                  {allData(exerciseList)}
                </Row>
                <LoadMore
                  currentPage={exercisePage}
                  totalItem={totalExercises}
                  perPage={perPage}
                  currentPageAction={setExercisePage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="orthosis" className="add-scroll">
                <Row className="complains-area mr-0 ml-0">
                  {allData(orthosisList)}
                </Row>
                <LoadMore
                  currentPage={orthosisPage}
                  totalItem={totalOrthoses}
                  perPage={perPage}
                  currentPageAction={setOrthosisPage}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <hr className="selected-hr" />
          <div className="selected-item-title">
            Selected{' '}
            {tabKey === 'physicalTherapy'
              ? `Physical Therapy`
              : capitalizeFirstLetter(tabKey)}
          </div>
          <div className="selected-item-area">
            {tabKey === 'physicalTherapy' && selectedList(physicalTherapies)}
            {tabKey === 'exercise' && selectedList(exercises)}
            {tabKey === 'orthosis' && selectedList(orthoses)}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default memo(RehabilitationModal)
