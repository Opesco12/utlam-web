import { Modal, Box } from "@mui/material";
import { useState } from "react";

import HeaderText from "../components/HeaderText";
import StyledText from "../components/StyledText";
import { Colors } from "../constants/Colors";
import { AddCircle, Bank } from "iconsax-react";
import { Formik } from "formik";
import AppTextField from "../components/AppTextField";
import AppSelect from "../components/AppSelect";
import AppButton from "../components/AppButton";
import AppModal from "../components/AppModal";

const BankDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <HeaderText>Bank Details</HeaderText>

      <div className="grid md:grid-cols-2">
        <BankItem />

        <div
          onClick={() => setIsModalOpen(true)}
          className="w-[100%] h-[180px] my-[20px] border rounded-lg flex items-center justify-center"
        >
          <div className="flex items-center justify-center flex-col">
            <AddCircle
              size={25}
              color={Colors.light}
            />
            <StyledText color={Colors.light}>Add Bank Details</StyledText>
          </div>
        </div>
      </div>

      <AppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Bank Details"}
      >
        <Formik>
          {() => (
            <div className="flex flex-col gap-[25px] my-[25px]">
              <AppSelect label="Bank" />
              <AppTextField
                name="accountNo"
                label={"Account Number"}
              />
              <AppTextField
                name="accountName"
                label={"Account Name"}
              />
              <AppButton>Submit</AppButton>
            </div>
          )}
        </Formik>
      </AppModal>
    </div>
  );
};

export default BankDetails;

const BankItem = () => {
  return (
    <div className="w-[100%] my-[20px] h-[180px] bg-primary rounded-lg px-[20px] flex items-center justify-between">
      <div>
        <StyledText
          variant="medium"
          type="title"
          color={Colors.white}
        >
          UNITED BANK FOR AFRICA
        </StyledText>
        <br />

        <StyledText color={Colors.white}>2055664487</StyledText>
        <br />

        <StyledText
          color={Colors.white}
          variant="medium"
        >
          Evelyn Makinwa
        </StyledText>
      </div>
      <Bank
        size={25}
        color={Colors.white}
      />
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  borderWidth: 0,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,
};
