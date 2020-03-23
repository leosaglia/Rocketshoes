import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReduce from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
	process.env.NODE_ENV === 'development'
		? console.tron.createSagaMonitor()
		: null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhancer =
	process.env.NODE_ENV === 'development'
		? compose(
				console.tron.createEnhancer(),
				applyMiddleware(sagaMiddleware)
		  )
		: applyMiddleware(sagaMiddleware);

const store = createStore(rootReduce, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
