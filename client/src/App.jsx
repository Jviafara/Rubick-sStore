import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageWrapper from './components/common/PageWrapper';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
// import ProtectedRoutes from './components/ProtectedRoutes';
// import ShowNavbar from './components/ShowNavbar';
// import Cart from './pages/Cart';
// import DashBoard from './pages/DashBoard';
// import Home from './pages/Home';
// import OrderDetails from './pages/OrderDetails';
// import OrderHistory from './pages/OrderHistory';
// import PlaceOrder from './pages/PlaceOrder';
// import Product from './pages/Product';
// import Products from './pages/Products';
// import ShippingAddress from './pages/ShippingAddress';
// import Signin from './pages/Signin';
// import Signup from './pages/Signup';
// import UserProfile from './pages/UserProfile';
import MainLayout from './components/layout/MainLayout';
import routes from './routes/routes';

function App() {
    return (
        <div
            style={{
                backgroundImage: 'url(/assets/background.png)',
            }}
            className="w-full h-full fixed bg-left-top bg-cover">
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
