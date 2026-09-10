import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "../src/components/public/UserContext.jsx";
import Layout from "./components/public/Layout";
import Home from "./pages/Home";
import Contact from "./components/home/Contact";
import About from "./components/home/About";
import Hero from "./components/home/Hero";
import HowItWorks from "./components/home/HowItWorks";
import Testimonials from "./components/home/Testamonials";
import Choose from "./components/home/Choose";
import SoilDetection from "./components/home/Soil-Detection";
import MarketPrice from "./components/home/MarketPrice";
import Diseasedetection from "./components/home/Disease-Detection";
import Weather from "./pages/Weather";
import SoilRecommended from "./services/SoilRecommended";
import FarmerChatbot from "./services/FarmerChatbot";
import DesireCrop from "./services/DesireCrop";
import DiseaseDetails from "./pages/DiseaseDetails";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword"; 
import Dashboard from "./pages/Dashboard"; 
import MicButton from "./pages/MicButton";
import History from "./pages/history";  
import SoilReportDetail from "./pages/soilreport.jsx";
import ChatbotWrapper from './wrapper/ChatbotWrapper'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="choose" element={<Choose />} />
            <Route path="howitworks" element={<HowItWorks />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="hero" element={<Hero />} />
            <Route path="/soil-detection" element={<SoilDetection />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/market-price" element={<MarketPrice />} />
            <Route path="/disease-detection" element={<Diseasedetection />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/result" element={<SoilRecommended />} />
            <Route path="/ai-chatbot" element={<FarmerChatbot />} />
            <Route path="/desire-crop" element={<DesireCrop />} />
            <Route path="/disease-detail" element={<DiseaseDetails />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/soil-report/:timestamp" element={<SoilReportDetail />} />
          </Route>
        </Routes>
        <MicButton />
        <ChatbotWrapper />
      </Router>
    </UserProvider>
  );
}

export default App;