import { all, call } from "@redux-saga/core/effects";

import userSaga from "./User/user.saga";

export default function* rootSaga() {
  yield all([call(userSaga)]);
}
