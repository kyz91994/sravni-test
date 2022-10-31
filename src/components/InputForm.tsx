import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import style from './InputForm.module.scss';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

export const InputForm: React.FC<SuperInputTextPropsType> = ({
  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  return (
    <input
      className={style.inputForm}
      {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
    />
  );
};
