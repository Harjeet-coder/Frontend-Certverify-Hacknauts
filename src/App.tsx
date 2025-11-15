import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./providers/AppProvider";

/* ---------- PUBLIC PAGES ---------- */
import Landing from "./pages/Landing";
import Login from "./pages/Login";

/* ---------- STUDENT PAGES ---------- */
import StudentDashboard from "./pages/student/Dashboard";
import Portfolio from "./pages/student/Portfolio";

/* ---------- FACULTY PAGES ---------- */
import FacultyVerify from "./pages/faculty/Verify";

/* ---------- ADMIN PAGES ---------- */
import AdminAnalytics from "./pages/admin/Analytics";
import AddUser from "./pages/admin/AddUser";

/* ---------- SHARED ---------- */
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* ============================================================
   PROTECTED ROUTE WRAPPER
============================================================ */
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { user, isAuthenticated } = useApp();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user && !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;

  return <>{children}</>;
};

/* ============================================================
   LANDING ROUTE WITH REDIRECT (handles login state)
============================================================ */
const LandingRedirectWrapper = () => {
  const { user, isAuthenticated } = useApp();

  if (!isAuthenticated) return <Landing />;

  if (user?.role === "student") return <Navigate to="/student/dashboard" replace />;
  if (user?.role === "faculty") return <Navigate to="/faculty/verify" replace />;
  if (user?.role === "admin") return <Navigate to="/admin/analytics" replace />;

  return <Landing />;
};

/* ============================================================
   MAIN APP ROUTER — MUST BE OUTSIDE AppProvider
============================================================ */
const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingRedirectWrapper />} />
        <Route path="/login" element={<Login />} />

        {/* STUDENT ROUTES */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/portfolio"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Portfolio />
            </ProtectedRoute>
          }
        />

        {/* FACULTY ROUTES */}
        <Route
          path="/faculty/verify"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyVerify />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddUser />
            </ProtectedRoute>
          }
        />

        {/* SHARED PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student", "faculty", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

/* ============================================================
   OUTER WRAPPERS (Providers)
============================================================ */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />

        <AppContent />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
