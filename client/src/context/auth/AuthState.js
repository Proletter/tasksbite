import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  UPDATE_PROFILE,
  UPDATE_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_ALL,
  UPLOAD_AVATAR,
  DELETE_ACCOUNT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/users/me');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.request.responseText
      });
    }
  };

  // Register
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.request.responseText
      });
    }
  };

  // Login
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.request.responseText
      });
    }
  };

  // Update Profile
  const updateProfile = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.patch('/api/users/me', formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_FAIL,
        payload: err.response.request.responseText
      });
    }
  };

  // Upload Avatar
  const uplaodAvatar = async formData => {
    try {
      await axios.post('/api/users/me/avatar', formData);
      dispatch({
        type: UPLOAD_AVATAR
      });
    } catch (err) {
      dispatch({
        type: UPDATE_FAIL,
        payload: err.response.request.responseText
      });
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post('/api/users/logout');
      dispatch({ type: LOGOUT });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Logout from all devices
  const logoutAll = async () => {
    try {
      await axios.post('/api/users/logoutAll');
      dispatch({ type: LOGOUT_ALL });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Delete Account
  const deleteAccount = async () => {
    try {
      await axios.delete('/api/users/me');
      dispatch({ type: DELETE_ACCOUNT });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        updateProfile,
        uplaodAvatar,
        logout,
        logoutAll,
        deleteAccount,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
