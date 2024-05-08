import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from './testredux';

const store = configureStore({
  reducer: rootReducer
});

export default store;