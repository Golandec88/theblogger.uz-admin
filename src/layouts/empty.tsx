import React from "react";
import {Layout} from "antd";

const EmptyLayout :React.FC = ({children}) => {
    return (
        <Layout className="layout h-100">
            <div className="container h-100">
                {children}
            </div>
        </Layout>
    )
}
export default EmptyLayout