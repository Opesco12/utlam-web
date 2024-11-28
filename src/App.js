import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";

import { Colors } from "./constants/Colors";
import StyledText from "./components/StyledText";
import ResponsiveSidebar from "./components/AppSidebar";

import HomeScreen from "./screens/HomeScreen";
import Portfolio from "./screens/Portfolio";
import Invest from "./screens/Invest";
import ProductDetails from "./screens/ProductDetails";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Otp from "./screens/OTP";
import NotFound from "./screens/NotFound";
import { history } from "./helperFunctions/navigationHelper";
import PortfolioDetails from "./screens/PortfolioDetails";
import FixedIncomeWithdrawal from "./screens/FixedIcomeWithdrawal";
import Transactions from "./screens/Transactions";
import PersonalDetails from "./screens/PersonalDetails";
import BankDetails from "./screens/BankDetails";
import { userStorage } from "./storage/userStorage";
import { keys } from "./storage/kyes";
import TransactionDetails from "./screens/TransactionDetails";
import MutualFundStatement from "./screens/MutualFundStatement";
import Register from "./screens/Register";
import ChangePassword from "./screens/ChangePassword";

import {
  PublicRoute,
  ProtectedRoute,
  useAuth,
  AuthProvider,
} from "./auth/AuthProvider";
import KYC_1 from "./screens/Kyc_1";
import MutualFunds from "./screens/MutualFunds";
import FixedIncome from "./screens/FixedIncome";

const Layout = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen overflow-hidden  md:flex-row">
        <ToastContainer autoClose={3000} />
        <ResponsiveSidebar />
        <main className="overflow-y-auto w-full ">
          <div className=" px-[15px] py-[25px] w-full flex-1 mx-auto  md:px-[30px]  lg:px-[45px] md:max-w-[800px] lg:max-w-[940px]">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              path="/"
              element={<HomeScreen />}
            />
            <Route
              path="invest"
              element={<Invest />}
            />
            <Route
              path="portfolio"
              element={<Portfolio />}
            />
            <Route
              path="profile"
              element={<Profile />}
            />
            <Route
              path="/invest/:productId"
              element={<ProductDetails />}
            />

            <Route
              path="/invest/mutual_fund"
              element={<MutualFunds />}
            />
            <Route
              path="/invest/fixed_income"
              element={<FixedIncome />}
            />

            <Route
              path="/portfolio/:portfolioName"
              element={<PortfolioDetails />}
            />

            <Route
              path="/portfolio/:portfolioName/statement"
              element={<MutualFundStatement />}
            />

            <Route
              path="/portfolio/:portfolioName/withdraw"
              element={<FixedIncomeWithdrawal />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/transaction/details"
              element={<TransactionDetails />}
            />

            <Route
              path="/profile/personal-details"
              element={<PersonalDetails />}
            />

            <Route
              path="/profile/bank-details"
              element={<BankDetails />}
            />

            <Route
              path="/kyc/1"
              element={<KYC_1 />}
            />

            <Route
              path="/change-password"
              element={<ChangePassword />}
            />

            <Route
              path="/404"
              element={<NotFound />}
            />
          </Route>
          <Route
            index
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
            replace
          />

          <Route
            path="/account/activate"
            element={
              <PublicRoute>
                <Otp />
              </PublicRoute>
            }
          />
          <Route
            path="/account/2fa"
            element={
              <PublicRoute>
                <Otp />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                to={"/404"}
                replace
              />
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
