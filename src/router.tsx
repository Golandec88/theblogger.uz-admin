import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import DefaultLayout from "./layouts/default";
import EmptyLayout from "./layouts/empty";
import ErrorPage from "./pages/error";
import IndexPage from "./pages";
import AuthPage from "./pages/auth";
import AuthLayout from "./layouts/auth";

const Routes:React.FC = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' render={() => (
                    <AuthLayout>
                        <Route path='/login' component={AuthPage} />
                    </AuthLayout>
                )}>
                </Route>
                <Route path='/error' render={() => (
                    <EmptyLayout>
                        <Route path='/error' component={ErrorPage} />
                    </EmptyLayout>
                )}/>
                <Route path='/' render={() => (
                    <DefaultLayout>
                        <Switch>
                            <Route path='/dashboard' component={IndexPage} />
                            <Route path='/'>
                                <Redirect to={{pathname: '/dashboard'}} />
                            </Route>
                        </Switch>
                    </DefaultLayout>
                )}>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes