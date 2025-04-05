import LogIn from "./pages/logIn/LogIn.tsx";
import {Route, Routes} from "react-router";
import SignUp from "./pages/signUp/SignUp.tsx";
import Home from "./pages/home/Home.tsx";
import PageContainer from "./components/PageContainer.tsx";
import MyLinks from "./pages/myLinks/MyLinks.tsx";
import Clicked from "./pages/clicked/Clicked.tsx";
import CreateNewURL from "./pages/createNewURL/CreateNewURL.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<LogIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/home' element={
                    <PageContainer>
                        <Home/>
                    </PageContainer>}/>
                <Route path='/my-links' element={
                    <PageContainer>
                        <MyLinks/>
                    </PageContainer>}/>
                <Route path='/clicked' element={
                    <PageContainer>
                        <Clicked/>
                    </PageContainer>}/>
                <Route path='/create-new-url' element={
                    <PageContainer>
                        <CreateNewURL/>
                    </PageContainer>}/>
            </Routes>
        </>
    )
}

export default App
