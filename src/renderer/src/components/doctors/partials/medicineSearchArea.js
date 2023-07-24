import { Row, Col } from 'react-bootstrap'
import SelectCustom from './selectCustom'
import { components } from 'react-select'
import { countOccurrencesOf } from '../../../utils/helpers'

function MedicineSearchArea({
  handleOnInputChange,
  onChange,
  options,
  searchQuery,
  placeholder,
}) {
  const Option = (props) => (
    <components.Option {...props}>
      <span className="medicine-type">{props.data.type}</span>
      <span
        className="medicine-name"
        title={props.data.label + ' - ' + props.data.strength}
      >
        {props.data.label +
          (props.data.strength &&
          countOccurrencesOf(props.data.strength, '+') <= 1
            ? ' - (' + props.data.strength + ')'
            : '')}
      </span>
      <span className="medicine-company">{props.data.companyName}</span>
    </components.Option>
  )

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">
          {options.length === 1 && options[0].id === 'notFound' ? (
            <span onClick={() => onChange(options[0])}>
              <span
                className="float-left"
                style={{
                  paddingBottom: '6px',
                  cursor: 'pointer',
                  width: '90%',
                  color: 'black',
                }}
              >
                {searchQuery}{' '}
              </span>
              <span className="float-right">
                <i
                  className="fa fa-plus-circle text-right"
                  aria-hidden="true"
                ></i>
              </span>
            </span>
          ) : (
            'No Data'
          )}
        </span>
      </components.NoOptionsMessage>
    )
  }

  return (
    <Row>
      <Col style={{ position: 'relative' }}>
        <SelectCustom
          handleInputChange={handleOnInputChange}
          onChange={onChange}
          components={{ Option, NoOptionsMessage }}
          options={options}
          placeholder={placeholder}
        />
        <svg width="14" height="14" className="search-icon" viewBox="0 0 20 20">
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
  )
}

export default MedicineSearchArea
