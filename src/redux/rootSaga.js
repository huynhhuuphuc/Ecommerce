import { all, call } from "@redux-saga/core/effects";

import userSaga from "./User/user.saga";
import productsSaga from "./Products/products.saga";

export default function* rootSaga() {
  yield all([call(userSaga), call(productsSaga)]);
}
