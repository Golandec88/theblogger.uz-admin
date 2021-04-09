import React from "react";
import {Layout} from "antd";

import bg from "../static/auth-bg.jpg"

const AuthLayout :React.FC = ({children}) => {
    return (
        <Layout className="layout h-100" style={{background: "no-repeat url(" + bg + ")"}}>
            <div className="container-fluid h-100">
                {children}
            </div>
        </Layout>
    )
}
export default AuthLayout