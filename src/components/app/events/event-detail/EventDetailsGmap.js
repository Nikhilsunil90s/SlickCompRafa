import Googlemap from 'components/map/Googlemap';
import AppContext from 'context/Context';
import React, { useContext } from 'react';

const MapDark = () => {
  return (
    <Googlemap
      initialCenter={{
        lat: 23.8383608,
        lng: 90.3680554
      }}
      mapStyle="Cobalt"
      className="min-vh-50 rounded-soft mt-5"
    >
      <h5>Eiffel Tower</h5>
      <p>
        Gustave Eiffel's iconic, wrought-iron 1889 tower,
        <br /> with steps and elevators to observation decks.
      </p>
    </Googlemap>
  );
};
const MapLight = () => {
  return (
    <Googlemap
      initialCenter={{
        lat: 23.8383608,
        lng: 90.3680554
      }}
      mapStyle="Default"
      className="min-vh-50 rounded-soft mt-5"
    ></Googlemap>
  );
};
const EventDetailsGmap = () => {
  const {
    config: { isDark }
  } = useContext(AppContext);

  return <>{isDark ? <MapDark /> : <MapLight />}</>;
};

export default EventDetailsGmap;
