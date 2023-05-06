import {combineReducers, legacy_createStore as createStore} from "redux";
import CatalogReducer from "./Resucers/CatalogReducer";
import CartReducer from "./Resucers/CartReducer";
import FavoritesReducer from "./Resucers/FavoritesReducer";
import HeaderReducer from "./Resucers/HeaderReducer";
import MaketReducer from "./Resucers/MaketReducer";
import LoginMenuReducer from "./Resucers/LoginMenuReducer";
import UserContextMenuReducer from "./Resucers/UserContextMenuReducer";
import GetOrdersReducer from "./Resucers/GetOrdersReducer";
import AdminPanelReducer from "./Resucers/AdminPanelReducer";
import OrdersReducer from "./Resucers/OrdersReducer";

let reducers = combineReducers({
    catalogPage: CatalogReducer,
    cartPage: CartReducer,
    favoritePage: FavoritesReducer,
    header: HeaderReducer,
    maket: MaketReducer,
    loginMenu: LoginMenuReducer,
    userContextMenu: UserContextMenuReducer,
    getOrdersPage: GetOrdersReducer,
    adminPanelPage: AdminPanelReducer,
    ordersPage: OrdersReducer,
})

let store = createStore(reducers);

window.store = store;

export default store;