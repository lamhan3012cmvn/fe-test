import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import watcherSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSaga);
export default store;
