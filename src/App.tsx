import { ConfigProvider } from "antd";
import React from "react";
import ru from 'antd/lib/locale/ru_RU'
import Routes from "./router";

const App: React.FC = () => (
    <ConfigProvider locale={ru}>
        <div className='app container-fluid px-0' style={{height: '100vh'}} >
            <Routes />
        </div>
    </ConfigProvider>
)

export default App;