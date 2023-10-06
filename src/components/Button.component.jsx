import { FC, ButtonHTMLAttributes, FormEvent } from 'react';

const Button = ({
  text,
  variant = 'primary',
  full,
  ...rest // Spread all other HTML attributes here
}) => {
  let buttonClasses = full ? 'w-full ' : 'w-max ';
  buttonClasses += 'rounded-lg py-2 mt-6 font-bold text-sm px-6 ';

  switch (variant) {
    case 'primary':
      buttonClasses += 'bg-blue-500 text-white';
      break;
    case 'secondary':
      buttonClasses += 'bg-gray-700 text-white';
      break;
    case 'success':
      buttonClasses += 'bg-green-500 text-white';
      break;
    case 'danger':
      buttonClasses += 'bg-red-500 text-white';
      break;
    default:
      break;
  }

  return (
    <button className={buttonClasses} {...rest}>
      {text}
    </button>
  );
};

export default Button;
