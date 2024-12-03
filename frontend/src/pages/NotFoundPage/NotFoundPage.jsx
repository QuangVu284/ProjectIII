import React from "react";
import BackGroundNotFoundPage from "../../assets/images/BackGroundNotFoundPage.jpg";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                backgroundImage: `url(${BackGroundNotFoundPage})`,
                // backgroundSize: "cover",
                // backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <div
                style={{
                    position: "fixed",
                    bottom: 100,
                    right: "calc(50% - 80px)",
                    width: "160px",
                    fontSize: "20px",
                    textAlign: "center",
                    backgroundColor: "#00FFFF",
                    color: "#668B8B",
                    borderRadius: "10px",
                    padding: "10px",
                    border: "2px solid #73AD21",
                    cursor: "pointer",
                }}
                onClick={() => {
                    navigate("/");
                }}
            >
                <ArrowLeftOutlined
                    style={{
                        marginRight: "10px",
                    }}
                />
                Go back
            </div>
        </div>
    );
};

export default NotFoundPage;
