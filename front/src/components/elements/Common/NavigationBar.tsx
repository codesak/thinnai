import React from "react";
import nav from '../../styles/GuestLogin/navbar.module.css'
import {ROUTES} from '../../../utils/routing/routes'
import { useNavigate } from "react-router-dom";
export function NavigationBar() {
  const navigate = useNavigate();
  return <div className={nav.desktopNav}>
        <div className={nav.wrapper}>
          <div className={nav.desktopLogo}>
            <img src={process.env.PUBLIC_URL + '/assets/images/logo.svg'} alt="logo" />
          </div>
          <div className={nav.desktopNavBtns}>
            <button onClick={() => {
          navigate(ROUTES.HOST_LANDING);
        }}>
              Become a host
            </button>
            <button onClick={() => {
          navigate(ROUTES.EXPLORE);
        }}>
              Explore Spaces
            </button>
          </div>
        </div>
      </div>;
}
  