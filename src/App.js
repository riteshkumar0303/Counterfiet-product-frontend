import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';

const Home = lazy(() => import('./components/home/Home'));
const AboutUs = lazy(() => import('./components/home/AboutUs'));
const Login = lazy(() => import('./components/home/Login'));
const ScannerPage = lazy(() => import('./components/pages/ScannerPage'));
const Admin = lazy(() => import('./components/pages/Admin'));
const Manufacturer = lazy(() => import('./components/pages/Manufacturer'));
const Supplier = lazy(() => import('./components/pages/Supplier'));
const Retailer = lazy(() => import('./components/pages/Retailer'));
const AddAccount = lazy(() => import('./components/pages/AddAccount'));
const ManageAccount = lazy(() => import('./components/pages/ManageAccount'));
const AddProduct = lazy(() => import('./components/pages/AddProduct'));
const Profile = lazy(() => import('./components/pages/Profile'));
const UpdateProduct = lazy(() => import('./components/pages/UpdateProduct'));
const Product = lazy(() => import('./components/pages/Product'));
const AuthenticProduct = lazy(() => import('./components/pages/AuthenticProduct'));
const FakeProduct = lazy(() => import('./components/pages/FakeProduct'));
const UpdateProductDetails = lazy(() => import('./components/pages/UpdateProductDetails'));
const Otp = lazy(() => import('./components/pages/Otp'));
const OurStory = lazy(() => import('./components/home/OurStory'));



function App() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Layout />}>

          {/* public routes */}
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/aboutUs' element={< AboutUs />}></Route>
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/scanner' element={< ScannerPage />}></Route>
          <Route exact path='/product' element={< Product />}></Route>
          <Route exact path='/our-story' element={< OurStory />}></Route>
          {/* <Route exact path='/manufacturer' element={< Manufacturer/>}></Route> */}
          <Route exact path='/authentic-product' element={< AuthenticProduct />}></Route>
          <Route exact path='/fake-product' element={< FakeProduct />}></Route>
          <Route exact path='/Otp' element={< Otp />}></Route>
          {/* private routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>

            <Route exact path='/admin' element={< Admin />}></Route>


            <Route exact path='/add-account' element={< AddAccount />}></Route>
            <Route exact path='/manage-account' element={< ManageAccount />}></Route>

          </Route>

          <Route element={<RequireAuth allowedRoles={["manufacturer", "supplier", "retailer"]} />}>
            <Route exact path='/profile' element={< Profile />}></Route>
            <Route exact path='/update-product' element={< UpdateProduct />}></Route>
            <Route exact path='/update-product-details' element={< UpdateProductDetails />}></Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["supplier", "retailer"]} />}>
            <Route exact path='/update-product' element={< UpdateProduct />}></Route>
            <Route exact path='/update-product-details' element={< UpdateProductDetails />}></Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["manufacturer"]} />}>
            <Route exact path='/manufacturer' element={< Manufacturer />}></Route>
            <Route exact path='/add-product' element={< AddProduct />}></Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["supplier"]} />}>
            <Route exact path='/supplier' element={< Supplier />}></Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["retailer"]} />}>
            <Route exact path='/retailer' element={< Retailer />}></Route>
          </Route>

          {/* catch all */}
          {/* <Route path='*' element={< Missing />}></Route> */}

        </Route>
      </Routes>
    </Suspense>

  );
}

export default App;
