import React from 'react';

function LoadMore({ currentPage, totalItem, perPage, currentPageAction  }) {
    console.log(currentPage, totalItem, perPage)
    return (
        <>
            {currentPage < parseInt(totalItem / perPage) + 1 && (
                <div className="cursor-pointer float-right" onClick={() => currentPageAction(currentPage + 1)}>
                    <i className="fas fa-angle-double-down" style={{fontSize: "19px",paddingRight: "13px", color: "#0561b7" }}></i>
                </div>
            )}
        </>
    )
}
export default LoadMore; 