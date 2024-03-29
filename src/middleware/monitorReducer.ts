/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Reducer, StoreEnhancer } from 'redux';

const round = (number: number) => Math.round(number * 100) / 100;

const monitorReducerEnhancer: StoreEnhancer<any, any> = (createStore) => (reducer, preloadedState) => {
  const monitoredReducer: Reducer<any, any> = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);

    // eslint-disable-next-line no-console
    console.info('reducer process time:', diff);

    return newState;
  };

  return createStore(monitoredReducer, preloadedState as any);
};

export default monitorReducerEnhancer;
