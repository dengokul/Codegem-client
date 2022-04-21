import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));

// function GuestRoute({ children }: { children: JSX.Element }) {
//   const { accessToken } = useAuth();
//   let location = useLocation();
//   if (accessToken === undefined) return null;
//   if (accessToken) {
//     return <Navigate to={"/dashboard"} state={{ from: location }} />;
//   }

//   return children;
// }

// function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { accessToken } = useAuth();
//   let location = useLocation();
//   if (accessToken === undefined) return null;
//   if (!accessToken) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return children;
// }

const RoutesScreen = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesScreen;
