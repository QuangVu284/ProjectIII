import { Button } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButttonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textbutton,
        bordered,
        backgroundColorInput = "#fff",
        backgroundcolor = "#3397f3",
        colorButton = "#fff",
    } = props;

    return (
        <div style={{ display: "flex" }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput }}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{
                    background: backgroundcolor,
                    border: !bordered && "none",
                }}
                icon={<SearchOutlined style={{ color: "#fff" }} />}
                textbutton={textbutton}
                styleTextButton={{ color: colorButton }}
            />
        </div>
    );
};

export default ButttonInputSearch;
