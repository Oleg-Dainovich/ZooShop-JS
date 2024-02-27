import {Layout} from './components/Layout.jsx';
import {Routes, Route} from 'react-router-dom';
import ApiPage from './pages/ApiPage';
import {ProductsPage} from './pages/ProductsPage';
import {ProductPage} from './pages/ProductPage';
import {AddProductPage} from './pages/AddProductPage';
import {EditProductPage} from './pages/EditProductPage';
import {RegisterPage} from './pages/RegisterPage';
import {SignInPage} from './pages/SignInPage';
import {ProvidersPage} from './pages/ProvidersPage';
import {CreateProviderPage} from './pages/CreateProviderPage';
import {CouponsPage} from './pages/CouponsPage';
import {CreateCouponPage} from './pages/CreateCouponPage';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/api' element={ <ApiPage/> }/>
        <Route path='/' element={ <ProductsPage/> }/>
        <Route path='/products' element={ <ProductsPage/> }/>
        <Route path='/product-details/:id' element={ <ProductPage/> }/>
        <Route path='/new-product' element={ <AddProductPage/> }/>
        <Route path='/edit-product/:id' element={ <EditProductPage/> }/>
        <Route path='/register' element={ <RegisterPage/> }/>
        <Route path='/signin' element={ <SignInPage/> }/>
        <Route path='/providers' element={ <ProvidersPage/> }/>
        <Route path='/create-provider' element={ <CreateProviderPage/> }/>
        <Route path='/coupons' element={ <CouponsPage/> }/>
        <Route path='/create-coupon' element={ <CreateCouponPage/> }/>
      </Routes>

      <ToastContainer position='bottom-right'></ToastContainer>
    </Layout>
  );
}

export default App;