/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useUpload } from 'react-use-upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const AvatarUploader = ({
  url,
  onDone
}: {
  url: string;
  onDone: () => void;
}) => {
  let [upload, { progress, done, loading }] = useUpload(({ files }) => ({
    method: 'PUT',
    url: url,
    body: files[0],
    headers: { Authorization: window.localStorage.getItem('token') }
  }));
  if (done) {
    onDone();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
  const { t } = useTranslation();

  return (
    <div>
      {loading ? (
        <span className="progress-holder">
          {progress}% {t('profile.complete')}
        </span>
      ) : null}
      <label className="img-uploader btn-edit">
        <input
          type="file"
          className="file-uploader"
          onChange={e => {
            if (e.target.files) {
              upload({ files: e.target.files });
            }
          }}
        />
        <FontAwesomeIcon icon={['fas', 'pencil-alt']} />
      </label>
    </div>
  );
};

export default AvatarUploader;
