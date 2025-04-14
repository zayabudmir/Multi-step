"use client";
import { useEffect, useState } from "react";
import { InputContainer } from "./InputContainer";
import { InputError } from ".";

export const Step1 = ({
  handleOnChange = () => {},
  errors = {},
  formValues = {},
}) => {
  const fields = [
    {
      title: "First name",
      name: "firstName",
      type: "text",
      errorText: "First name cannot contain special characters or numbers.",
    },
    {
      title: "Last name",
      name: "lastName",
      type: "text",
      errorText: "Last name cannot contain special characters or numbers.",
    },
    {
      title: "Username",
      name: "userName",
      type: "text",
      errorText: "This username is already taken. Please choose another one.",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {fields.map(({ title, name, type, errorText }) => (
        <InputContainer
          key={name}
          title={title}
          id={name}
          name={name}
          type={type}
          placeholder="Placeholder"
          value={formValues[name]}
          errorText={errorText}
          onChange={handleOnChange}
          errors={errors[name]}
        />
      ))}
    </div>
  );
};

export const Step2 = ({
  handleOnChange = () => {},
  errors = {},
  formValues = {},
}) => {
  const fields = [
    {
      title: "Email",
      name: "email",
      type: "email",
      errorText: "Please provide a valid email address.",
    },
    {
      title: "Phone number",
      name: "phoneNumber",
      type: "tel",
      errorText: "Please enter a valid phone number.",
    },
    {
      title: "Password",
      name: "password",
      type: "password",
      errorText: "Password must include letters and numbers.",
    },
    {
      title: "Confirm password",
      name: "confirmPassword",
      type: "password",
      errorText: "Passwords do not match. Please try again.",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {fields.map(({ title, name, type, errorText }) => (
        <InputContainer
          key={name}
          title={title}
          id={name}
          name={name}
          type={type}
          placeholder="Placeholder"
          value={formValues[name]}
          errorText={errorText}
          onChange={handleOnChange}
          errors={errors[name]}
        />
      ))}
    </div>
  );
};

export const Step3 = ({
  handleOnChange = () => {},
  errors = {},
  formValues = {},
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    handleOnChange(event);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="flex flex-col gap-3">
      <InputContainer
        title="Date of birth"
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        value={formValues.dateOfBirth}
        onChange={handleOnChange}
        errors={errors.dateOfBirth}
        errorText="Please select a date."
      />

      <div className="relative gap-3 flex flex-col">
        <input
          type="file"
          id="img"
          name="profileImage"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
        <div className="h-[180px] bg-gray-200 border-none flex flex-col items-center justify-center gap-2">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-[416px] h-[180px] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full p-3 flex items-center justify-center w-10 h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.5 2.5V9.5H2.5V2.5H9.5ZM9.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V9.5C1.5 10.05 1.95 10.5 2.5 10.5H9.5C10.05 10.5 10.5 10.05 10.5 9.5V2.5C10.5 1.95 10.05 1.5 9.5 1.5ZM7.07 5.93L5.57 7.865L4.5 6.57L3 8.5H9L7.07 5.93Z"
                    fill="#202124"
                  />
                </svg>
              </div>
              <label
                htmlFor="img"
                className="cursor-pointer text-black text-[14px] font-medium"
              >
                Add image
              </label>
            </div>
          )}
        </div>
        {errors.profileImage && (
          <InputError errorText="Image cannot be blank" />
        )}
      </div>
    </div>
  );
};

export const Step4 = () => {
  return (
    <div className="text-gray-400 italic text-sm">
      This step is under construction...
    </div>
  );
};
