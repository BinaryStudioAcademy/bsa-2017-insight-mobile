import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/mainReducer';

const store = createStore(reducer);

export { store };