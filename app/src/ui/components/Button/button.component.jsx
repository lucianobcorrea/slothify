import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  root: {
    backgroundColor: "var(--primary-color)",
    color: "var(--color-white)",
    borderRadius: "20px",
    padding: "10px 30px",
    border: "1px solid var(--secondary-color)",
    "&:hover": {
      backgroundColor: "var(--primary-color-dark)",
      borderColor: "var(--primary-color)",
    },
    fontSize: "16px",
    textTransform: "none",
  },
})(Button);

export function ButtonComponent({ children, classname }) {
  return <StyledButton className={classname}>{children}</StyledButton>;
}
