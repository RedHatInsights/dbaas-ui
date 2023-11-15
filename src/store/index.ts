import { createContext } from 'react';
import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import promiseMiddleware from 'redux-promise-middleware';
import { Middleware, Reducer } from 'redux';

export const RegistryContext = createContext({
  getRegistry: () => {},
});

export function init(...middleware: Middleware[]) {
  const registry = new ReducerRegistry({}, [
    promiseMiddleware,
    notificationsMiddleware({
      errorDescriptionKey: ['detail', 'stack'],
    }),
    ...middleware.filter((item) => typeof item !== 'undefined'),
  ]);

  registry.register({
    notifications: notificationsReducer as Reducer,
  });

  //If you want to register all of your reducers, this is good place.
  /*
   *  registry.register({
   *    someName: (state, action) => ({...state})
   *  });
   */
  return registry;
}
