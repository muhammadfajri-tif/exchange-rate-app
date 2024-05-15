// src/components/CustomDropdown.tsx

import React from "react";
import Select, { OptionProps } from "react-select";
import "./CustomDropdown.scss";

interface OptionType {
  value: string;
  label: string;
  icon: string;
}

const options: OptionType[] = [
  { value: "github", label: "Github", icon: "github" },
  { value: "instagram", label: "Instagram", icon: "instagram" },
  { value: "linkedin", label: "Linkedin", icon: "linkedin" },
  { value: "facebook", label: "Facebook", icon: "facebook" },
  { value: "twitter", label: "Twitter", icon: "twitter" },
];

const SingleValue = ({ data }: { data: OptionType }) => (
  <div className="custom-single-value">
    <i className={`icon-${data.icon}`} />
    {data.label}
  </div>
);

const Option = (props: OptionProps<OptionType, false>) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="custom-option">
      {/* <i className="fas fa-band-aid" /> */}
      {data.label}
    </div>
  );
};

const CustomDropdown: React.FC = () => (
  <Select
    className="custom-dropdown"
    classNamePrefix="custom-dropdown"
    options={options}
    components={{ SingleValue, Option }}
    placeholder="Select Media"
  />
);

export default CustomDropdown;
