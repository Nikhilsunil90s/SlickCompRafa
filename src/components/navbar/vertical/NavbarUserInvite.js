import React from "react";
import Logo from 'components/common/Logo';
import { Navbar, NavDropdown } from 'react-bootstrap';
import ProfileDropdown from '../top/ProfileDropdown';
import { customRoutesUserInvite } from 'routes/routes';

const NavbarUserInvite = () => {
    return (
        <>
         <nav>
      <Navbar>
          <Logo at="navbar-vertical" width={40}/>
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          {customRoutesUserInvite.children[0].children.map((route) => (
              <NavDropdown.Item 
                key={route.name}
                href={route.to} 
                className={route.active ? 'link-600' : 'text-500'}
              >
              {route.name}
              </NavDropdown.Item>
          ))}
        </NavDropdown>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end' style={{ 'listStyleType': 'none'}}>
           <span style={{'color': '#2c7be5'}}>Profile</span> <ProfileDropdown/>
          </Navbar.Collapse>
      </Navbar>
    </nav> 
        </>
    )
}

export default NavbarUserInvite;
