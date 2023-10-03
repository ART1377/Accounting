import React from 'react'
import style from './SelectOption.module.css'

type Props = {
    value:string;
    change:(e: React.FormEvent<EventTarget>)=>void;
    id:string;
    name:string;
    title:string;
    options:string[];
    required:boolean;
}

const SelectOption = ({value,change,id,name,title,required,options}: Props) => {
  return (
    <div
              className={`relative border-b min-w-[300px] px-1 my-8 ${style.container}`}
            >
              <label
                htmlFor={id}
                className={`text-gray-400 absolute text-sm bottom-1 ${
                  value && "text-xs bottom-9"
                } ${required&&style.required}`}
              >
                {title}
              </label>
              <select
                className="text-gray-400 w-full"
                name={name}
                id={id}
                value={value}
                onChange={change}
              >
                <option value=""></option>
                {options.map(item=>{
                    return(
                        <option key={item} value={item}>{item}</option>
                    )
                })}
              </select>
            </div>
  )
}

export default SelectOption