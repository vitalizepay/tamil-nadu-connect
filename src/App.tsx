import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import Ads from "./pages/Ads.tsx";
import Bearers from "./pages/Bearers.tsx";
import NotFound from "./pages/NotFound.tsx";
import PartyRegistration from "./pages/PartyRegistration.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/bearers" element={<Bearers />} />
          <Route path="/bearers_registration" element={<PartyRegistration />} />
          <Route path="/party-registration" element={<PartyRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
