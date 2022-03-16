/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import AppContext from 'context/Context';
import AcademyRoutes from './AcademyRoutes';
import FighterRoutes from './FighterRoutes';
import ProductProvider from 'components/app/e-commerce/ProductProvider';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
  const { hash, pathname } = useLocation();
  const isAcademy = useSelector(state => state.auth.isAcademy);
  const {
    config: { isFluid, navbarPosition }
  } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>
      {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
        <NavbarVertical />
      )}
      <ProductProvider>
        <div className="content">
          <NavbarTop />
          <Switch>{isAcademy ? <AcademyRoutes /> : <FighterRoutes />}</Switch>
        </div>
      </ProductProvider>
    </div>
  );
};

export default DashboardLayout;
