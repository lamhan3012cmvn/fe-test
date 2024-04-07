import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/auth.saga";

export default function* watcherSaga() {
  yield all([fork(authSaga)]);
}
