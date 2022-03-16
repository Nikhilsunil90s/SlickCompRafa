/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { postMatch } from 'api/match';
import { getParticipants } from 'api/participants';
import Section from 'components/common/Section';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as yup from 'yup';
import { connect } from 'react-redux';

let schema = yup.object().shape({
  academyId: yup.number().required(),
  participant1_id: yup.number().required().positive().integer(),
  participant2_id: yup.number().required().positive().integer(),
  matchType: yup.string().required(),
  matchGender: yup.string().required(),
  giNogi: yup.string().required(),
  weight: yup.string().required(),
  duration: yup.string().required(),
  seniority: yup.string().required(),
  matchDateTime: yup.string().str,
  matchTimeZone: yup.string().required()
});

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const CreateMatch = ({ hasLabel, academyId }) => {
  const [formData, setFormData] = useState({
    academyId: academyId,
    participant1_id: '',
    participant2_id: '',
    matchType: 'Single Match',
    matchGender: 'Male',
    giNogi: '1',
    weight: '80kg',
    duration: '5:00',
    seniority: 'Adult',
    matchDateTime: new Date(),
    matchTimeZone: ''
  });

  const [participants, setParticipants] = useState([]);
  const [submitButton, setSubmitButton] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getParticipants(academyId);
      setParticipants(response);
    })();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const timeZone = new Date(formData.matchDateTime)
      .toTimeString()
      .slice(9, 17);
    formData.matchTimeZone = timeZone;
    formData.matchDateTime = moment(formData.matchDateTime).format(
      'YYYY-MM-DD hh:mm:ss'
    );
    try {
      await postMatch(formData);
      toast.success(`Match Created`);
      window.location.href = `/dashboard/matches/`;
    } catch (e) {
      toast.success(`Match Creation Failed, try again`);
    }
  };

  const handleDateChange = async date => {
    const timeZone = new Date(date).toTimeString().slice(9, 17);
    const updatedData = {
      ...formData,
      matchDateTime: date,
      matchTimeZone: timeZone
    };
    setSubmitButton(await schema.isValid(updatedData));
    setFormData(updatedData);
  };

  const handleFieldChange = async e => {
    const timeZone = new Date(formData.matchDateTime)
      .toTimeString()
      .slice(9, 17);
    formData.matchTimeZone = timeZone;
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setSubmitButton(await schema.isValid(updatedData));
    setFormData(updatedData);
  };

  return (
    <Section bg="light" className="py-3 shadow-sm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="participant1" className="mb-3">
          {hasLabel && <Form.Label>Participant 1</Form.Label>}
          <Form.Select
            aria-label="participant1"
            name="participant1_id"
            onChange={handleFieldChange}
            required
          >
            <option selected="" disabled="" defaultValue="">
              Please Select Participant
            </option>
            {participants &&
              participants.map(participant => (
                <option value={participant.id} key={participant.id}>
                  {participant.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="participant2" className="mb-3">
          {hasLabel && <Form.Label>Participant 2</Form.Label>}
          <Form.Select
            aria-label="participant2"
            name="participant2_id"
            onChange={handleFieldChange}
            required
          >
            <option selected="" disabled="" defaultValue="">
              Please Select Participant
            </option>
            {participants &&
              participants.map(participant => (
                <option value={participant.id} key={participant.id}>
                  {participant.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="matchType" className="mb-3">
          {hasLabel && <Form.Label>Match Type</Form.Label>}
          <Form.Select
            aria-label="matchType"
            name="matchType"
            onChange={handleFieldChange}
            required
          >
            <option selected value="Single Match">
              Single Match
            </option>
            <option value="Quarter Finals">Quarter Finals</option>
            <option value="Semi Finals">Semi Finals</option>
            <option value="Final">Final</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="matchGender" className="mb-3">
          {hasLabel && <Form.Label>Match Gender</Form.Label>}
          <Form.Select
            aria-label="matchGender"
            name="matchGender"
            onChange={handleFieldChange}
            required
          >
            <option selected value="Male">
              Male
            </option>
            <option value="Female">Female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="seniority" className="mb-3">
          {hasLabel && <Form.Label>Seniority</Form.Label>}
          <Form.Select
            aria-label="seniority"
            name="seniority"
            onChange={handleFieldChange}
            required
          >
            <option selected value="Adult">
              Adult
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="giNogi" className="mb-3">
          {hasLabel && <Form.Label>Gi / NoGi</Form.Label>}
          <Form.Select
            aria-label="giNogi"
            name="giNogi"
            onChange={handleFieldChange}
            required
          >
            <option selected value="1">
              Gi
            </option>
            <option value="0">NoGi</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          {hasLabel && <Form.Label>Weight</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Weight' : ''}
            value={formData.weight}
            name="weight"
            onChange={handleFieldChange}
            required
            type="text"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          {hasLabel && <Form.Label>Duration</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'duration' : ''}
            value={formData.duration}
            name="duration"
            onChange={handleFieldChange}
            required
            type="text"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endDate">
          {hasLabel && <Form.Label>Date</Form.Label>}
          <DatePicker
            selected={formData.matchDateTime}
            onChange={date => handleDateChange(date)}
            className="form-control"
            placeholderText="YYYY-MM-DD H:M"
            dateFormat="yyyy-MM-dd h:mm"
            required
            showTimeSelect
            timeFormat="HH:mm"
          />
        </Form.Group>

        <Form.Group>
          <Button
            type="submit"
            color="primary"
            className="mt-3"
            size="lg"
            disabled={!submitButton}
          >
            Create Match
          </Button>
        </Form.Group>
      </Form>
    </Section>
  );
};

CreateMatch.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

CreateMatch.defaultProps = {
  layout: 'simple',
  hasLabel: true
};

export default connect(mapStateToProp)(CreateMatch);
