import React, { useRef } from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { init } from './store';

const AppEntry = () => {
  const registry = useRef(init());
  return (
    <Provider store={registry.current.getStore()}>
      <App />
    </Provider>
  );
};

export default AppEntry;
