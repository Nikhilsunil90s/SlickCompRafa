import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import EventCustomFieldItem from './EventCustomFieldItem';

const formField = {
  name: '',
  type: '',
  option: ''
};

const EventCustomField = () => {
  const [formData, setFormData] = useState([formField]);
  const handleCustomField = () => {
    setFormData([...formData, formField]);
  };

  const handleChange = (index, field, value) => {
    const updatedFormData = formData.map((item, ind) =>
      index === ind ? { ...item, [field]: value } : item
    );
    setFormData(updatedFormData);
  };
  const handleRemoveItem = index => {
    setFormData(formData.filter((item, ind) => index !== ind));
  };
  return (
    <Card>
      <Card.Header as="h5">Custom Fields</Card.Header>
      <Card.Body className="bg-light">
        {formData.map((item, index) => (
          <EventCustomFieldItem
            item={item}
            key={index}
            index={index}
            handleChange={handleChange}
            handleRemove={handleRemoveItem}
          />
        ))}
        <IconButton
          onClick={handleCustomField}
          variant="falcon-default"
          size="sm"
          icon="plus"
          transform="shrink-3"
        >
          Add Item
        </IconButton>
      </Card.Body>
    </Card>
  );
};

export default EventCustomField;
