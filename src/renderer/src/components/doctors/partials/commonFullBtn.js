import { memo } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

const CommonFullBtn = ({ btnArr, actionMethod, btnClass, fieldName, val }) => {
  return (
    <>
      {btnArr.map((data, key) => {
        return (
          <Button
            key={key}
            size={'sm'}
            className={btnClass}
            onClick={() => actionMethod(fieldName, data)}
            variant={val === data ? 'primary' : 'outline-secondary'}
          >
            <span>{data}</span>
          </Button>
        )
      })}
    </>
  )
}

export default memo(CommonFullBtn)
