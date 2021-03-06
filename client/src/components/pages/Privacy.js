import React, { Fragment, useContext, useEffect } from 'react';
import Footer from './Footer';
import Spinner from '../layout/Spinner';
import AuthContext from '../../context/auth/authContext';

const Privacy = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  if (authContext.loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <div className="section section-privacy">
        <div className="container">
          <div className="card-panel">
            <h4>Tasksbite Privacy Policy</h4>
            <br />
            <h5>
              <b>Information gathering and usage</b>{' '}
            </h5>
            <p className="flow-text">
              When registering for Tasksbite we ask for information such as your
              name and email address. Your information is only used internally
              and won't be shared with others.
              <br />
              Tasksbite collects the email addresses of those who communicate
              with us via email, and information submitted through voluntary
              activities such as site registrations or participation in surveys.
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />

      <Footer />
    </Fragment>
  );
};

export default Privacy;
