import {
  ArrowRight2,
  Setting,
  Book,
  ClipboardTick,
  Headphone,
  Lock1,
  UserOctagon,
  Profile as ProfileIcon,
} from "iconsax-react";
import { Navigate, useNavigate } from "react-router-dom";

import ContentBox from "../components/ContentBox";
import HeaderText from "../components/HeaderText";
import StyledText from "../components/StyledText";
import { Colors } from "../constants/Colors";

import { userStorage } from "../storage/userStorage";
import { keys } from "../storage/kyes";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  useEffect(() => {
    const userData = userStorage.getItem(keys.user);
    if (userData) {
      setName(userData?.fullName);
    } else {
      Navigate("/login");
    }
  }, []);
  return (
    <div>
      <HeaderText>My Profile</HeaderText>

      <ContentBox
        width={"100%"}
        backgroundColor={Colors.primary}
      >
        <div className="flex justify-between items-center py-3">
          <div>
            <StyledText
              type="heading"
              variant="medium"
              color={Colors.white}
            >
              Profile
            </StyledText>
            <br />
            <StyledText color={Colors.white}>{name}</StyledText>
          </div>
          <img
            alt=""
            src="/images/utlam-default.webp"
            className="rounded-full h-[50px] w-[50px]  md:w-[100px] md:h-[100px] "
          />
        </div>
      </ContentBox>

      <div className="mt-8 ">
        <ContentBox className={"md:w-[50%]"}>
          <div className="flex items-center gap-2 mb-7">
            <StyledText color={Colors.primary}>Account Settings</StyledText>
          </div>
          <hr />
          <div
            onClick={() => navigate("/profile/personal-details")}
            className="flex flex-row items-center justify-between py-4 bg-white hover:bg-border"
          >
            <StyledText style={{ display: "flex", gap: "10px" }}>
              <ProfileIcon
                size={25}
                color={Colors.primary}
              />
              Personal Details
            </StyledText>
            <ArrowRight2
              size={17}
              color={Colors.primary}
              variant="Bold"
            />
          </div>
          <hr />

          <div
            onClick={() => navigate("/profile/bank-details")}
            className="flex flex-row items-center justify-between py-4 bg-white hover:bg-border"
          >
            <StyledText style={{ display: "flex", gap: "10px" }}>
              <Book
                size={25}
                color={Colors.primary}
              />
              Bank Details
            </StyledText>
            <ArrowRight2
              size={17}
              color={Colors.primary}
              variant="Bold"
            />
          </div>
          <hr />

          <div
            onClick={() => navigate("/kyc/1")}
            className="flex flex-row items-center justify-between py-4 bg-white hover:bg-border"
          >
            <StyledText style={{ display: "flex", gap: "10px" }}>
              <ClipboardTick
                size={25}
                color={Colors.primary}
              />
              KYC
            </StyledText>
            <ArrowRight2
              size={17}
              color={Colors.primary}
              variant="Bold"
            />
          </div>
          <hr />

          <div
            onClick={() => navigate("/change-password")}
            className="flex flex-row items-center justify-between py-4 bg-white hover:bg-border"
          >
            <StyledText style={{ display: "flex", gap: "10px" }}>
              <Lock1
                size={25}
                color={Colors.primary}
              />
              Change Password
            </StyledText>
            <ArrowRight2
              size={17}
              color={Colors.primary}
              variant="Bold"
            />
          </div>
          <hr />

          <div className="flex flex-row items-center justify-between py-4 bg-white hover:bg-border">
            <StyledText style={{ display: "flex", gap: "10px" }}>
              <UserOctagon
                size={25}
                color={Colors.primary}
              />
              Contact Account Manager
            </StyledText>
            <ArrowRight2
              size={17}
              color={Colors.primary}
              variant="Bold"
            />
          </div>
          <hr />

          <div className="flex flex-row items-center justify-between  py-4 bg-white hover:bg-border">
            <StyledText style={{ display: "flex", gap: "10px" }}>
              <Headphone
                size={25}
                color={Colors.primary}
              />
              Help & Support
            </StyledText>
            <ArrowRight2
              size={17}
              color={Colors.primary}
              variant="Bold"
            />
          </div>
        </ContentBox>
      </div>
    </div>
  );
};

export default Profile;
