import React, { memo } from 'react'
import Select from 'react-select'

const SelectCustom = ({
  handleInputChange,
  options,
  onChange,
  components,
  placeholder,
}) => {
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#000',
        cursor: 'pointer',
      }
    },
  }

  return (
    <>
      <Select
        classNamePrefix="Select Type"
        value={""}
        placeholder={placeholder ? `Search ${
          placeholder === "template" ? placeholder : ` / Add a ${placeholder}`
        }` : ''}
        isClearable={true}
        isSearchable={true}
        name="type"
        components={components}
        options={options}
        onInputChange={handleInputChange}
        onChange={onChange}
        styles={colourStyles}
      />
    </>
  )
}

export default  memo(SelectCustom)
