import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EventCustomFieldItem = ({ index, handleRemove, item, handleChange }) => {
  return (
    <div className="bg-white border dark__bg-1100 p-3 position-relative rounded-1 mb-2">
      <div className="position-absolute end-0 top-0 mt-2 me-3 z-index-1">
        <Button
          size="sm"
          variant="link"
          onClick={() => handleRemove(index)}
          className="p-0"
        >
          <FontAwesomeIcon className="text-danger" icon="times-circle" />
        </Button>
      </div>

      <Row className="gx-2 gy-3">
        <Col md="6">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Name (e.g. T-shirt)"
              value={item.name}
              onChange={e => handleChange(index, 'name', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Select
              size="sm"
              aria-label="Default select example"
              value={item.type}
              onChange={e => handleChange(index, 'type', e.target.value)}
            >
              <option>Select a type</option>
              <option>Text</option>
              <option>Checkboxes</option>
              <option>Radio Buttons</option>
              <option>Textarea</option>
              <option>Date</option>
              <option>Dropdowns</option>
              <option>File</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="12">
          <Form.Group>
            <Form.Label>Field Option</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={item.option}
              onChange={e => handleChange(index, 'option', e.target.value)}
            />
            <Form.Text className="text-warning fs--1">
              * Separate your options with comma
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

EventCustomFieldItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default EventCustomFieldItem;
