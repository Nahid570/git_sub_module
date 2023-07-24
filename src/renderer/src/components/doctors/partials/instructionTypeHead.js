import { Fragment, useRef } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { postRequest } from '../../../utils/axiosRequests';

const InstructionTypeHead = ({
  index,
  instructions,
  item,
  detailIndex,
  setInstructions,
  fieldUpdateWithValue,
}) => {
  let typeaheadRef = useRef(null);

  const handleInstructions = (selectedOption) => {
    const selectedData = selectedOption[0].name;
    if (instructions.some((instruction) => instruction.name === selectedData)) {
      if (
        !item?.itemDetails[detailIndex]?.instructions.some(
          (instruction) => instruction.name === selectedData,
        )
      ) {
        fieldUpdateWithValue('instructions', selectedData);
      }
    } else {
      postRequest('instructions', { name: selectedData })
        .then((data) => {
          fieldUpdateWithValue('instructions', selectedData);
          setInstructions([...instructions, data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    typeaheadRef?.current?.clear();
  };

  return (
    <Typeahead
      style={{ width: '90%', position: 'static' }}
      allowNew
      labelKey="name"
      key={index}
      ref={typeaheadRef}
      id="custom-selections-example"
      newSelectionPrefix="Click to add new: "
      options={instructions}
      placeholder="Search / Add medicine remarks here ..."
      onChange={handleInstructions}
      size="sm"
      dropup
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <span>{option.name}</span>
        </Fragment>
      )}
    />
  );
};

export default InstructionTypeHead;
