import React from "react";
import style from "./Input.module.css";

type Props = {
    value:string;
    change:(e: React.FormEvent<EventTarget>)=>void;
    type:string;
    id:string;
    name:string;
    title:string;
    required:boolean;
};

const Input = ({value,change,type,id,name,title,required}: Props) => {
  return (
    <>
      <div
        className={`relative border-b min-w-[150px] px-1 my-8 ${style.container}`}
      >
        <label
          htmlFor={id}
          className={`text-gray-400 absolute text-sm bottom-1 ${
            value && "text-xs bottom-9"
          } ${required&&style.required}`}
        >
          {title}
        </label>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={change}
          className="w-full"
        />
      </div>
    </>
  );
};

export default Input;


{/* date */}
{/* <Input
value={formData.date}
id="dateId"
title="تاریخ"
name="date"
type="date"
change={changeHandler}
required
/> */}

{/* factor number */}
{/* <Input
value={formData.factorNumber}
id="factorNumberId"
title="شماره فاکتور"
name="factorNumber"
type="text"
change={changeHandler}
required
/> */}

{/* type */}
{/* <SelectOption
value={formData.type}
id="typeId"
title="نوع"
name="type"
change={changeHandler}
required
options={["نوع 1", "نوع 2", "نوع 3"]}
/> */}

{/* delivery */}
{/* <SelectOption
value={formData.delivery}
id="deliveryId"
title="نحوه ارسال کالا"
name="delivery"
change={changeHandler}
required={false}
options={["پست", "تیپاکس", "پیک"]}
/> */}


{/* customer */}
{/* <SelectOption
value={formData.customer}
id="customerId"
title="انتخاب مشتری"
name="customer"
change={changeHandler}
required
options={["مشتری سوم", "مشتری دوم", "مشتری اول"]}
/> */}


{/* visitor */}
{/* <SelectOption
value={formData.visitor}
id="visitorId"
title="ویزیتور"
name="visitor"
change={changeHandler}
required={false}
options={["ویزیتور سوم", "ویزیتور دوم", "ویزیتور اول"]}
/> */}


{/* address */}
{/* <SelectOption
value={formData.address}
id="addressId"
title="آدرس"
name="address"
change={changeHandler}
required={false}
options={["آدرس سوم", "آدرس دوم", "آدرس اول"]}
/> */}


{/* customer name */}
{/* <Input
value={formData.customerName}
id="customerNameId"
title="نام مشتری چاپی"
name="customerName"
type="text"
change={changeHandler}
required={false}
/> */}
