import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Scheduler from "./pages/Scheduler";
import AIComposer from "./pages/AIComposer";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "rgba(23,18,48,0.92)",
                        color: "#ece9f7",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(14px)",
                        borderRadius: "14px",
                        boxShadow: "0 20px 50px -20px rgba(0,0,0,0.8)",
                    },
                    iconTheme: { primary: "#ff4d6d", secondary: "#171230" },
                }}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/accounts" element={<Accounts />}/>
                    <Route path="/schedule" element={<Scheduler />}/>
                    <Route path="/ai-composer" element={<AIComposer />}/>

                </Route>
            </Routes>
        </>
    );
}
