import React from 'react'
import { Form, Button } from 'react-bootstrap'

function CommonButtons({
  unitArray,
  clickAction,
  rowName,
  colName,
  indexName,
}) {
  return (
    <div className={`mt-1 common-btn ${indexName}`}>
      {unitArray.map((item, index) => {
        return (
          <Button
            key={index}
            size="sm"
            className="btn-sm-customize"
            variant="outline-secondary"
            onClick={() => clickAction(rowName, colName, indexName, item)}
          >
            {item}
          </Button>
        )
      })}
    </div>
  )
}
export default CommonButtons
