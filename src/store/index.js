import { types } from "mobx-state-tree";
import BoardStore from "./board";
import UsersStore from "./users";

const RootStore = types.model('RooteStore', {
    users: types.optional(UsersStore, {}),
    boards: types.optional(BoardStore, {}),
});

export default RootStore;
