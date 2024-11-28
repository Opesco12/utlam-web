import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";

import StyledText from "../components/StyledText";
import { Colors } from "../constants/Colors";
import AppTextField from "../components/AppTextField";

import { userRegisterSchema } from "../validationSchemas/userSchema";
import AppSelect from "../components/AppSelect";
import { useEffect, useState } from "react";
import { getCountries, registerNewIndividual } from "../api";
import AppButton from "../components/AppButton";
import { useNavigate } from "react-router-dom";
import SmallLoadingSpinner from "../components/SmallLoadingSpinner";

const Register = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const genderOptions = [
    {
      label: "Male",
      value: "M",
    },
    { label: "Female", value: "F" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const countries = await getCountries();
      if (countries) {
        setCountries(
          countries.map((country) => ({
            label: country.name,
            value: country.code,
          }))
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <ToastContainer />
      <div className="grid md:grid-cols-2">
        <div className="bg-primary h-screen hidden md:block"></div>

        <div className="h-screen overflow-y-auto ">
          <div className="flex items-center justify-center mb-[30px]">
            <div className=" flex flex-col gap-5  w-[90%] mx-auto lg:w-[60%]">
              <div className="mt-[35px] mb-3">
                <StyledText
                  type="heading"
                  variant="semibold"
                  color={Colors.primary}
                >
                  Hello, it's nice to meet you
                </StyledText>
                <br />
                <StyledText
                  color={Colors.light}
                  variant="medium"
                  type="body"
                >
                  Sign up for an account below
                </StyledText>
              </div>
              <Formik
                validationSchema={userRegisterSchema}
                initialValues={{
                  firstname: "",
                  lastname: "",
                  phoneNumber: "",
                  email: "",
                  password: "",
                  dob: "",
                  gender: "",
                  country: "",
                  confirmPassword: "",
                  address: "",
                  city: "",
                  state: "",
                  clientType: 1,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log(values);
                  const {
                    address,
                    city,
                    clientType,
                    firstname,
                    lastname,
                    phoneNumber,
                    email,
                    password,
                    dob,
                    gender,
                    country,
                    state,
                  } = values;
                  const DOB = new Date(dob).toISOString();

                  const data = {
                    dateOfBirth: DOB,
                    emailAddress: email,
                    password: password,
                    firstName: firstname,
                    lastName: lastname,
                    phoneNo: phoneNumber,
                    clientType: clientType,
                    gender: gender,
                    address1: address,
                    city: city,
                    state: state,
                    country: country,
                  };

                  const response = await registerNewIndividual(data);

                  if (response) {
                    setSubmitting(false);
                    toast.success("Your account has been created succesfully");
                    navigate("/account/activate", {
                      state: { email: email, header: "Activate Account" },
                    });
                  }

                  setSubmitting(false);
                }}
              >
                {({ handleChange, handleSubmit, isSubmitting }) => (
                  <>
                    <AppTextField
                      onChange={handleChange("firstname")}
                      name="firstname"
                      label={"First Name"}
                    />
                    <AppTextField
                      onChange={handleChange("lastname")}
                      name="lastname"
                      label={"Last Name"}
                    />
                    <AppTextField
                      onChange={handleChange("phoneNumber")}
                      name="phoneNumber"
                      label={"Phone Number"}
                    />
                    <AppTextField
                      onChange={handleChange("email")}
                      name="email"
                      label={"Email Address"}
                      type="email"
                    />
                    <AppSelect
                      name={"gender"}
                      options={genderOptions}
                      onValueChange={(value) => {
                        setGender(value);
                      }}
                      label="Gender"
                    />
                    <AppTextField
                      type="date"
                      name="dob"
                      label={"Date of birth"}
                      placeholder=""
                      onChange={handleChange("dob")}
                    />
                    <AppTextField
                      name={"address"}
                      onChange={handleChange("address")}
                      label={"Address"}
                    />
                    <AppTextField
                      name={"city"}
                      onChange={handleChange("city")}
                      label={"City"}
                    />
                    <AppTextField
                      name={"state"}
                      onChange={handleChange("state")}
                      label={"State"}
                    />

                    <AppSelect
                      name="country"
                      label="Country"
                      options={countries}
                      onValueChange={(value) => {
                        setSelectedCountry(value);
                      }}
                    />

                    <AppTextField
                      onChange={handleChange("password")}
                      name={"password"}
                      label={"Password"}
                      type="password"
                    />

                    <AppTextField
                      onChange={handleChange("confirmPassword")}
                      name="confirmPassword"
                      label={"Confirm Password"}
                      type="password"
                    />
                    <StyledText
                      color={Colors.light}
                      className={"text-center"}
                    >
                      By signing up, you agree to the{" "}
                      <span className="text-primary">
                        Terms of Use & Privacy Policy
                      </span>
                    </StyledText>
                    <AppButton onClick={handleSubmit}>
                      {isSubmitting === true ? (
                        <SmallLoadingSpinner color={Colors.white} />
                      ) : (
                        "Register"
                      )}
                    </AppButton>

                    <StyledText style={{ textAlign: "center" }}>
                      Already have an account?
                      <span
                        className="text-primary cursor-pointer ml-[5px]"
                        onClick={() => navigate("/login")}
                      >
                        Sign in
                      </span>
                    </StyledText>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
