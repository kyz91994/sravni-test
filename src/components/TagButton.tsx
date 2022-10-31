import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import style from './TagButton.module.scss';

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type TagButtonPropsType = DefaultButtonPropsType & {};

export const TagButton: React.FC<TagButtonPropsType> = ({ ...restProps }) => {
  return (
    <button
      className={style.tagButton}
      type="button"
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  );
};
