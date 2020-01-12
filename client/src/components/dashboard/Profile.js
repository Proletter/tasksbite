import React, { useContext, useEffect } from 'react';
import SideNav from './SideNav';
import Spinner from '../layout/Spinner';
import AuthContext from '../../context/auth/authContext';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, loading, user } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const onChange = e => {};
  return (
    <section className="section section-profile">
      <div className="valign-wrapper row login-box">
        <div className="container">
          <div className="col s12 m4">
            <SideNav />
          </div>
          <div className="col card s12 m7">
            <form>
              <div className="card-content">
                <span className="card-title center">Profile</span>
                <div className="row">
                  <div class="file-field input-field">
                    <div class="btn blue">
                      <span>Upload Image</span>
                      <input type="file" />
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate" type="text" />
                    </div>
                  </div>
                  <div className="input-field col s12">
                    <input
                      type="text"
                      className="validate"
                      name="name"
                      value={user.name}
                      onChange={onChange}
                    />
                  </div>
                  <div className="input-field col s12">
                    <input
                      type="email"
                      className="validate"
                      name="email"
                      value={user.email}
                      onChange={onChange}
                    />
                  </div>
                  <div className="input-field col s12">
                    <label htmlFor="password">Password </label>
                    <input
                      type="password"
                      className="validate"
                      name="password"
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="card-action right-align center text-white">
                  <button
                    className="btn blue waves-effect waves-light"
                    type="submit"
                  >
                    Update <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
