import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import style from './Search.module.scss';
import { setSearchValue } from '../../redux/Slices/filterSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const ref = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('');
// *************** отстрочка запрса в инпуте с помощю debounce ***************************
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 350),
    [],
  );
// *************** конролируемый инпут и его отстрочка в поиске **************************
  const onChangeInput = (e: any) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value)
  };
// ******* удаляет текст из инпута *******************************************************
  const onClickClear = () => {
    setValue('')
    dispatch(setSearchValue(''));
    // if(ref.current){
    //   ref.current.focus();
    // }
    ref.current?.focus(); // или вариант выше 
  };

  return (
    <div className={style.root}>
      <svg className={style.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g data-name="Layer 2" id="Layer_2">
          <path d="M28.35,25.73l-9.6-9.6A.47.47,0,0,0,18.4,16h0a.47.47,0,0,0-.35.15l-.61.61-1.28-1.29a7.21,7.21,0,1,0-5.44,2.49,7.13,7.13,0,0,0,4.73-1.78l1.29,1.28-.6.61a.5.5,0,0,0,0,.7l9.59,9.6a.48.48,0,0,0,.7,0l1.92-1.92A.48.48,0,0,0,28.35,25.73Zm-22-10.61a6.23,6.23,0,1,1,4.4,1.82A6.24,6.24,0,0,1,6.32,15.12ZM26.08,27.29,17.2,18.4l1.2-1.21,8.89,8.89Z" />
          <path d="M11.24,6.56a.5.5,0,0,0-.5.5.51.51,0,0,0,.5.5,3.22,3.22,0,0,1,2.7,1.81.49.49,0,0,0,.44.28.59.59,0,0,0,.23-.05.49.49,0,0,0,.22-.67A4.18,4.18,0,0,0,11.24,6.56Z" />
        </g>
      </svg>
      <input
        ref={ref}
        value={value}
        onChange={onChangeInput}
        className={style.input}
        placeholder="Поиск пиццы ..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={style.closeIcon}
          version="1.1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <g id="info" />
          <g id="icons">
            <path
              d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"
              id="exit"
            />
          </g>
        </svg>
      )}
    </div>
  );
};
