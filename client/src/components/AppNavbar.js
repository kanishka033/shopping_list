import { useState, Fragment } from 'react';
import {
 Collapse,
 Navbar,
 NavbarToggler,
 NavbarBrand,
 Nav,
 NavItem,
 Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

const AppNavbar = ({ auth })=> {
  const [isOpen,setIsOpen] = useState(false);

const authLinks = (
    <Fragment>
            
        <NavbarBrand style={{fontSize:"16px",padding:"9px"}}>
            {auth && auth.user ? `Welcome ${auth.user.name}` : ''}
         </NavbarBrand>
       
         <NavItem>
            <Logout />
          </NavItem>
    </Fragment>
  )

const guestLinks = (
    <Fragment>
        <NavItem>
            <RegisterModal />
        </NavItem>
        <NavItem>
            <LoginModal />
        </NavItem>
    </Fragment>
  )

  const toggle = () => setIsOpen(!isOpen);
   
  return (
      <div>
          <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
             <NavbarBrand href="/"> <strong>ShoppingList</strong></NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar >
                        { auth.isAuthenticated ? authLinks : guestLinks }
                    </Nav>
                </Collapse>
            </Container>
          </Navbar> 
      </div>
  )

}

AppNavbar.propTypes = {
   
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);