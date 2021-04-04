import React from "react";
import {Layout} from "antd";

const DefaultLayout :React.FC = ({children}) => {

    return (
        <Layout className="app-layout">
            {children}
        </Layout>
    )
}

export default DefaultLayout