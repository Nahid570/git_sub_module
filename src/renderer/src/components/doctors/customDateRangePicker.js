import React, { Component, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import "bootstrap/dist/css/bootstrap.css";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";

const CustomDateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  console.log("from custom range: ", startDate, endDate);
  // useEffect(()=>{

  // },[]);

  return (
    <DateRangePicker
      onCallback={(start, end, label) => {
        setStartDate(start.format("YYYY-MM-DD"));
        setEndDate(end.format("YYYY-MM-DD"));
      }}
      onApply={(event, picker) => {
        setStartDate(picker.startDate.format("YYYY-MM-DD"));
        setEndDate(picker.endDate.format("YYYY-MM-DD"));
      }}
      initialSettings={{
        startDate: moment().subtract(7, "days"),
        endDate: moment(),
        opens: "left",
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [
            moment().subtract(1, "days"),
            moment().subtract(1, "days"),
          ],
          "Last 7 Days": [moment().subtract(6, "days"), moment()],
          "Last 30 Days": [moment().subtract(29, "days"), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Last Month": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
        },
      }}
    >
      <Button
        type="button"
        variant="contained"
        style={{
          textTransform: "none",
          backgroundColor: "white",
          textAlign: "center",
          border: "1px solid lightgrey",
        }}
        onClick={(e) => {}}
      >
        <i className="far fa-calendar-alt black" />{" "}
        <span className="black">{`${startDate} -- ${endDate}`}</span>
      </Button>
    </DateRangePicker>
  );
};

export default CustomDateRangePicker;
