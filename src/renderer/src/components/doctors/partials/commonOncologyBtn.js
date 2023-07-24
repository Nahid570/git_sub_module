import { memo } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

const CommonOncologyBtn = ({
  btnArr,
  actionMethod,
  btnClass,
  fieldName,
  val,
}) => {
  return (
    <ButtonGroup
      className={`oncology-btn-group mb-1 ${btnClass}`}
      aria-label="Basic example"
    >
      {btnArr.map((btn, key) => {
        return (
          <Button
            key={key}
            size={'sm'}
            className={btnClass}
            onClick={() => actionMethod(fieldName, key)}
            variant={val === key ? 'primary' : 'outline-secondary'}
          >
            <span>{btn}</span>
            <span>{key}</span>
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export default memo(CommonOncologyBtn)
