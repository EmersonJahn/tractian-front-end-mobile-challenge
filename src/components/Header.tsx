import { Button, SafeArea, Space } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import { Link } from "react-router-dom";

import './Header.css'

interface HeaderProps {
    title: string;
    goBackTo?: string;
}

export default (props: HeaderProps) => (
    <Space className="header" align="center">
        <SafeArea position="top" />
        {/* TRACTIAN - FRONT-END - MOBILE CHALLENGE */}
        { !!props.goBackTo ?
            <Link to={"/"}>
                <Button
                    className="back-button"
                    color="primary"
                    // fill="none"
                >
                    <LeftOutline />
                </Button>
            </Link>
        : null}
        <h3>
            {props.title}
        </h3>
    </Space>
);