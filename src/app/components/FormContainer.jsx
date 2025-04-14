"use client";
import { useState } from "react";
import { Header } from ".";
import { motion } from "framer-motion";
import { Step1, Step2, Step3, Step4 } from "./Steps";
import { ButtonContainer } from "./ButtonContainer";
import { Header2 } from "./Header";
import { initialFormValues } from "@/utils/functions";

export const FormContainer = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [count, setCount] = useState(0);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
    dateOfBirth: false,
    profileImage: false,
  });

  const CurrentSteps = [Step1, Step2, Step3, Step4][count];

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previousValues) => ({ ...previousValues, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  const handleForward = () => {
    if (count >= 3) return;

    let newErrors = {};

    if (count === 0) {
      newErrors = {
        firstName: formValues.firstName.trim() === "",
        lastName: formValues.lastName.trim() === "",
        userName: formValues.userName.trim() === "",
      };
    }

    if (count === 1) {
      newErrors = {
        email: formValues.email.trim() === "",
        phoneNumber: formValues.phoneNumber.trim() === "",
        password: formValues.password.trim() === "",
        confirmPassword: formValues.confirmPassword.trim() === "",
      };
      if (formValues.password !== formValues.confirmPassword) {
        newErrors.confirmPassword = true;
      }
      if (
        !/[A-Za-z]/.test(formValues.password) ||
        !/\d/.test(formValues.password)
      ) {
        newErrors.password = true;
      }

      if (!/^\d+$/.test(formValues.phoneNumber)) {
        newErrors.phoneNumber = true;
      }

      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          formValues.email
        )
      ) {
        newErrors.email = true;
      }
    }

    if (count === 2) {
      newErrors = {
        dateOfBirth: formValues.dateOfBirth.trim() === "",
        profileImage: formValues.profileImage.trim() === "",
      };
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.log("Error: Some fields are empty.");
      return;
    }

    setCount(count + 1);
  };

  const handleBackward = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <motion.div
        key={count}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        className={`w-[480px] h-fit bg-white flex flex-col justify-between p-8 rounded-[8px] ${
          count == 3 ? "" : "min-h-[655px]"
        }`}
      >
        <div className="flex flex-col gap-7">
          {count == 3 ? <Header2 /> : <Header />}

          <CurrentSteps
            handleOnChange={handleOnChange}
            errors={errors}
            formValues={formValues}
          />
        </div>
        <ButtonContainer
          handleForward={handleForward}
          handleBackward={handleBackward}
          count={count}
        />
      </motion.div>
    </div>
  );
};
