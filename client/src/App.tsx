import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Nav from "@/components/app/Nav";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Account from "@/views/Account";
import Track from "@/views/Track";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col px-5 py-4 sm:px-8 sm:py-6 md:px-12 md:py-10 w-full min-h-full bg-gray-50">
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/track/:slug" element={<Track />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
