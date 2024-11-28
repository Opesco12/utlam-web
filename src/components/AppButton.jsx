import { Colors } from "../constants/Colors";
import AppRipple from "./AppRipple";
import StyledText from "./StyledText";

const AppButton = ({ children, onClick }) => {
  return (
    <div onClick={onClick}>
      <AppRipple>
        <div className="flex items-center justify-center px-6 py-3  bg-primary  rounded-lg ">
          <StyledText
            type="title"
            variant="medium"
            color={Colors.white}
          >
            {children}
          </StyledText>
        </div>
      </AppRipple>
    </div>
  );
};

export default AppButton;
