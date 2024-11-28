import { Formik } from "formik";

import HeaderText from "../components/HeaderText";
import ContentBox from "../components/ContentBox";
import AppTextField from "../components/AppTextField";
import AppButton from "../components/AppButton";

const KYC_1 = () => {
  return (
    <div className="h-screen w-full">
      <HeaderText>KYC Details</HeaderText>

      <ContentBox>
        <Formik initialValues={{ nin: "", bvn: "" }}>
          {({ handleChange, handleSubmit }) => (
            <>
              <AppTextField
                name="nin"
                onChange={handleChange("nin")}
                label={"National Identification Number"}
              />
              <AppTextField
                name="bvn"
                onChange={handleChange("bvn")}
                label={"Bank Verification Number"}
              />
              <AppButton>Submit</AppButton>
            </>
          )}
        </Formik>
      </ContentBox>
    </div>
  );
};

export default KYC_1;
