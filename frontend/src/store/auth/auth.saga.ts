import { put, takeLatest } from "redux-saga/effects";
import * as Types from "./auth.constant";
import { updateCurrentUser } from "./auth.action";

function* onRefreshUserCurrent() {
  yield put(updateCurrentUser(null));
}

export default function* authSaga() {
  yield takeLatest(Types.REFRESH_USER_CURRENT, onRefreshUserCurrent);
}
