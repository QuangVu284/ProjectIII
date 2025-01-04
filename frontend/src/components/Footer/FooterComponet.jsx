import React from "react";
import "./style.css";

const FooterComponet = () => {
    return (
        <section class="footer">
            <div class="footer_main">
                <div class="footer_box">
                    <div class="footer_left">
                        <img src="images/logo.png" alt="" />

                        <h5>Theo dõi</h5>
                        <div class="icons_social">
                            <div>
                                <i
                                    style={{ color: "blue" }}
                                    class="fa-brands fa-facebook"
                                ></i>
                            </div>
                            <div>
                                <i
                                    style={{ color: "red" }}
                                    class="fa-brands fa-instagram"
                                ></i>
                            </div>
                            <div>
                                <i
                                    style={{
                                        color: "#1DA1F2",
                                    }}
                                    class="fa-brands fa-twitter"
                                ></i>
                            </div>
                            <div>
                                <i
                                    style={{ color: "red" }}
                                    class="fa-brands fa-youtube"
                                ></i>
                            </div>
                        </div>
                    </div>

                    <div class="footer_center">
                        <h5>Tag sản phẩm</h5>
                        <div class="tags_product">
                            <span>Casio</span>
                            <span>Phụ kiện</span>
                            <span>Dây lưng</span>
                            <span>Ví da</span>
                            <span>Tú xách</span>
                            <span>Dw</span>
                            <span>Movado</span>
                            <span>Lorem</span>
                            <span>Ipsum</span>
                            <span>Dolor</span>
                            <span>Ví da</span>
                            <span>Dw</span>
                            <span>Movado</span>
                        </div>
                    </div>

                    <div class="footer_right">
                        <h5>Địa chỉ cửa hàng</h5>
                        <div class="info">
                            <h6>Showroom</h6>
                            <p>
                                Tầng 4, Tòa nhà Hanoi Group, 442 Đội Cấn, Ba
                                Đình, Hà Nội
                            </p>
                        </div>

                        <div class="info">
                            <h6>Hỗ trợ & Tư vấn</h6>
                            <p>(04) 6674 2332 - (04) 3786 8904</p>
                        </div>

                        <div class="info">
                            <h6>Email</h6>
                            <p>Tiki@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterComponet;
