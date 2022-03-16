import React from 'react';
import EventDetails from './EventDetails';
import EventTicket from './EventTicket';
import EventSchedule from './EventSchedule';
import EventHeader from './EventHeader';
import EventUpload from './EventUpload';
import EventFooter from './EventFooter';
import EventCustomField from './EventCustomField';
import { Col, Form, Row } from 'react-bootstrap';
import EventOtherInfo from './EventOtherInfo';
import EventBanner from './EventBanner';
import { useForm } from 'react-hook-form';

const CreateEvent = () => {
  const { register, handleSubmit, setValue, control } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="g-3">
        <Col xs={12}>
          <EventHeader />
        </Col>
        <Col xs={12}>
          <EventBanner />
        </Col>
        <Col lg={8}>
          <EventDetails register={register} setValue={setValue} />
          <EventTicket
            register={register}
            control={control}
            setValue={setValue}
          />
          <EventSchedule />
          <EventUpload />
          <EventCustomField register={register} />
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
            <EventOtherInfo register={register} control={control} />
          </div>
        </Col>
        <Col>
          <EventFooter />
        </Col>
      </Row>
    </Form>
  );
};

export default CreateEvent;