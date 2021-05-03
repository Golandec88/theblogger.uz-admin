import React from "react";
import {Layout} from "antd";

const AuthLayout :React.FC = ({children}) => {
    return (
        <Layout className="layout h-100" style={{background: "no-repeat url(https://picsum.photos/1920/1080?random)"}}>
            <div className="container-fluid h-100">
                {children}
            </div>
        </Layout>
    )
}
export default AuthLayout