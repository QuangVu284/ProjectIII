import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
    WrapperItemOrder,
    WrapperListOrder,
    WrapperHeaderItem,
    WrapperFooterItem,
    WrapperContainer,
    WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { message } from "antd";

const MyOrderPage = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(
            state?.id,
            state?.token
        );
        return res.data;
    };
    const user = useSelector((state) => state.user);

    const queryOrder = useQuery({
        queryKey: ["orders"],
        queryFn: fetchMyOrder,
        enabled: !!state?.id,
    });
    const { isPending, data: dataMyOrder } = queryOrder;

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token,
            },
        });
    };

    const mutation = useMutationHooks((data) => {
        const { id, token, orderItems, userId } = data;
        const res = OrderService.cancelOrder(id, token, orderItems, userId);
        return res;
    });

    const handleCanceOrder = (order) => {
        mutation.mutate(
            {
                id: order._id,
                token: state?.token,
                orderItems: order?.orderItems,
                userId: user.id,
            },
            {
                onSuccess: () => {
                    queryOrder.refetch();
                },
            }
        );
    };
    const {
        isPending: isLoadingCancel,
        isSuccess: isSuccessCancel,
        isError: isErrorCancle,
        data: dataCancel,
    } = mutation;

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === "OK") {
            message.success();
        } else if (isSuccessCancel && dataCancel?.status === "ERR") {
            message.error(dataCancel?.message);
        } else if (isErrorCancle) {
            message.error();
        }
    }, [isErrorCancle, isSuccessCancel]);

    const renderProduct = (data) => {
        return data?.map((order) => {
            return (
                <WrapperHeaderItem key={order?._id}>
                    <img
                        alt="product"
                        src={order?.image}
                        style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            border: "1px solid rgb(238, 238, 238)",
                            padding: "2px",
                        }}
                    />
                    <div
                        style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginLeft: "10px",
                        }}
                    >
                        {order?.name}
                    </div>
                    <span
                        style={{
                            fontSize: "13px",
                            color: "#242424",
                            marginLeft: "auto",
                        }}
                    >
                        {convertPrice(order?.price)}
                    </span>
                </WrapperHeaderItem>
            );
        });
    };

    return (
        <Loading isLoading={isPending || isLoadingCancel}>
            <WrapperContainer>
                <div
                    style={{
                        height: "100%",
                        width: "1270px",
                        margin: "0px auto",
                        padding: "20px 0px",
                    }}
                >
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "var(--primary-color)",
                        }}
                    >
                        Đơn hàng của tôi
                    </p>
                    <WrapperListOrder>
                        {dataMyOrder?.length > 0 ? (
                            dataMyOrder?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order?._id}>
                                        <WrapperStatus>
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Trạng thái
                                            </span>
                                            <div>
                                                <span
                                                    style={{
                                                        color: "rgb(255, 66, 78)",
                                                    }}
                                                >
                                                    Giao hàng:{" "}
                                                </span>
                                                <span
                                                    style={{
                                                        color: "rgb(90, 32, 193)",
                                                        fontWeight: "bold",
                                                    }}
                                                >{`${
                                                    order.isDelivered
                                                        ? "Đã giao hàng"
                                                        : "Chưa giao hàng"
                                                }`}</span>
                                            </div>
                                            <div>
                                                <span
                                                    style={{
                                                        color: "rgb(255, 66, 78)",
                                                    }}
                                                >
                                                    Thanh toán:{" "}
                                                </span>
                                                <span
                                                    style={{
                                                        color: "rgb(90, 32, 193)",
                                                        fontWeight: "bold",
                                                    }}
                                                >{`${
                                                    order.isPaid
                                                        ? "Đã thanh toán"
                                                        : "Chưa thanh toán"
                                                }`}</span>
                                            </div>
                                        </WrapperStatus>
                                        {renderProduct(order?.orderItems)}
                                        <WrapperFooterItem>
                                            <div>
                                                <span
                                                    style={{
                                                        color: "rgb(255, 66, 78)",
                                                    }}
                                                >
                                                    Tổng tiền:{" "}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "13px",
                                                        color: "rgb(56, 56, 61)",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {convertPrice(
                                                        order?.totalPrice
                                                    )}
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                }}
                                            >
                                                <ButtonComponent
                                                    onClick={() =>
                                                        handleCanceOrder(order)
                                                    }
                                                    size={40}
                                                    styleButton={{
                                                        height: "36px",
                                                        border: "1px solid #9255FD",
                                                        borderRadius: "4px",
                                                    }}
                                                    textbutton={"Hủy đơn hàng"}
                                                    styleTextButton={{
                                                        color: "#9255FD",
                                                        fontSize: "14px",
                                                    }}
                                                ></ButtonComponent>
                                                <ButtonComponent
                                                    onClick={() =>
                                                        handleDetailsOrder(
                                                            order?._id
                                                        )
                                                    }
                                                    size={40}
                                                    styleButton={{
                                                        height: "36px",
                                                        border: "1px solid #9255FD",
                                                        borderRadius: "4px",
                                                    }}
                                                    textbutton={"Xem chi tiết"}
                                                    styleTextButton={{
                                                        color: "#9255FD",
                                                        fontSize: "14px",
                                                    }}
                                                ></ButtonComponent>
                                            </div>
                                        </WrapperFooterItem>
                                    </WrapperItemOrder>
                                );
                            })
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    width: "100%",
                                    fontSize: "20px",
                                    color: "rgb(255, 66, 78)",
                                }}
                            >
                                Bạn chưa có đơn hàng nào cả
                            </div>
                        )}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default MyOrderPage;
