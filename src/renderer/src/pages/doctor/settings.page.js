import React from 'react'
import Header from '../../components/doctors/partials/Header'
import profileImg from '../../img/profile.svg'
import DoctorLayout from '../../layouts/doctor.layout'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Row from 'react-bootstrap/Row'
import PrescriptionSetings from '../../components/doctors/prescriptionSettings'
import PrintSettings from '../../components/doctors/printSettings'
import PresetSettings from '../../components/doctors/presetSettings'
import AssistantSettings from '../../components/doctors/assistantSettings'

function Settings() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Row>
          <div className="col-xl-12 col-md-12 col-lg-12">
            <div className="card shadow mb-4 card-content">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Settings</h6>
              </div>
              <div className="card-body appointment-card-body">
                <Tabs
                  defaultActiveKey="print-settings"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="preset-settings" title="Preset Settings">
                    <PresetSettings />
                  </Tab>
                  <Tab
                    eventKey="prescription-settings"
                    title="Prescription Settings"
                  >
                    <PrescriptionSetings />
                  </Tab>
                  <Tab eventKey="print-settings" title="Print Settings">
                    <PrintSettings />
                  </Tab>
                  {/* <Tab eventKey="profile" title="Patient Settings"></Tab>
                  <Tab eventKey="contact" title="Contact"></Tab> */}
                  <Tab eventKey="assistant-settings" title="Assistant Settings">
                    <AssistantSettings />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </div>
  )
}

export default Settings
