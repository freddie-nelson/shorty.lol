import { ButtonHTMLAttributes, useEffect, useState } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const propsNoClassName = { ...props };
  delete propsNoClassName.className;

  return (
    <button
      className={`rounded-lg font-bold bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 disabled:bg-gray-400 text-gray-50 transition-colors duration-300 ${props.className}`}
      {...propsNoClassName}
    >
      {props.children}
    </button>
  );
}
