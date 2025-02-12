import './App.css'
import { Header, Footer, SingleProduct, Notification } from './components'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home, About, AllProducts, Cart, Collection, ListOrders, Contact, LoginPage, PlaceOrder, SignIn, AdminLogin, AdminSignUp, Admin } from './pages'

function App() {

  const location = useLocation()

  const isAdminPage = location.pathname.startsWith('/admin')
  const isAdminLoggedIn = location.pathname.startsWith('/admin/v1')

  return (
    <>
        <div className=' '>
          <Notification/>
          {!isAdminPage && <Header />}
          {isAdminLoggedIn && <Admin />}

          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/allproducts' element={<AllProducts/>} />
            <Route path='/collection' element={<Collection/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/place-order' element={<PlaceOrder/>} />
            <Route path='/signUp' element={<SignIn/>} />
            <Route path='/allOrders' element={<ListOrders/>} />
            <Route path='/singleProduct/:title' element={<SingleProduct/>} />
            <Route path='/admin' element={<Admin/>} />
            <Route path='/admin/login' element={<AdminLogin/>} />
            <Route path='/admin/signUp' element={<AdminSignUp/>} />
            <Route path="/admin/v1/add-items"  element/>
            <Route path="/admin/v1/list-items"  element/>
            <Route path="/admin/v1/order-items" element />
          </Routes>

          {!isAdminPage && <Footer />}

        </div>
    </>
  )
}

export default App
