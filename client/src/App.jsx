import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageWrapper from './components/common/PageWrapper';
import MainLayout from './components/layout/MainLayout';
import routes from './routes/routes';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function App() {
    return (
        <div className="w-full h-full -z-[999]">
            <div
                style={{
                    backgroundImage: 'url(/assets/background.jpg)',
                }}
                className="w-[100vw] h-full fixed bg-left-top bg-cover -z-[999]"
            />
            {/* config Toastify */}
            <ToastContainer
                position="bottom-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {routes.map((route, index) =>
                            route.index ? (
                                <Route
                                    index
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            ) : (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            )
                        )}
                    </Route>
                    {/* <Route path="/" element={<Home />} />
                    <Route path="/product/slug/:slug" element={<Product />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/shippingAddress"
                        element={<ShippingAddress />}
                    />
                    <Route path="/place-order" element={<PlaceOrder />} />
                    <Route path="/order/:id" element={<OrderDetails />} />
                    <Route path="/orders-history" element={<OrderHistory />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoutes>
                                <DashBoard />
                            </ProtectedRoutes>
                        }
                    /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
