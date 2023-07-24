import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../../components/doctors/partials/Header";
import profileImg from "../../img/profile.svg";
import DoctorLayout from "../../layouts/doctor.layout";
import { Row, Col } from "react-bootstrap";
import CustomDateRangePicker from "../../components/doctors/customDateRangePicker";
import ReactGraph from "../../components/doctors/reactGraph";
import ReactPieChart from "../../components/doctors/reactPieChart";
import { useGetRequest } from "../../hooks/useGetRequest";

function Home() {
  const [startDate, setStartDate] = useState(
    new Date(moment().subtract(7, "days")).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [graphData, setGraphData] = useState([
    {
      name: moment().format("DD-MM-YY"),
      value: 0,
    },
  ]);
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [appointmentsYesterday, setAppointmentsYesterday] = useState(0);
  const [appointmentsLast7Days, setAppointmentsLast7Days] = useState(0);
  const [appointmentsLast30Days, setAppointmentsLast30Days] = useState(0);
  const [totalPatient, setTotalPatient] = useState(0);
  const [genderWiseData, setGenderWiseData] = useState([
    { name: "male", value: 0 },
    { name: "female", value: 0 },
    { name: "others", value: 0 },
  ]);
  const [ageWiseData, setAgeWiseData] = useState([
    { name: "0-15", value: 0 },
    { name: "15-30", value: 0 },
    { name: "30-45", value: 0 },
    { name: "45-60", value: 0 },
    { name: ">60", value: 0 },
  ]);

  const calculateDays = () => {
    const start = moment(startDate);
    const end = moment(endDate);
    const diffDays = end.diff(start, "days");

    return diffDays;
  };

  const { isLoading: isReportDataLoading, refetch: reportDataRefetch } =
    useGetRequest(
      "getReports",
      `doctors/reports?startDate=${startDate}&endDate=${endDate}`,
      (data) => {
        console.log("reportData: ", data);
        setGraphData(data.chartData.graphData);
        setGenderWiseData(data.chartData.genderData);
        setAgeWiseData(data.chartData.ageData);
        setAppointmentsToday(data.appointmentsToday);
        setAppointmentsYesterday(data.appointmentsYesterday);
        setAppointmentsLast7Days(data.appointmentsLast7Days);
        setAppointmentsLast30Days(data.appointmentsLast30Days);
        setTotalPatient(data.totalPatient);
      },
      (e) => {
        console.log("errormessage: ", e.message);
      }
    );

  useEffect(() => {
    if (startDate && endDate) {
      reportDataRefetch();
    }
  }, [startDate, endDate]);

  // const graphData = [
  //   {
  //     name: "31-01-2023",
  //     value: 2400,
  //   },
  //   {
  //     name: "30-01-2023",
  //     value: 1398,
  //   },
  //   {
  //     name: "29-01-2023",
  //     value: 9800,
  //   },
  //   {
  //     name: "28-01-2023",
  //     value: 3908,
  //   },
  //   {
  //     name: "27-01-2023",
  //     value: 4800,
  //   },
  //   {
  //     name: "26-01-2023",
  //     value: 3800,
  //   },
  //   {
  //     name: "25-01-2023",
  //     value: 4300,
  //   },
  //   {
  //     name: "24-01-2023",
  //     value: 4300,
  //   },
  //   {
  //     name: "23-01-2023",
  //     value: 4300,
  //   },
  //   {
  //     name: "22-01-2023",
  //     value: 4300,
  //   },
  // ];

  // const genderWiseData = [
  //   { name: "male", value: 400 },
  //   { name: "female", value: 350 },
  //   { name: "others", value: 50 },
  // ];

  // const ageWiseData = [
  //   { name: "0-15", value: 200 },
  //   { name: "15-30", value: 250 },
  //   { name: "30-45", value: 280 },
  //   { name: "45-60", value: 180 },
  //   { name: ">60", value: 70 },
  // ];

  // const demoGraphicData = [
  //   { name: "urban", value: 400 },
  //   { name: "semi-urban", value: 300 },
  //   { name: "rural", value: 350 },
  //   { name: "n/a", value: 50 },
  // ];

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Row>
          <div className="col-xl-12 col-md-12 col-lg-12">
            <div className="card shadow mb-4 card-content">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Reports</h6>
              </div>
              {isReportDataLoading && <p className="center mt-5">loading...</p>}
              {!isReportDataLoading && (
                <div className="card-body appointment-card-body">
                  <Row>
                    <Col md={2} className="center">
                      <div className="statistics-block color-today">
                        <Row>
                          <Col md={6}>
                            <i className="far fa-calendar-alt fa-5x stat-icon"></i>
                          </Col>
                          <Col md={6}>
                            <span className="stat-number">
                              {appointmentsToday}
                            </span>
                            <span className="stat-time">Today</span>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md={2} className="center">
                      <div className="statistics-block color-yesterday">
                        <Row>
                          <Col md={6}>
                            <i className="far fa-calendar-alt fa-5x stat-icon"></i>
                          </Col>
                          <Col md={6}>
                            <span className="stat-number">
                              {appointmentsYesterday}
                            </span>
                            <span className="stat-time">Yesterday</span>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md={2} className="center">
                      <div className="statistics-block color-last-7-days">
                        <Row>
                          <Col md={6}>
                            <i className="far fa-calendar-alt fa-5x stat-icon"></i>
                          </Col>
                          <Col md={6}>
                            <span className="stat-number">
                              {appointmentsLast7Days}
                            </span>
                            <span className="stat-time">Last 7 days</span>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md={2} className="center">
                      <div className="statistics-block color-last-30-days">
                        <Row>
                          <Col md={5}>
                            <i className="far fa-calendar-alt fa-5x stat-icon"></i>
                          </Col>
                          <Col md={7}>
                            <span className="stat-number">
                              {appointmentsLast30Days}
                            </span>
                            <span className="stat-time">Last 30 days</span>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md={4} className="center">
                      <div className="statistics-block color-last-total-patient">
                        <Row>
                          <Col md={3}>
                            <i className="fa fa-wheelchair fa-5x stat-icon"></i>
                          </Col>
                          <Col></Col>
                          <Col md={4}>
                            <span className="stat-number">{totalPatient}</span>
                            <span className="stat-time">Total Patients</span>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <hr style={{ marginTop: "1rem" }} />

                  <Row className="ml-2 black">
                    <Col md={10}>
                      <h5 className="pt-1">
                        Statistics for last {calculateDays()} Days
                      </h5>
                    </Col>
                    <Col md={2}>
                      <CustomDateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                      />
                    </Col>
                  </Row>

                  <hr style={{ marginTop: "1rem" }} />

                  <Row className="black">
                    <Col md={6}>
                      <div>
                        <ReactGraph data={graphData} />
                      </div>
                    </Col>
                    <Col md={2} sm={6} className="mt-3">
                      <div className="pie-chart-box">
                        <h6 className="header">Gender Distribution</h6>
                        <ReactPieChart data={genderWiseData} />
                        <div className="horizontal-bar light-purple"></div>
                        <span>Male</span>
                        <div className="horizontal-bar light-green"></div>
                        <span>Female</span>
                        <div className="horizontal-bar dark-purple"></div>
                        <span>Others</span>
                      </div>
                    </Col>
                    <Col md={2} sm={6} className="mt-3">
                      <div className="pie-chart-box">
                        <h6 className="header">Age Distribution</h6>
                        <ReactPieChart data={ageWiseData} />
                        <div className="horizontal-bar light-purple"></div>
                        <span>0-15</span>
                        <div className="horizontal-bar light-green"></div>
                        <span>15-30</span>
                        <div className="horizontal-bar dark-purple"></div>
                        <span>30-45</span>
                        <div className="horizontal-bar light-blue"></div>
                        <span>45-60</span>
                        <div className="horizontal-bar light-red"></div>
                        <span> &gt; 60</span>
                      </div>
                    </Col>
                    {/* <Col md={2} sm={6} className="mt-3">
                      <div className="pie-chart-box">
                        <h6 className="header">Demography Distribution</h6>
                        <ReactPieChart data={demoGraphicData} />
                        <div className="horizontal-bar light-purple"></div>
                        <span>Urban</span>
                        <div className="horizontal-bar light-green"></div>
                        <span>Rural</span>
                        <div className="horizontal-bar dark-purple"></div>
                        <span>Semi-urban</span>
                        <div className="horizontal-bar light-red"></div>
                        <span>N/A</span>
                      </div>
                    </Col> */}
                  </Row>
                </div>
              )}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default Home;
