import { Badge, Button, Col, Popover } from "antd";
import React from "react";
import {
    WrapperContentPopup,
    WrapperHeader,
    WrapperHeaderAccount,
    WrapperHeaderCart,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from "./style";
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import ButttonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import { useState } from "react";
import Loading from "../LoadingComponent/LoadingComponent";
import { useEffect } from "react";
import { searchProduct } from "../../redux/slices/productSlice";
import logo from "../../assets/images/lgotiki.png";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [search, setSearch] = useState("");
    const order = useSelector((state) => state.order);
    const [loading, setLoading] = useState(false);
    const handleNavigateLogin = () => {
        navigate("/sign-in");
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(resetUser());
        setLoading(false);
        navigate("/");
    };

    useEffect(() => {
        setLoading(true);
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
        setLoading(false);
    }, [user?.name, user?.avatar]);

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
                Thông tin cá nhân
            </WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup
                    onClick={() => handleClickNavigate("admin")}
                >
                    Quản lý hệ thống
                </WrapperContentPopup>
            )}
            <WrapperContentPopup
                onClick={() => handleClickNavigate(`my-order`)}
            >
                Đơn hàng của tôi
            </WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate()}>
                Đăng xuất
            </WrapperContentPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === "profile") {
            navigate("/profile-user");
        } else if (type === "admin") {
            navigate("/system/admin");
        } else if (type === "my-order") {
            navigate("/my-order", {
                state: {
                    id: user?.id,
                    token: user?.access_token,
                },
            });
        } else {
            handleLogout();
        }
    };

    const onSearch = (e) => {
        setSearch(e.target.value);
        dispatch(searchProduct(e.target.value));
    };

    return (
        <div
            style={{
                heiht: "100%",
                width: "100%",
                display: "flex",
                background: "#9255FD",
                justifyContent: "center",
            }}
        >
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader to="/">
                        <img
                            src={logo}
                            alt="logo"
                            style={{ objectFit: "cover", height: "36px" }}
                        ></img>
                    </WrapperTextHeader>
                </Col>

                <Col span={13}>
                    <ButttonInputSearch
                        size="large"
                        bordered={true}
                        textbutton="Tìm kiếm"
                        placeholder="Search..."
                        onChange={onSearch}
                        backgroundColorButton="#5a20c1"
                    />
                </Col>

                <Col
                    span={6}
                    style={{
                        display: "flex",
                        gap: "54px",
                        alignItems: "center",
                    }}
                >
                    <Loading isLoading={loading}>
                        <WrapperHeaderAccount>
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    alt="avatar"
                                    style={{
                                        height: "30px",
                                        width: "30px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginRight: "10px",
                                    }}
                                />
                            ) : (
                                <UserOutlined
                                    style={{
                                        color: "rgb(128, 128, 137)",
                                        fontSize: "30px",
                                    }}
                                />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="hover">
                                        <div
                                            style={{
                                                cursor: "pointer",
                                                maxWidth: 100,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                color: "rgb(128, 128, 137)",
                                            }}
                                        >
                                            {userName?.length
                                                ? userName
                                                : user?.email}
                                        </div>
                                    </Popover>
                                </>
                            ) : (
                                <div
                                    onClick={handleNavigateLogin}
                                    style={{ cursor: "pointer" }}
                                >
                                    <WrapperTextHeaderSmall>
                                        Đăng nhập/Đăng ký
                                    </WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>
                                            Tài khoản
                                        </WrapperTextHeaderSmall>
                                        <CaretDownOutlined
                                            style={{
                                                color: "rgb(128, 128, 137)",
                                                textAlign: "center",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccount>
                    </Loading>

                    <WrapperHeaderCart onClick={() => navigate("/order")}>
                        <Badge
                            count={
                                order?.orderItems?.length
                                    ? order?.orderItems?.length
                                    : 0
                            }
                            size="small"
                            showZero
                        >
                            <ShoppingCartOutlined
                                style={{
                                    fontSize: "30px",
                                    color: "#3397f3",
                                }}
                            />
                        </Badge>
                        <WrapperTextHeaderSmall>
                            Giỏ hàng
                        </WrapperTextHeaderSmall>
                    </WrapperHeaderCart>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
