import { memo, useState } from 'react';
import { Accordion, Row, Col, Form, Button } from 'react-bootstrap';
import CommonButtons from './commonButtons';
import { clearSystemicData, clearLungBase } from '../../../utils/helpers';

const SystemicExamination = ({
  selectedOnExamination,
  handleOnExaminationData,
}) => {
  let { systemicExamination } = selectedOnExamination;
  const [s1Status, setS1Status] = useState(false);
  const [s2Status, setS2Status] = useState(false);
  const heartSoundArr = ['Normal', 'Loud', 'Tapping', 'Other'];

  let defaultData = {
    jvp: { status: '', note: '' },
    lph: { status: '', note: '' },
    palpableP2: { status: '', note: '' },
    murmur: { systolic: false, diastolic: false, note: '' },
    lungBase: {
      crepitation: false,
      raised: false,
      rhonchi: false,
      normal: false,
      note: '',
    },
    heartSound: { s1: '', s2: '', note: '' },
    apexBeatNote: '',
    rsNote: '',
    gsNote: '',
    cnsNote: '',
    showCoronary: false,
    showAngiogram: false,
  };

  let selectedData = systemicExamination || defaultData;
  const handleSystemicData = (rowName, filedName, val, valForSystemicData) => {
    switch (rowName) {
      case 'jvp':
      case 'lph':
      case 'palpableP2':
        selectedData[rowName][filedName] = val;
        break;
      case 'lungBase':
        if (filedName !== 'note') {
          selectedData[rowName] = clearLungBase();
        }
        selectedData[rowName][filedName] = val;
        break;
      case 'murmur':
        if (filedName === 'systolic') {
          selectedData[rowName]['diastolic'] = false;
          selectedData[rowName][filedName] = val;
        } else if (filedName === 'diastolic') {
          selectedData[rowName]['systolic'] = false;
          selectedData[rowName][filedName] = val;
        } else {
          selectedData[rowName][filedName] = val;
        }
        break;
      case 'heartSound':
        selectedData[rowName][filedName] = valForSystemicData;
        break;
      case 'apexBeatNote':
      case 'rsNote':
      case 'gsNote':
      case 'cnsNote':
        selectedData[rowName] = val;
        break;
      case 'showCoronary':
      case 'showAngiogram':
        selectedData[rowName] = val;
    }
    handleOnExaminationData(selectedData, 'systemicExamination');
    clearS1S2Btn();
  };

  const clearData = (itemName) => {
    let result = clearSystemicData(selectedData, itemName);
    handleOnExaminationData(result, 'systemicExamination');
  };

  const clearS1S2Btn = () => {
    setS1Status(false);
    setS2Status(false);
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>CVS</Accordion.Header>
          <Accordion.Body className="jvp-area">
            <Row className="mt-2">
              <Col md="2" className="row-title">
                JVP:
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`jvpRaised`}
                  className="mr-2"
                  label={`Raised`}
                  checked={selectedData?.jvp?.status === 'raised'}
                  onChange={(e) =>
                    handleSystemicData('jvp', 'status', 'raised')
                  }
                />
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`jvpNormal`}
                  label={`Normal`}
                  checked={selectedData?.jvp?.status === 'normal'}
                  onChange={(e) =>
                    handleSystemicData('jvp', 'status', 'normal')
                  }
                />
              </Col>
              <Col md={1} className="pl-0">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => clearData('jvp')}
                >
                  Clear
                </Button>
              </Col>
              <Col md="5">
                <Form.Control
                  size="sm"
                  className="w-60"
                  as="textarea"
                  rows={1}
                  placeholder="add note"
                  value={selectedData?.jvp?.note}
                  onChange={(e) =>
                    handleSystemicData('jvp', 'note', e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="mt-1 mb-2">
              <Col className="csv-sub-title">Precordium</Col>
            </Row>
            <Row className="mt-2">
              <Col md="2" className="row-title">
                Apex Beat:
              </Col>
              <Col md="10">
                <Form.Control
                  size="sm"
                  className="w-60"
                  as="textarea"
                  rows={1}
                  value={selectedData?.apexBeatNote}
                  onChange={(e) =>
                    handleSystemicData('apexBeatNote', '', e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md="2" className="row-title">
                LPH:
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`lphRaised`}
                  className="mr-2"
                  label={`Raised`}
                  checked={selectedData?.lph?.status === 'raised'}
                  onChange={(e) =>
                    handleSystemicData('lph', 'status', 'raised')
                  }
                />
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`lphLph`}
                  label={`Normal`}
                  checked={selectedData?.lph?.status === 'normal'}
                  onChange={(e) =>
                    handleSystemicData('lph', 'status', 'normal')
                  }
                />
              </Col>
              <Col md={1} className="pl-0">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => clearData('lph')}
                >
                  Clear
                </Button>
              </Col>
              <Col md="5">
                <Form.Control
                  size="sm"
                  className="w-60"
                  as="textarea"
                  rows={1}
                  placeholder="add note"
                  value={selectedData?.lph?.note}
                  onChange={(e) =>
                    handleSystemicData('lph', 'note', e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md="2" className="row-title">
                Palpable P2:
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`palpableP2Raised`}
                  className="mr-2"
                  label={`Raised`}
                  checked={selectedData?.palpableP2?.status === 'raised'}
                  onChange={(e) =>
                    handleSystemicData('palpableP2', 'status', 'raised')
                  }
                />
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`palpableP2Normal`}
                  label={`Normal`}
                  checked={selectedData?.palpableP2?.status === 'normal'}
                  onChange={(e) =>
                    handleSystemicData('palpableP2', 'status', 'normal')
                  }
                />
              </Col>
              <Col md={1} className="pl-0">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => clearData('palpableP2')}
                >
                  Clear
                </Button>
              </Col>
              <Col md="5">
                <Form.Control
                  size="sm"
                  className="w-60"
                  as="textarea"
                  rows={1}
                  placeholder="add note"
                  value={selectedData?.palpableP2?.note}
                  onChange={(e) =>
                    handleSystemicData('palpableP2', 'note', e.target.value)
                  }
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col className="csv-sub-title">Heart Sound</Col>
            </Row>
            <Row className="mb-2">
              <Col md={2}></Col>
              <Col md={2} className="font-weight-bold text-center">
                <div>S1</div>
                <Button
                  size="sm"
                  className="btn-sm-customize"
                  variant="outline-secondary"
                  style={{ padding: '0.29rem 0.6rem' }}
                  onClick={() => {
                    setS2Status(false);
                    setS1Status(true);
                  }}
                >
                  {selectedData?.heartSound?.s1 ? (
                    <span>{selectedData?.heartSound?.s1}</span>
                  ) : (
                    <i
                      className="fa fa-sort"
                      style={{ fontSize: '18px' }}
                      aria-hidden="true"
                    ></i>
                  )}
                </Button>
                {s1Status && (
                  <CommonButtons
                    unitArray={heartSoundArr}
                    clickAction={handleSystemicData}
                    rowName="heartSound"
                    colName="s1"
                    indexName=""
                  ></CommonButtons>
                )}
              </Col>
              <Col md={2} className="font-weight-bold text-center">
                <div>S2</div>
                <Button
                  size="sm"
                  className="btn-sm-customize"
                  variant="outline-secondary"
                  style={{ padding: '0.29rem 0.6rem' }}
                  onClick={() => {
                    setS1Status(false);
                    setS2Status(true);
                  }}
                >
                  {selectedData?.heartSound?.s2 ? (
                    <span>{selectedData?.heartSound?.s2}</span>
                  ) : (
                    <i
                      className="fa fa-sort"
                      style={{ fontSize: '18px' }}
                      aria-hidden="true"
                    ></i>
                  )}
                </Button>
                {s2Status && (
                  <CommonButtons
                    unitArray={heartSoundArr}
                    clickAction={handleSystemicData}
                    rowName="heartSound"
                    colName="s2"
                    indexName=""
                  ></CommonButtons>
                )}
              </Col>
              <Col md={1} className="pl-0">
                <Button
                  size="sm"
                  variant="light"
                  className="mt-4"
                  onClick={() => clearData('heartSound')}
                >
                  Clear
                </Button>
              </Col>
              <Col md="5" className="pt-4 text-center">
                <Form.Control
                  size="sm"
                  className="w-60"
                  as="textarea"
                  rows={1}
                  placeholder="add note"
                  value={selectedData?.heartSound?.note}
                  onChange={(e) =>
                    handleSystemicData('heartSound', 'note', '', e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="mt-3 mb-2">
              <Col md="2" className="row-title">
                Murmur:
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`systolic`}
                  className="mr-2"
                  label={`Systolic`}
                  checked={selectedData?.murmur?.systolic === true}
                  onChange={(e) =>
                    handleSystemicData('murmur', 'systolic', e.target.checked)
                  }
                />
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`diastolic`}
                  label={`Diastolic`}
                  checked={selectedData?.murmur?.diastolic === true}
                  onChange={(e) =>
                    handleSystemicData('murmur', 'diastolic', e.target.checked)
                  }
                />
              </Col>
              <Col md={1} className="pl-0">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => clearData('murmur')}
                >
                  Clear
                </Button>
              </Col>
              <Col md="5">
                <Form.Control
                  size="sm"
                  className="w-60"
                  as="textarea"
                  rows={1}
                  placeholder="add note"
                  value={selectedData?.murmur?.note}
                  onChange={(e) =>
                    handleSystemicData('murmur', 'note', e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row className="mt-2 mb-2">
              <Col md="2" className="row-title">
                Lung Base:
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`lungBaseRaised`}
                  className="mr-2"
                  label={`Raised`}
                  checked={selectedData?.lungBase?.raised === true}
                  onChange={(e) =>
                    handleSystemicData('lungBase', 'raised', e.target.checked)
                  }
                />
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`crepitation`}
                  label={`Crepitation`}
                  checked={selectedData?.lungBase?.crepitation === true}
                  onChange={(e) =>
                    handleSystemicData(
                      'lungBase',
                      'crepitation',
                      e.target.checked,
                    )
                  }
                />
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`rhonchi`}
                  label={`Rhonchi`}
                  checked={selectedData?.lungBase?.rhonchi === true}
                  onChange={(e) =>
                    handleSystemicData('lungBase', 'rhonchi', e.target.checked)
                  }
                />
              </Col>
              <Col md="2">
                <Form.Check
                  type={`radio`}
                  id={`lungBaseNormal`}
                  label={`Normal`}
                  checked={selectedData?.lungBase?.normal === true}
                  onChange={(e) =>
                    handleSystemicData('lungBase', 'normal', e.target.checked)
                  }
                />
              </Col>
              <Col md={1} className="pl-0">
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => clearData('lungBase')}
                >
                  Clear
                </Button>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={2}></Col>
              <Col>
                <Form.Control
                  size="sm"
                  className="w-60"
                  as="textarea"
                  rows={2}
                  placeholder="add note"
                  value={selectedData?.lungBase?.note}
                  onChange={(e) =>
                    handleSystemicData('lungBase', 'note', e.target.value)
                  }
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>R/S</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="add note"
                  defaultValue={selectedData?.rsNote}
                  onChange={(e) =>
                    handleSystemicData('rsNote', '', e.target.value)
                  }
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>G/S</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="add note"
                  defaultValue={selectedData?.gsNote}
                  onChange={(e) =>
                    handleSystemicData('gsNote', '', e.target.value)
                  }
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>CNS</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="add note"
                  defaultValue={selectedData?.cnsNote}
                  onChange={(e) =>
                    handleSystemicData('cnsNote', '', e.target.value)
                  }
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Row className="mt-2 ml-1">
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`show_coronary`}
            style={{ fontSize: '15px' }}
            label={`Show coronary artery map picture`}
            checked={selectedData?.showCoronary === true}
            onChange={(e) =>
              handleSystemicData('showCoronary', '', e.target.checked)
            }
          />
        </Col>
      </Row>
      <Row className="mt-2 pb-3 ml-1">
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`show_angiogram`}
            style={{ fontSize: '15px' }}
            label={`Show angiogram picture`}
            checked={selectedData?.showAngiogram === true}
            onChange={(e) =>
              handleSystemicData('showAngiogram', '', e.target.checked)
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default memo(SystemicExamination);
