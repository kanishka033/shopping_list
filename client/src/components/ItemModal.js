import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { useState } from "react";

const ItemModal = (props) => {

  const [state,setState] = useState({
        modal: false,
        name: ''
    });
  

  const toggle = () => {
     setState({modal: !state.modal})
  }

  const onChange = e =>{
      setState({ 
          modal: state.modal,
          [e.target.name]: e.target.value
         })
  }

  const onSubmit = e => {
    e.preventDefault();
     const newItem = {
        name: state.name
    }

    //Add item via addItem action
    props.addItem(newItem);

    //Close modal
    toggle();
  }
  
  return (
    <div>
        <Button color="dark"
                style={{marginBottom:'2rem'}}
                onClick={toggle}
        > Add Item </Button>

        <Modal isOpen={state.modal}
                toggle={toggle} >
            <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
            <ModalBody>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="item">Item</Label>
                        <Input type="text"
                                name="name"
                                id="item"
                                placeholder="Add shopping item"
                                onChange={onChange}></Input>

                        <Button color="dark"
                                style={{marginTop:'2rem'}}
                        >Add Item</Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    </div>
  )
} 

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps,{ addItem }) (ItemModal);