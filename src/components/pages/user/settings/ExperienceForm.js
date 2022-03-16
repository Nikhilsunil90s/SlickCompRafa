import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import InputField from '../InputField';

const ExperienceForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    city: '',
    description: '',
    currentlyWork: false,
    from: '',
    to: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        value={formData.company}
        label="Company"
        name="company"
        handleChange={handleChange}
      />
      <InputField
        value={formData.position}
        label="Position"
        name="position"
        handleChange={handleChange}
      />
      <InputField
        value={formData.position}
        label="City"
        name="city"
        handleChange={handleChange}
      />
      <InputField
        value={formData.description}
        label="Description"
        name="description"
        handleChange={handleChange}
        as="textarea"
        rows={3}
      />

      <Form.Group as={Row} className="mb-3" controlId="currentlyWork">
        <Col sm={{ span: 10, offset: 3 }}>
          <Form.Check
            type="checkbox"
            label="I currently work here"
            checked={formData.currentlyWork}
            onChange={({ target }) =>
              setFormData({ ...formData, currentlyWork: target.checked })
            }
          />
        </Col>
      </Form.Group>

      <InputField
        type="date"
        value={formData.from}
        label="From"
        name="from"
        onChange={value => {
          setFormData({ ...formData, from: value });
        }}
      />

      <InputField
        type="date"
        value={formData.to}
        label="To"
        name="to"
        onChange={value => {
          setFormData({ ...formData, to: value });
        }}
      />

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 3 }}>
          <Button type="submit">Save</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ExperienceForm;
