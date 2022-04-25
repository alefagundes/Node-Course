import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//pages
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Profile from './components/pages/User/Profile'
import Container from './components/layout/Container'

//components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'

//context
import { UserProvider } from './context/UserContext'
import MyPets from './components/pages/Pet/MyPets'
import AddPet from './components/pages/Pet/AddPet'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'

function App() {
    return (
        <Router>
            <UserProvider>
                <Navbar />
                <Message />
                <Container>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/user/profile"
                            element={<Profile />}
                        ></Route>
                        <Route path="/pet/mypets" element={<MyPets />} />
                        <Route path="/pet/add" element={<AddPet />} />
                        <Route path="/pet/edit/:id" element={<EditPet />} />
                        <Route
                            path="/pet/myadoptions"
                            element={<MyAdoptions />}
                        />
                        <Route path="/pet/:id" element={<PetDetails />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Container>
                <Footer />
            </UserProvider>
        </Router>
    )
}

export default App
