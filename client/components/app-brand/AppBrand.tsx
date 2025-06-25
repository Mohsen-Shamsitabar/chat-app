import { type AllHTMLAttributes } from "react";
import { FaRocketchat } from "react-icons/fa";

type Props = AllHTMLAttributes<HTMLDivElement>;

const AppBrand = (props: Props) => {
  return (
    <span {...props}>
      Chat App <FaRocketchat />
    </span>
  );
};

export default AppBrand;
