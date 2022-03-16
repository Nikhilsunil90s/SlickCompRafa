import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomDateInput from 'components/common/CustomDateInput';

const EventScheduleItem = ({
  index,
  title,
  handleRemove,
  handleChange,
  startDate,
  startTime,
  endDate,
  endTime
}) => {
  return (
    <>
      <div className="bg-white border dark__bg-1100 p-3 position-relative rounded-1 mb-2">
        <div className="position-absolute end-0 top-0 mt-2 me-3 z-index-1">
          <Button
            size="sm"
            variant="link"
            className="p-0"
            onClick={() => handleRemove(index)}
          >
            <FontAwesomeIcon className="text-danger" icon="times-circle" />
          </Button>
        </div>

        <Row className="gx-2 gy-3">
          <Col md="12">
            <Form.Group controlId="scheduleStartDate">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={({ target }) =>
                  handleChange(index, 'title', target.value)
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>

              <DatePicker
                selected={startDate}
                onChange={newDate => {
                  handleChange(index, 'startDate', newDate);
                }}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'd/m/y'
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="scheduleStartTime">
              <Form.Label>Start Time</Form.Label>
              <DatePicker
                selected={startTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm"
                onChange={newDate => {
                  handleChange(index, 'startTime', newDate);
                }}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'H:i'
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="scheduleEndDate">
              <Form.Label>End Date</Form.Label>

              <DatePicker
                selected={endDate}
                onChange={newDate => {
                  handleChange(index, 'endDate', newDate);
                }}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'd/m/y'
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="scheduleEndTime">
              <Form.Label>End Time</Form.Label>
              <DatePicker
                selected={endTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm"
                onChange={newDate => {
                  handleChange(index, 'endTime', newDate);
                }}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'H:i'
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default EventScheduleItem;

EventScheduleItem.propTypes = {
  title: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired,
  startDate: PropTypes.string,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string
};
