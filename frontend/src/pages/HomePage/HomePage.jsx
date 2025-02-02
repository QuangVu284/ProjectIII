import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
    WrapperButtonMore,
    WrapperNavbar,
    WrapperProducts,
    WrapperTypeProduct,
} from "./style";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.png";
import slider4 from "../../assets/images/slider4.png";
import slider5 from "../../assets/images/slider5.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import { Col } from "antd";

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);
    const [limit, setLimit] = useState(5);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        stars: null,
        price: null,
        type: null,
    });

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await ProductService.getAllProduct(search, limit);

        return res;
    };

    const { isPending, data: searchResults } = useQuery({
        queryKey: ["products", limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    const fetchProductType = async (type, limit, filters) => {
        setLoading(true);
        try {
            let combinedProducts = [];
            console.log("filters", filters);

            if (filters.type === null) {
                console.log("limit", limit);
                const res = await ProductService.getProductType(
                    type,
                    limit,
                    filters
                );
                if (res?.status === "OK") {
                    combinedProducts = res?.data;
                }
            } else if (filters.type.length === 0) {
                const res = await ProductService.getProductType(
                    type,
                    limit,
                    filters
                );
                if (res?.status === "OK") {
                    combinedProducts = res?.data;
                }
            } else {
                console.log("filter", filters);
                // Nếu có type filter, duyệt qua list_type
                const list_type = filters.type;
                const promises = list_type.map((typeItem) =>
                    ProductService.getProductType(typeItem, 0, 1000, filters)
                );
                const results = await Promise.all(promises);

                results.forEach((res) => {
                    if (res?.status === "OK") {
                        combinedProducts = [...combinedProducts, ...res?.data];
                    }
                });
            }
            console.log(filters);
            if (filters.rating) {
                // Lọc sản phẩm theo số sao
                combinedProducts = combinedProducts.filter(
                    (product) => product.rating >= filters.rating
                );
            }
            if (filters.price) {
                // Lọc sản phẩm theo giá
                if (filters.price === "above-5m") {
                    console.log("above-5m");
                    console.log(combinedProducts);
                    combinedProducts = combinedProducts.filter((product) => {
                        const price = product.price;
                        return price >= 5000000;
                    });
                    console.log(combinedProducts);
                }
                if (filters.price === "under-2m") {
                    combinedProducts = combinedProducts.filter((product) => {
                        const price = product.price;
                        return price < 2000000;
                    });
                }
                if (filters.price === "2-5m") {
                    combinedProducts = combinedProducts.filter((product) => {
                        const price = product.price;
                        return price >= 2000000 && price < 5000000;
                    });
                }
            }

            setProducts(combinedProducts);
        } catch (error) {
            console.error("Error fetching product types:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!searchDebounce) {
            fetchProductType(null, limit, filters);
        }
    }, [limit, filters]);

    useEffect(() => {
        if (searchResults && searchDebounce) {
            setProducts(searchResults?.data || []);
        }
    }, [searchResults]);

    const handleFilterChange = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        console.log(filters);
    };

    return (
        <Loading isLoading={isPending || loading}>
            <div
                className="body"
                style={{
                    width: "100%",
                    backgroundColor: "#efefef",
                }}
            >
                <div
                    id="container"
                    style={{
                        width: "1270px",
                        margin: "0 auto",
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                    }}
                >
                    <WrapperNavbar span={4}>
                        <NavBarComponent onFilterChange={handleFilterChange} />
                    </WrapperNavbar>
                    <Col
                        span={20}
                        style={{
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            marginTop: "20px",
                            marginBottom: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <SliderComponent
                            arrImages={[
                                slider1,
                                slider2,
                                slider3,
                                slider4,
                                slider5,
                            ]}
                        />
                        <WrapperProducts>
                            {products?.map((product) => {
                                return (
                                    <CardComponent
                                        key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                        id={product._id}
                                    />
                                );
                            })}
                        </WrapperProducts>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px",
                                marginBottom: "20px",
                            }}
                        >
                            <WrapperButtonMore
                                textbutton={loading ? "Load more" : "Xem thêm"}
                                type="outline"
                                styleButton={{
                                    border: `1px solid ${
                                        searchResults?.total ===
                                        searchResults?.data?.length
                                            ? "#f5f5f5"
                                            : "var(--primary-color)"
                                    }`,
                                    color: `${
                                        searchResults?.total ===
                                        searchResults?.data?.length
                                            ? "#f5f5f5"
                                            : "var(--primary-color)"
                                    }`,
                                    width: "240px",
                                    height: "38px",
                                    borderRadius: "4px",
                                }}
                                disabled={
                                    searchResults?.total ===
                                    searchResults?.data?.length
                                }
                                styleTextButton={{
                                    fontWeight: 500,
                                    color:
                                        searchResults?.total ===
                                            searchResults?.data?.length &&
                                        "#fff",
                                }}
                                onClick={
                                    searchResults?.total ===
                                        searchResults?.data?.length ||
                                    searchResults?.totalPage === 1
                                        ? undefined
                                        : () => setLimit((prev) => prev + 5)
                                }
                            />
                        </div>
                    </Col>
                </div>
            </div>
        </Loading>
    );
};

export default HomePage;
