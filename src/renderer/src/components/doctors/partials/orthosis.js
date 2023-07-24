// import React, { useState, useEffect } from 'react'
// const Orthosis = () => {
//   const [orthosisList, setOrthosisList] = useState([])

//   useEffect(() => {
//     getOrthoses()
//   }, [])

//   useEffect(() => {
//     getOrthoses()
//   }, [currentPage])

//   let allOrthosis = orthosisList?.map((item, index) => {
//     let isSelected = orthoses?.some((data) => data.name === item.name)
//     console.log(isSelected, 'isSelectedisSelected')
//     isSelected = isSelected ? true : false

//     return (
//       <ItemWithDeleteIcon
//         key={index}
//         item={item}
//         isSelected={isSelected}
//         itemClickAction={selectAction}
//         removeClickAction={deleteAction}
//       />
//     )
//   })

//   const { isLoading: isOrthosesLoading, refetch: getOrthoses } = useGetRequest(
//     'getOrthoses',
//     `orthoses?page=${currentPage}&perPage=${perPage}`,
//     (data) => {
//       if (currentPage > 1) {
//         setOrthosisList([...orthosisList, ...data.data])
//       } else {
//         setOrthosisList(data.data)
//         setTotalItem(data.total)
//       }
//     },
//     (e) => {
//       console.log(e)
//     },
//   )

//   return (
//     <>
//       <Row className="complains-area mr-0 ml-0">{allOrthosis}</Row>
//     </>
//   )
// }

// export default Orthosis
