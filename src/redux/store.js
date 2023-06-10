import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { setUserId } from "./actions";

const store = createStore(rootReducer);

export default store;

const listener = () => {
    const state = store.getState();
    // console.log(state);
};

store.subscribe(listener);