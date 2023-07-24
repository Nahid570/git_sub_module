import { memo, useState, useRef, Fragment } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { getRequest, postRequest } from "../../../utils/axiosRequests";
import FieldTypeBtn from "./fieldTypeBtn";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const BreastExamination = ({ breastExamination, handleOnExaminationData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [commonDataInSearch, setCommonDataInSearch] = useState([]);
  const [commonData, setCommonData] = useState([]);
  const [searchType, setSearchType] = useState("");

  let defaultData = breastExamination || {
    lump: { left: false, right: false, both: false },
    lumpPosition: { uoq: false, loq: false, uiq: false, liq: false },
    size: "",
    sizeUnit: "mm",
    nippleArolaComplex: { left: false, right: false, both: false },
    nippleArolaComplexPosition: {
      reaction: false,
      erosion: false,
      crack: false,
      discoloration: false,
    },
    Others: "",
    axillaryLymphNode: { left: false, right: false, both: false },
    axillaryLymphNodePosition: {
      pectoral: false,
      medical: false,
      lateral: false,
      apical: false,
    },
    number: "",
    numberUnit: "mm",
    isBreastPicture: "",
    note: "",

    margin: [],
    consistency: [],
    localTemperature: [],
    mobility: [],
    overlyingSkin: [],
    nippleOthers: [],
    axillaryOthers: [],
  };

  let selectedData = breastExamination || defaultData;

  const handleData = (rowName, fieldName, val) => {
    switch (rowName) {
      case "lump":
      case "nippleArolaComplex":
      case "axillaryLymphNode":
        selectedData[rowName] = { left: false, right: false, both: false };
        selectedData[rowName][fieldName] = val;
        break;
      case "lumpPosition":
      case "nippleArolaComplexPosition":
      case "axillaryLymphNodePosition":
        selectedData[rowName][fieldName] = val;
        break;
      case "size":
      case "sizeUnit":
      case "margin":
      case "number":
      case "numberUnit":
      case "isBreastPicture":
      case "note":
        selectedData[rowName] = val;
        break;
    }
    // gyneExamination[fieldName] = val
    handleOnExaminationData(selectedData, "breastExamination");
  };

  const clearData = (rowName) => {
    switch (rowName) {
      case "lump":
      case "nippleArolaComplex":
      case "axillaryLymphNode":
        selectedData[rowName] = { left: false, right: false, both: false };
        break;
      case "lumpPosition":
      case "nippleArolaComplexPosition":
      case "axillaryLymphNodePosition":
        selectedData[rowName] = {
          uoq: false,
          loq: false,
          uiq: false,
          liq: false,
        };
        break;
    }
    handleOnExaminationData(selectedData, "breastExamination");
  };

  const typeaheadRef = useRef(null);
  const handleSearchOrNew = (selectedOption, type) => {
    const name = selectedOption[0]?.name;
    if (name && !selectedData[type]?.includes(name)) {
      selectedData[type]?.push(name);
      handleOnExaminationData(selectedData, "breastExamination");
      postRequest("common-data", {
        name: name,
        type: type,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          typeaheadRef.current.clear();
        });
    }
    setCommonDataInSearch([]);
    setSearchQuery("");
  };

  const filterByMargin = () => true;
  const handleSearchOrNewMargin = (selectedOption) => {
    handleSearchOrNew(selectedOption, "margin");
  };
  const filterByConsistency = () => true;
  const handleSearchOrNewConsistency = (selectedOption) => {
    handleSearchOrNew(selectedOption, "consistency");
  };
  const filterByLocalTemperature = () => true;
  const handleSearchOrNewLocalTemperature = (selectedOption) => {
    handleSearchOrNew(selectedOption, "localTemperature");
  };
  const filterByMobility = () => true;
  const handleSearchOrNewMobility = (selectedOption) => {
    handleSearchOrNew(selectedOption, "mobility");
  };
  const filterByOverlyingSkin = () => true;
  const handleSearchOrNewOverlyingSkin = (selectedOption) => {
    handleSearchOrNew(selectedOption, "overlyingSkin");
  };
  const filterByNippleOthers = () => true;
  const handleSearchOrNewNippleOthers = (selectedOption) => {
    handleSearchOrNew(selectedOption, "nippleOthers");
  };
  const filterByAxillaryOthers = () => true;
  const handleSearchOrNewAxillaryOthers = (selectedOption) => {
    handleSearchOrNew(selectedOption, "axillaryOthers");
  };

  const handleSearch = (searchKey, type) => {
    setIsLoading(true);
    const url = `common-data?type=${type}&name=${searchKey}`;
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
          setCommonDataInSearch(customizedResults);
        } else {
          setCommonDataInSearch([{ id: "notFound", name: searchKey }]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const marginSearch = (searchKey) => {
    handleSearch(searchKey, "margin");
  };
  const consistencySearch = (searchKey) => {
    handleSearch(searchKey, "consistency");
  };
  const localTemperatureSearch = (searchKey) => {
    handleSearch(searchKey, "localTemperature");
  };
  const mobilitySearch = (searchKey) => {
    handleSearch(searchKey, "mobility");
  };
  const overlyingSkinSearch = (searchKey) => {
    handleSearch(searchKey, "overlyingSkin");
  };
  const nippleOthersSearch = (searchKey) => {
    handleSearch(searchKey, "nippleOthers");
  };
  const axillaryOthersSearch = (searchKey) => {
    handleSearch(searchKey, "axillaryOthers");
  };

  return (
    <div className="gyne-examination breast-examination">
      <div className="title-gyne-examination">LUMP:</div>
      <hr className="hr" />
      <Row className="align-items-center">
        <Col md={2}></Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`lump-left`}
            label={`Left`}
            checked={selectedData?.lump?.left == true}
            onChange={(e) => handleData("lump", "left", e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`lump-right`}
            label={`Right`}
            checked={selectedData?.lump?.right === true}
            onChange={(e) => handleData("lump", "right", e.target.checked)}
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`lump-both`}
            label={`Both`}
            checked={selectedData?.lump?.both === true}
            onChange={(e) => handleData("lump", "both", e.target.checked)}
          />
        </Col>
        <Col md={3}>
          <Button size="sm" variant="light" onClick={() => clearData("lump")}>
            Clear
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={2}>Position: </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`uoq`}
            label={`UOQ`}
            checked={selectedData?.lumpPosition?.uoq === true}
            onChange={(e) =>
              handleData("lumpPosition", "uoq", e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`loq`}
            label={`LOQ`}
            checked={selectedData?.lumpPosition?.loq === true}
            onChange={(e) =>
              handleData("lumpPosition", "loq", e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`uiq`}
            label={`UIQ`}
            checked={selectedData?.lumpPosition?.uiq === true}
            onChange={(e) =>
              handleData("lumpPosition", "uiq", e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`liq`}
            label={`LIQ`}
            checked={selectedData?.lumpPosition?.liq === true}
            onChange={(e) =>
              handleData("lumpPosition", "liq", e.target.checked)
            }
          />
        </Col>
        <Col md={1}>
          <Button
            size="sm"
            variant="light"
            onClick={() => clearData("lumpPosition")}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={2}>Size: </Col>
        <Col md={3} className="pr-0">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Add size"
            defaultValue={selectedData?.size}
            onChange={(e) => handleData("size", "", e.target.value)}
          />
        </Col>
        <Col>
          <FieldTypeBtn
            btnArr={["CM", "MM"]}
            fieldName={"sizeUnit"}
            selectedItem={selectedData?.sizeUnit}
            actionMethod={handleData}
          />
        </Col>
        <Col md={1}>Margin: </Col>
        <Col md={4}>
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByMargin}
            id="async-margin"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add margin here ..."
            onChange={handleSearchOrNewMargin}
            minLength={1}
            onSearch={marginSearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.margin?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={2}>Consistency: </Col>
        <Col md={4}>
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByConsistency}
            id="async-consistency"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add consistency here ..."
            onChange={handleSearchOrNewConsistency}
            minLength={1}
            onSearch={consistencySearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.consistency?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })}
        </Col>
        <Col md={2} className="pr-0" style={{ fontSize: "13px" }}>
          Local Temperature:
        </Col>
        <Col md={4}>
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByLocalTemperature}
            id="async-temp"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add local temperature here ..."
            onChange={handleSearchOrNewLocalTemperature}
            minLength={1}
            onSearch={localTemperatureSearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.localTemperature?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={2}>Mobility: </Col>
        <Col md={4}>
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByMobility}
            id="async-temp"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add mobility here ..."
            onChange={handleSearchOrNewMobility}
            minLength={1}
            onSearch={mobilitySearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.mobility?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })}
        </Col>
        <Col md={2} className="pr-0">
          Overlying Skin:
        </Col>
        <Col md={4}>
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByOverlyingSkin}
            id="async-temp"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add overlying skin here ..."
            onChange={handleSearchOrNewOverlyingSkin}
            minLength={1}
            onSearch={overlyingSkinSearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.overlyingSkin?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })}
        </Col>
      </Row>

      <div className="title-gyne-examination">Nipple Arola Complex:</div>
      <hr className="hr" />
      <Row className="align-items-center">
        <Col md={2}></Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`nipple-left`}
            label={`Left`}
            checked={selectedData?.nippleArolaComplex?.left === true}
            onChange={(e) =>
              handleData("nippleArolaComplex", "left", e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`nipple-right`}
            label={`Right`}
            checked={selectedData?.nippleArolaComplex?.right === true}
            onChange={(e) =>
              handleData("nippleArolaComplex", "right", e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`nipple-both`}
            label={`Both`}
            checked={selectedData?.nippleArolaComplex?.both === true}
            onChange={(e) =>
              handleData("nippleArolaComplex", "both", e.target.checked)
            }
          />
        </Col>
        <Col md={3}>
          <Button
            size="sm"
            variant="light"
            onClick={() => clearData("nippleArolaComplex")}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={2}></Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`reaction`}
            label={`Reaction`}
            checked={
              selectedData?.nippleArolaComplexPosition?.reaction === true
            }
            onChange={(e) =>
              handleData(
                "nippleArolaComplexPosition",
                "reaction",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`erosion`}
            label={`Erosion`}
            checked={selectedData?.nippleArolaComplexPosition?.erosion === true}
            onChange={(e) =>
              handleData(
                "nippleArolaComplexPosition",
                "erosion",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`crack`}
            label={`Crack`}
            checked={selectedData?.nippleArolaComplexPosition?.crack === true}
            onChange={(e) =>
              handleData(
                "nippleArolaComplexPosition",
                "crack",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`discoloration`}
            label={`Discoloration`}
            checked={
              selectedData?.nippleArolaComplexPosition?.discoloration === true
            }
            onChange={(e) =>
              handleData(
                "nippleArolaComplexPosition",
                "discoloration",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Button
            size="sm"
            variant="light"
            onClick={() => clearData("nippleArolaComplexPosition")}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <Row>
        {/* <Col md={2}></Col> */}
        <Col md={2}>Others:</Col>
        <Col md={4}>
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByNippleOthers}
            id="async-temp"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add others here ..."
            onChange={handleSearchOrNewNippleOthers}
            minLength={1}
            onSearch={nippleOthersSearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.nippleOthers?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })}
        </Col>
      </Row>
      <div className="title-gyne-examination">Axillary Lymph Node:</div>
      <hr className="hr" />
      <Row className="align-items-center">
        <Col md={2}></Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`ax-left`}
            label={`Left`}
            checked={selectedData?.axillaryLymphNode?.left === true}
            onChange={(e) =>
              handleData("axillaryLymphNode", "left", e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`ax-right`}
            label={`Right`}
            checked={selectedData?.axillaryLymphNode?.right === true}
            onChange={(e) =>
              handleData("axillaryLymphNode", "right", e.target.checked)
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`radio`}
            id={`ax-both`}
            label={`Both`}
            checked={selectedData?.axillaryLymphNode?.both === true}
            onChange={(e) =>
              handleData("axillaryLymphNode", "both", e.target.checked)
            }
          />
        </Col>
        <Col md={3}>
          <Button
            size="sm"
            variant="light"
            onClick={() => clearData("axillaryLymphNode")}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={2}></Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`pectoral`}
            label={`Pectoral`}
            checked={selectedData?.axillaryLymphNodePosition?.pectoral === true}
            onChange={(e) =>
              handleData(
                "axillaryLymphNodePosition",
                "pectoral",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`medical`}
            label={`Medical`}
            checked={selectedData?.axillaryLymphNodePosition?.medical === true}
            onChange={(e) =>
              handleData(
                "axillaryLymphNodePosition",
                "medical",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`lateral`}
            label={`Lateral`}
            checked={selectedData?.axillaryLymphNodePosition?.lateral === true}
            onChange={(e) =>
              handleData(
                "axillaryLymphNodePosition",
                "lateral",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Form.Check
            type={`checkbox`}
            id={`apical`}
            label={`Apical`}
            checked={selectedData?.axillaryLymphNodePosition?.apical === true}
            onChange={(e) =>
              handleData(
                "axillaryLymphNodePosition",
                "apical",
                e.target.checked
              )
            }
          />
        </Col>
        <Col md={2}>
          <Button
            size="sm"
            variant="light"
            onClick={() => clearData("axillaryLymphNodePosition")}
          >
            Clear
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={2}>Number:</Col>
        <Col md={4} className="pr-0">
          <Form.Control
            size="sm"
            placeholder="Add note"
            defaultValue={selectedData?.number}
            onChange={(e) => handleData("number", "", e.target.value)}
          />
        </Col>
        <Col>
          <FieldTypeBtn
            btnArr={["CM", "MM"]}
            fieldName={"numberUnit"}
            selectedItem={selectedData?.numberUnit}
            actionMethod={handleData}
          />
        </Col>
      </Row>
      <Row>
        <Col md={2}>Others:</Col>
        <Col md={4} className="pr-0">
          <AsyncTypeahead
            labelKey="name"
            ref={typeaheadRef}
            filterBy={filterByAxillaryOthers}
            id="async-temp"
            //isLoading={isLoading}
            options={commonDataInSearch}
            placeholder="Search / Add others here ..."
            onChange={handleSearchOrNewAxillaryOthers}
            minLength={1}
            onSearch={axillaryOthersSearch}
            size="sm"
            renderMenuItemChildren={(option, props) => (
              <Fragment>
                {option.id !== "notFound" ? (
                  option?.name
                ) : (
                  <span>
                    <span className="float-left">{searchQuery} </span>
                    <span className="float-right">
                      <i
                        className="fa fa-plus-circle text-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </span>
                )}
              </Fragment>
            )}
          />
          {selectedData?.axillaryOthers?.map((item, key) => {
            return <span key={key}>{item}, </span>;
          })}
        </Col>
      </Row>
      <Row>
        <Col md={2}></Col>
        <Col>
          <Form.Check
            type={`checkbox`}
            id={`show-picture`}
            label={`Show Breast Picture`}
            checked={selectedData?.isBreastPicture === true}
            onChange={(e) =>
              handleData("isBreastPicture", "", e.target.checked)
            }
          />
        </Col>
      </Row>
      <Row>
        <Col md={2}>Note:</Col>
        <Col sm="6">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Add note"
            defaultValue={selectedData?.note}
            onChange={(e) => handleData("note", "", e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(BreastExamination);
