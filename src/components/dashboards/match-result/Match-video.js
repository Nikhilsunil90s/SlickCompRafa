import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

const MatchVideo = ({ videos }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="d-flex justify-content-start mt-6">
        <h5 className="mb-1">{t('matchResults.videosTitle')}</h5>
      </div>
      <div className="container mt-4 px-0">
        <div className="row">
          {videos.map(videos => (
            <div className="col-6 col-md-4 mb-4" key={videos.id}>
              <div className="embed-responsive embed-responsive-16by9">
                <ReactPlayer
                  controls
                  className="video-width"
                  width="378"
                  height="240"
                  url={videos.url}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

MatchVideo.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object)
};

export default MatchVideo;
