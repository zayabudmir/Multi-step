"use client";

export const InputError = ({ ErrorText }) => {
  if (!ErrorText) return null;

  return <p className="text-red-500 text-sm mt-1">{ErrorText}</p>;
};
