import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [toggled, setToggled] = useState('toggled');
  const userInfo = useSelector((state) => state.authReducer.data);
  const [activeItem, setActiveItem] = useState('prescription');

  const handleToggle = () => {
    if (toggled) {
      setToggled('');
    } else {
      setToggled('toggled');
    }
  };

  const MenuLabel = ({ menuTitle, item }) => {
    return (
      <span className={item === activeItem ? 'blueColor' : ''}>
        {menuTitle}
      </span>
    );
  };

  const url = window.location.pathname.substr(1);
  useEffect(() => {
    setActiveItem(url);
  }, [setActiveItem]);

  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggled}`}
      id="accordionSidebar"
      style={{
        borderBox: 'content-box',
        transition: '0.3s ease-in-out',
      }}
    >
      {/* <button
        className="navbar-toggler"
        type="button"
        onClick={() => handleToggle()}
      >
        <i className="fas fa-bars" style={{ color: "white" }}></i>
      </button> */}

      {/* <hr className="sidebar-divider my-0" /> */}
      {userInfo?.userType.toLowerCase() === 'doctor' ? (
        <>
          <li
            className={`nav-item ${url === 'prescription' ? 'whiteColor' : ''}`}
            style={{ height: '69px', paddingTop: '14%' }}
          >
            <Link
              className="nav-link"
              to="/prescription"
              onClick={() => setActiveItem('prescription')}
              title="Rx"
            >
              <i
                className={`fas fa-fw fa-prescription ${
                  url === 'prescription'
                    ? 'nav-menu-icon-active'
                    : 'nav-menu-icon'
                }`}
              ></i>
              {!toggled && <MenuLabel menuTitle="Rx" item={'prescription'} />}
            </Link>
          </li>
          <li
            className={`nav-item ${url === 'appointments' ? 'whiteColor' : ''}`}
          >
            <Link
              className="nav-link"
              to="/appointments"
              onClick={() => setActiveItem('appointments')}
              title="Appointments"
            >
              <i
                className={`fas fa-fw fa-calendar-check ${
                  url === 'appointments'
                    ? 'nav-menu-icon-active'
                    : 'nav-menu-icon'
                }`}
              ></i>
              {!toggled && (
                <MenuLabel menuTitle="Appointments" item={'appointments'} />
              )}
            </Link>
          </li>

          <li className={`nav-item ${url === 'patients' ? 'whiteColor' : ''}`}>
            <Link
              className="nav-link"
              to="/patients"
              onClick={() => setActiveItem('patients')}
              title="Patients"
            >
              <i
                className={`fa fa-users ${
                  url === 'patients' ? 'nav-menu-icon-active' : 'nav-menu-icon'
                }`}
              ></i>
              {!toggled && <MenuLabel menuTitle="Patients" item={'patients'} />}
            </Link>
          </li>

          <li
            className={`nav-item ${activeItem === 'home' ? 'whiteColor' : ''}`}
          >
            <Link
              className="nav-link"
              to="/home"
              onClick={() => setActiveItem('home')}
              title="Reports"
            >
              <i
                className={`fas fa-chart-bar  ${
                  url === 'home' ? 'nav-menu-icon-active' : 'nav-menu-icon'
                }`}
              ></i>
              <i className=""></i>
              {!toggled && <MenuLabel menuTitle="Home" item={'home'} />}
            </Link>
          </li>
          <li className={`nav-item ${url === 'settings' ? 'whiteColor' : ''}`}>
            <Link
              className="nav-link"
              to="/settings"
              onClick={() => setActiveItem('settings')}
              title="Settings"
            >
              <i
                className={`fas fa-fw fa-cogs ${
                  url === 'settings' ? 'nav-menu-icon-active' : 'nav-menu-icon'
                }`}
              ></i>
              {!toggled && <MenuLabel menuTitle="Settings" item={'settings'} />}
            </Link>
          </li>
        </>
      ) : (
        <li
          className={`nav-item ${url === 'appointments' ? 'whiteColor' : ''}`}
        >
          <Link
            className="nav-link"
            to="/appointments"
            onClick={() => setActiveItem('appointments')}
          >
            <i
              className={`fas fa-fw fa-calendar-check ${
                url === 'appointments'
                  ? 'nav-menu-icon-active'
                  : 'nav-menu-icon'
              }`}
            ></i>
            {!toggled && (
              <MenuLabel menuTitle="Appointments" item={'appointments'} />
            )}
          </Link>
        </li>
      )}
    </ul>
  );
};

export default memo(Sidebar);
