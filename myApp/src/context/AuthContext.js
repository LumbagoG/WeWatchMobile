import {createContext} from 'react';

function noop(one, two) {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAunteficated: false
});