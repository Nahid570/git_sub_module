import { Row, Col } from "react-bootstrap";
import SelectCustom from "../partials/selectCustom";
import { components } from "react-select";

function SearchArea({
  handleOnInputChange,
  handleSearchOrNew,
  options,
  searchQuery,
  placeholder,
}) {
  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">
          {options?.length === 1 && options[0].id === "notFound" ? (
            <span onClick={() => handleSearchOrNew(options[0])}>
              <span
                className="float-left"
                style={{
                  paddingBottom: "6px",
                  cursor: "pointer",
                  width: "90%",
                }}
              >
                {searchQuery}{" "}
              </span>
              <span className="float-right">
                <i
                  className="fa fa-plus-circle text-right"
                  aria-hidden="true"
                ></i>
              </span>
            </span>
          ) : (
            "No Data"
          )}
        </span>
      </components.NoOptionsMessage>
    );
  };

  return (
    <Row>
      <Col style={{ position: "relative" }}>
        <SelectCustom
          handleInputChange={handleOnInputChange}
          onChange={handleSearchOrNew}
          components={{ NoOptionsMessage }}
          options={options}
          placeholder={placeholder}
        />
        <svg width="16" height="16" className="search-icon" viewBox="0 0 20 20">
          <path
            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
            stroke="currentColor"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </Col>
    </Row>
  );
}

export default SearchArea;
