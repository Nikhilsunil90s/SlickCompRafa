import React, { Suspense } from 'react';
import { getAPIRoot } from 'api/utils';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './layouts/Layout';
import i18n from './i18n';

console.log(getAPIRoot());

const App = () => {
  i18n.on('languageChanged', () => i18n.language);
  return (
    <Suspense fallback={null}>
      <Router basename={process.env.PUBLIC_URL}>
        <Layout />
      </Router>
    </Suspense>
  );
};

export default App;
