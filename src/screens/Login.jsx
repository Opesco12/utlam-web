import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import StyledText from "../components/StyledText";
import { Colors } from "../constants/Colors";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";

import { userLoginSchema } from "../validationSchemas/userSchema";
import { userStorage } from "../storage/userStorage";
import { login } from "../api";
import SmallLoadingSpinner from "../components/SmallLoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen">
      <ToastContainer />
      <div className="grid md:grid-cols-2">
        <div className="bg-primary h-screen hidden md:block"></div>

        <div className="flex h-screen items-center justify-center ">
          <div className=" flex flex-col gap-5  w-[90%] mx-auto lg:w-[60%]">
            <div className="mb-3">
              <StyledText
                type="heading"
                variant="semibold"
                color={Colors.primary}
              >
                Welcome Back!
              </StyledText>
              <br />
              <StyledText
                color={Colors.light}
                variant="medium"
                type="body"
              >
                Log in to your account
              </StyledText>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={userLoginSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const { email, password } = values;

                const userData = await login(email, password);

                if (userData) {
                  console.log(userData);
                  navigate("/account/2fa", { state: { email: email } });
                }
                setSubmitting(false);
              }}
            >
              {({ handleChange, handleSubmit, isSubmitting }) => (
                <>
                  <AppTextField
                    label="Email"
                    name="email"
                    onChange={handleChange("email")}
                  />
                  <AppTextField
                    label="Password"
                    name="password"
                    onChange={handleChange("password")}
                    type="password"
                  />
                  <StyledText
                    style={{ textAlign: "right" }}
                    className={"text-light hover:text-primary"}
                  >
                    <span onClick={() => navigate("/forgot_password")}>
                      Forgot Password?
                    </span>
                  </StyledText>
                  <AppButton onClick={handleSubmit}>
                    {isSubmitting ? (
                      <SmallLoadingSpinner color={Colors.white} />
                    ) : (
                      "Login"
                    )}
                  </AppButton>
                </>
              )}
            </Formik>
            <StyledText style={{ textAlign: "center" }}>
              Don't have an account?
              <span
                className="text-primary cursor-pointer ml-[5px]"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </StyledText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
