import HomePage from "../pages/HomePage/HomePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";

export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader: true,
    },
    {
        path: "/profile-user",
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: "/product-details/:id",
        page: ProductDetailsPage,
        isShowHeader: true,
    },
    {
        path: "*",
        page: NotFoundPage,
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true,
    },
];
