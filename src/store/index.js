import { createStore } from 'redux';

import rootReduce from './modules/rootReducer';

const enhancer =
	process.env.NODE_ENV === 'development'
		? console.tron.createEnhancer()
		: null;

const store = createStore(rootReduce, enhancer);

export default store;
