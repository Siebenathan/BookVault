import styles from "./LinkComponentWithUnderline.module.css";
import { Link } from "react-router-dom";

interface LinkWithUnderlineProps {
  linkText: string;
  to: string;
  navigationState?: unknown;
  underlineColor?: "colorBlue";
  linkStyle?: {fontSize?: string, color?: string, fontWeight?: string};
  className?: string;
}

export default function LinkComponentWithUnderline(props: LinkWithUnderlineProps) {
  return (
    <Link
      className={`${props.className} ${styles.linkStyle}`}
      to={props.to}
      state={props.navigationState}
    >
      {props.linkText}
    </Link>
  );
}
