import { Toaster } from 'sonner';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Landing Page Sections
import Header from '@/sections/Header.js'

import Hero from "@/sections/Hero.js";
import Features from "./sections/Features.js";
import Pricing from "./sections/Pricing.js";
import Faq from "./sections/Faq.js";
import Download from "./sections/Download.js";
import Footer from "./sections/Footer.js";
import HowItWorks from "./sections/About.js";
import WhatIsCryptoDrop from "./sections/What.js";


import FileReceive from "@/components/FileReceive";
import FileUpload from "@/components/FileUpload";
import Login from "@/components/Login";
import Register from "@/components/Register";

function LandingPage() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <WhatIsCryptoDrop />
      <HowItWorks />
      <Features />
      <Pricing />
      <Faq />
      {/* <Testimonials /> */}
      <Download />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/share">
          <Route index element={<Navigate to="/share/send" replace />} />
          <Route path="send" element={<FileUpload />} />
          <Route path="receive" element={<FileReceive />} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
