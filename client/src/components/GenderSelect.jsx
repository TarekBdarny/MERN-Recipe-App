import React, { useState } from "react";

function GenderSelect({ handleInputs }) {
  const [genderSelected, setGenderSelected] = useState("");
  return (
    <div className="flex justify-center items-center gap-3 w-full">
      <label htmlFor="radio-1">Male</label>
      <input
        type="radio"
        id="radio-1"
        className="radio"
        name="gender"
        value="male"
        onChange={handleInputs}
        checked={genderSelected === "male"}
      />
      <label htmlFor="radio-2">Female</label>
      <input
        type="radio"
        id="radio-2"
        className="radio"
        name="gender"
        value="male"
        onChange={handleInputs}
        checked={genderSelected === "female"}
      />
    </div>
  );
}

export default GenderSelect;
