import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import style from './ButtonForm.module.scss';

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonFormPropsType = DefaultButtonPropsType & {
  logOutType?: boolean;
};

export const ButtonForm: React.FC<ButtonFormPropsType> = ({
  logOutType,
  className,
  ...restProps
}) => {
  const buttonClassName = `${logOutType ? style.logOutType : ''} ${
    style.buttonForm
  } ${className}`;

  return (
    <button
      className={buttonClassName}
      type="button"
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  );
};
