import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from "reactstrap";
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from "../../actions/errorActions";
import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';

const LoginModal = ({
    isAuthenticated,
    error,
    login,
    clearErrors
  }) => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
  
    const handleToggle = useCallback(() => {
      // Clear errors
      clearErrors();
      setModal(!modal);
    }, [clearErrors, modal]);
  
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
      
      const user = {
          email,
          password
      }
      login(user)
    };
  
    useEffect(() => {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
  
      // If authenticated, close modal
      if (modal) {
        if (isAuthenticated) {
          handleToggle();
        }
      }
    }, [error, handleToggle, isAuthenticated, modal]);
  
    return (
      <div>
        <NavLink onClick={handleToggle} href="#">
          Login
        </NavLink>
  
        <Modal isOpen={modal} toggle={handleToggle}>
          <ModalHeader toggle={handleToggle}>Login</ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={handleOnSubmit}>
              <FormGroup>
               
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={handleChangeEmail}
                />
  
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={handleChangePassword}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  };

  LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
  export default connect(mapStateToProps, { login, clearErrors })(LoginModal);