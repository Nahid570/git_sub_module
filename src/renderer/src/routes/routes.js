import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './protected.route';
import Page404 from '../pages/page404';
import SignIn from '../pages/signIn';
import SignupForm from '../pages/signup';
import ForgotPassword from '../pages/forgotPassword';
import ForgotPasswordOtpVerification from '../pages/forgotPasswordOtpVerification';
import SignupOtpVerification from '../pages/signupOtpVerification';
import ResetPassword from '../pages/resetPassword';

import AdminProtectedRoute from './admin.protected.route';
import AuthLayout from '../layouts/auth.layout';

import Dashboard from '../pages/admin/dashboard.page';
import Doctors from '../pages/admin/doctors.page';
import AdminLogin from '../pages/admin/admin.login.page';

// Doctor routes
import DoctorLayout from '../layouts/doctor.layout';
import Home from '../pages/doctor/home.page';
import Prescription from '../pages/doctor/prescription.page';
import Settings from '../pages/doctor/settings.page';
//import Appointments from '../pages/doctor/appointment.page';
//import PatientHistory from '../pages/doctor/patientHistory.page';
import NewAppointment from '../pages/doctor/newAppointment.page';
import Attachment from '../pages/doctor/attachment.page';
// import PatientList from '../pages/doctor/patientList.page';
const LazyPatientList = React.lazy(() =>
  import('../pages/doctor/patientList.page'),
);
const LazyPatientHistory = React.lazy(() =>
  import('../pages/doctor/patientHistory.page'),
);
const LazyAppointments = React.lazy(() =>
  import('../pages/doctor/appointment.page'),
);

const routes = () => (
  <BrowserRouter>
    <Routes>
      {['/', 'signin'].map((path) => (
        <Route
          key={path}
          path={path}
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />
      ))}
      {/* <Route
        path="/signin"
        element={
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        }
      /> */}
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignupForm />
          </AuthLayout>
        }
      />
      <Route
        path="/signup-otp-verification"
        element={
          <AuthLayout>
            <SignupOtpVerification />
          </AuthLayout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path="/forgot-password-otp-verification"
        element={
          <AuthLayout>
            <ForgotPasswordOtpVerification />
          </AuthLayout>
        }
      />
      {/* <Route
        path="/reset-password"
        element={
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        }
      /> */}
      <Route path="reset-password">
        <Route
          path=":id/:securityToken"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />
      </Route>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <Home />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/prescription"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <Prescription />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient-history"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <React.Suspense fallback="loading...">
                <LazyPatientHistory />
              </React.Suspense>
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <Settings />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <React.Suspense fallback="loading...">
                <LazyPatientList />
              </React.Suspense>
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <React.Suspense fallback="loading...">
                <LazyAppointments />
              </React.Suspense>
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-appointment"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <NewAppointment />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/attachments"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <Attachment />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      {/* <Route path="/contact" element={<Contact />} /> */}

      <Route path="/admin/*">
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="doctors"
          element={
            <AdminProtectedRoute>
              <Doctors />
            </AdminProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Route>

      <Route path="/*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default routes;
