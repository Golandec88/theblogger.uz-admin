import React from "react";
import {Route, Switch, Redirect, BrowserRouter} from "react-router-dom";

import AuthLayout from "./layouts/auth";
import EmptyLayout from "./layouts/empty";
import DefaultLayout from "./layouts/default";

import ErrorPage from "./pages/error";
import AuthPage from "./pages/auth";
import ProfilePage from "./pages/profile";
import ToolsPage from "./pages/profile"

import BloggerOffersPage from "./pages/blogger/offers"
import BloggerPlatformsPage from "./pages/blogger/platforms"
import BloggerCreatePlatformPage from './pages/blogger/platform-create'
import BloggerDealsPage from "./pages/blogger/deals"

import AdvertiserOffersPage from "./pages/advertiser/offers"
import AdvertiserOfferCreatePage from "./pages/advertiser/offer-create"
import AdvertiserSearchPage from "./pages/advertiser/search"
import AdvertiserDealsPage from "./pages/advertiser/deals"

import AdminOffersPage from "./pages/admin/offers"
import AdminLayout from "./layouts/admin";

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
                <Route path='/admin' render={() => (
                    <AdminLayout>
                        <Switch>
                            <Route path='/admin/offers' component={AdminOffersPage} />
                            <Route path='/admin'>
                                <Redirect to={{pathname: '/admin/offers'}} />
                            </Route>
                        </Switch>
                    </AdminLayout>
                )}/>
                <Route path='/' render={() => (
                    <DefaultLayout>
                        <Switch>
                            <Route path='/blogger/offers' component={BloggerOffersPage} />
                            <Route path='/blogger/platforms' component={BloggerPlatformsPage} />
                            <Route path='/blogger/platform/create' component={BloggerCreatePlatformPage}/>
                            <Route path='/blogger/deals' component={BloggerDealsPage} />
                            <Route path='/blogger'>
                                <Redirect to={{pathname: '/blogger/offers'}} />
                            </Route>
                            <Route path='/advertiser/offers' component={AdvertiserOffersPage} />
                            <Route path='/advertiser/offer/create' component={AdvertiserOfferCreatePage} />
                            <Route path='/advertiser/offer/:id' component={AdvertiserOfferCreatePage} />
                            <Route path='/advertiser/search' component={AdvertiserSearchPage} />
                            <Route path='/advertiser/deals' component={AdvertiserDealsPage} />
                            <Route path='/advertiser'>
                                <Redirect to={{pathname: '/advertiser/offers'}} />
                            </Route>
                            <Route path='/settings' component={ProfilePage}/>
                            <Route path='/tools' component={ToolsPage}/>
                        </Switch>
                    </DefaultLayout>
                )}>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes