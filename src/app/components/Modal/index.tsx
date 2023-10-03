"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./Modal.module.css";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hook";
import {
  fetchBills,
  addNewBill,
  deleteBill,
  updateBill,
} from "@/app/redux/slices/bills";
import { Bill } from "../../../next-type.d";
import Button from "../Button";
// import JCalendar from "reactjs-persian-calendar";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  state: string;
  selected: Bill;
  onModal: (value: string) => void;
};

const Modal = ({ state, selected, onModal }: Props) => {




  
  //form validation
  const formik = useFormik({
    initialValues: {
      date:!!(state=='edit'&&selected?.factorDate)
        ? selected?.factorDate.toString().split("T")[0]
        : "",
      factorNumber: !!(state=='edit'&&selected?.factorNumber)
        ? selected?.factorNumber.toString()
        : "",
      type: !!(state=='edit'&&selected?.factorType)
        ? selected?.factorType.toString()
        : "",
      delivery: !!(state=='edit'&&selected?.deliveryType)
        ? selected?.deliveryType.toString()
        : "",
      customer: !!(state=='edit'&&selected?.customer!)
        ? selected?.customer!.toString()
        : "",
      visitor: !!(state=='edit'&&selected?.visitor!)
        ? selected?.visitor!.toString()
        : "",
      address: !!(state=='edit'&&selected?.address!)
        ? selected?.address!.toString()
        : "",
      customerName: !!(state=='edit'&&selected?.customerName!)
        ? selected?.customerName!.toString()
        : "",
      price: !!(state=='edit'&&selected?.factorPrice!)
        ? selected?.factorPrice!.toString()
        : "",
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required("پر کردن فیلد تاریخ اجباری است")
        .min(new Date(), "تاریخ نمیتواند گذشته باشد"),
      factorNumber: Yup.string()
        .required("پر کردن فیلد شماره فاکتور اجباری است")
        .min(6, "شماره فاکتور باید بیش از شش رقم باشد")
        .max(8, "شماره فاکتور باید کمتر از هشت رقمی باشد"),
      price: Yup.number().required("پر کردن فیلد مبلغ فاکتور اجباری است"),
      type: Yup.string().required("پر کردن فیلد نوع فاکتور اجباری است"),
      customer: Yup.string().required("پر کردن فیلد مشتری اجباری است"),
      customerName: Yup.string().max(
        20,
        "نام مشتری باید 20 کاراکتر یا کمتر باشد"
      ),
    }),
    onSubmit: () => {
      //use formik hendlerSubmit
      saveHandler();
    },
  });

  const dispatch = useAppDispatch();



  // useEffect(() => {
    // const newObj = {
    //   date: state == "edit" && selected?.factorDate ? selected?.factorDate : "",
    //   factorNumber:
    //     state == "edit" && selected?.factorNumber ? selected?.factorNumber : "",
    //   type: state == "edit" && selected?.factorType ? selected?.factorType : "",
    //   delivery:
    //     state == "edit" && selected?.deliveryType ? selected?.deliveryType : "",
    //   customer: state == "edit" && selected?.customer ? selected?.customer : "",
    //   visitor: state == "edit" && selected?.visitor ? selected?.visitor : "",
    //   address: state == "edit" && selected?.address ? selected?.address : "",
    //   customerName:
    //     state == "edit" && selected?.customerName ? selected?.customerName : "",
    //   price:
    //     state == "edit" && selected?.factorPrice ? selected?.factorPrice : "",
    // };
    // if (state == "edit") {
    //   formik.values.date = selected?.factorDate.toString().split("T")[0];
    //   formik.values.factorNumber = selected?.factorNumber.toString();
    //   formik.values.type = selected?.factorType.toString();
    //   formik.values.delivery = selected?.deliveryType.toString();
    //   formik.values.customer = selected?.customer!.toString();
    //   formik.values.visitor = selected?.visitor!.toString();
    //   formik.values.address = selected?.address!.toString();
    //   formik.values.customerName = selected?.customerName!.toString();
    //   formik.values.price = selected?.factorPrice!.toString();
    // }
    // setFormData(newObj as any);
  // }, [formik.values, selected, state]);

  // const initialState = {
  //   date: "",
  //   factorNumber: "",
  //   type: "",
  //   delivery: "",
  //   customer: "",
  //   visitor: "",
  //   address: "",
  //   customerName: "",
  //   price: "",
  // };
  // const [formData, setFormData] = useState(initialState);

  // const changeHandler = (e: React.FormEvent<EventTarget>) => {
  //   const target = e.target as HTMLInputElement;
  //   setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  // };

  const customerNameRef = useRef<HTMLInputElement>(null);
  const deliveryTypeRef = useRef<HTMLSelectElement>(null);
  const factorDateRef = useRef<HTMLInputElement>(null);
  const factorNumberRef = useRef<HTMLInputElement>(null);
  const factorPriceRef = useRef<HTMLInputElement>(null);
  const factorTypeRef = useRef<HTMLSelectElement>(null);
  const visitorRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLSelectElement>(null);
  const customerRef = useRef<HTMLSelectElement>(null);

  const enteredCustomerName = customerNameRef.current?.value;
  const enteredDeliveryType = deliveryTypeRef.current?.value;
  const enteredFactorDate = factorDateRef.current?.value;
  const enteredFactorNumber = factorNumberRef.current?.value;
  const enteredFactorPrice = factorPriceRef.current?.value;
  const enteredFactorType = factorTypeRef.current?.value;
  const enteredVisitor = visitorRef.current?.value;
  const enteredaddresRef = addressRef.current?.value;
  const enteredCustomer = customerRef.current?.value;

  const saveHandler = () => {
    if (Object.values(formik.errors).length !== 0) {
      return;
    }
    const newObj: Bill = {
      id: state == "add" ? +enteredFactorNumber! : selected.id,
      customerName: enteredCustomerName!,
      deliveryType: enteredDeliveryType!,
      factorDate: new Date(enteredFactorDate!),
      factorNumber: +enteredFactorNumber!,
      factorPrice: +enteredFactorPrice!,
      factorType: enteredFactorType!,
      visitor: enteredVisitor!,
      address: enteredaddresRef!,
      customer: enteredCustomer!,
    };
    // const newObj: Bill = {
    //   id: state == "add" ? +formData.factorNumber : selected.id,
    //   customerName: formData.customerName,
    //   deliveryType: formData.delivery,
    //   factorDate: new Date(formData.date),
    //   factorNumber: +formData.factorNumber,
    //   factorPrice: +formData.price,
    //   factorType: formData.type,
    //   visitor: formData.visitor,
    //   address: formData.address,
    //   customer: formData.customer,
    // };
    if (state == "edit") {
      dispatch(updateBill(newObj));
      onModal("");
    }
    if (state == "add") {
      dispatch(addNewBill(newObj));
      onModal("");
    }
    if (state == "delete") {
      dispatch(deleteBill(selected));
      onModal("");
    }
  };

  console.log(formik.errors);

  return (
    <>
      <div
        className={`bg-black/50 absolute min-h-[1300px] md:min-h-[1100px] lg:min-h-[800px] top-0 bottom-0 left-0 right-0 w-screen h-screen z-10 flex justify-center items-start ${
          state == "delete" && "items-center"
        }`}
      >
        <div
          className={`bg-light text-dark p-8 max-w-[900px] w-[90%] min-w-[280px] shadow-md rounded-xl mt-20 ${
            state == "delete" && "mt-0"
          }`}
        >
          {state == "delete" ? (
            <>
              <h6 className="mx-auto text-center mb-6 text-base md:text-lg">{`آیا از حذف کالا با شماره فاکتور ${selected?.factorNumber} اطمینان دارید؟`}</h6>
              <div className="flex gap-3 justify-center mt-4">
                <div onClick={() => onModal("")}>
                  <Button type="button" css="gray">
                    انصراف
                  </Button>
                </div>
                <div onClick={saveHandler}>
                  <Button type="button" css="main">
                    حذف
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <form
                action="#"
                className="flex flex-wrap gap-y-4 gap-x-6"
                onSubmit={formik.handleSubmit}
              >
                {/* date */}
                <div
                  className={`relative border-b min-w-[170px] px-1 my-8 ${style.container}`}
                >
                  {/* <div className="w-[150px] absolute top-4 z-[15]">
                    <JCalendar
                      locale={"fa"}
                      color={"#009999"}
                      size={20}
                      onClick={()=> setDatePickerShow((fa,en)=>{fa,en})}
                      itemRender={(key, item, children) => children}
                    />
                  </div> */}

                  <label
                    htmlFor="dateId"
                    className={`text-gray-400 absolute text-xs bottom-9  ${style.required}`}
                  >
                    تاریخ
                  </label>

                  <input
                    id="dateId"
                    type={formik.values.date ? "text" : "date"}
                    // name="date"
                    // value={formData.date}
                    // onChange={changeHandler}
                    className="w-full"
                    ref={factorDateRef}
                    {...formik.getFieldProps("date")}
                  />
                  {formik.errors.date ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.date}
                    </small>
                  ) : null}
                </div>

                {/* factor number */}
                <div
                  className={`relative border-b min-w-[170px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="factorNumberId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.factorNumber && "text-xs bottom-9"
                    } ${style.required}`}
                  >
                    شماره فاکتور
                  </label>
                  <input
                    id="factorNumberId"
                    type="text"
                    // name="factorNumber"
                    // value={formData.factorNumber}
                    // onChange={changeHandler}
                    className="w-full"
                    ref={factorNumberRef}
                    {...formik.getFieldProps("factorNumber")}
                  />
                  {formik.errors.factorNumber ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.factorNumber}
                    </small>
                  ) : null}
                </div>
                {/* factor price */}
                <div
                  className={`relative border-b min-w-[170px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="factorNumberId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.price && "text-xs bottom-9"
                    } ${style.required}`}
                  >
                    مبلغ فاکتور
                  </label>
                  <input
                    id="priceId"
                    type="text"
                    // name="price"
                    // value={formData.price}
                    // onChange={changeHandler}
                    className="w-full"
                    ref={factorPriceRef}
                    {...formik.getFieldProps("price")}
                  />
                  {formik.errors.price ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.price}
                    </small>
                  ) : null}
                </div>

                {/* type */}
                <div
                  className={`relative border-b min-w-[170px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="typeId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.type && "text-xs bottom-9"
                    } ${style.required}`}
                  >
                    نوع
                  </label>
                  <select
                    className="text-gray-400 w-full"
                    id="typeId"
                    // name="type"
                    // value={formData.type}
                    // onChange={changeHandler}
                    ref={factorTypeRef}
                    {...formik.getFieldProps("type")}
                  >
                    <option value=""></option>
                    <option value="نوع 1">نوع 1</option>
                    <option value="نوع 2">نوع 2</option>
                    <option value="نوع 3">نوع 3</option>
                  </select>
                  {formik.errors.type ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.type}
                    </small>
                  ) : null}
                </div>

                {/* delivery */}
                <div
                  className={`relative border-b min-w-[170px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="deliveryId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.delivery && "text-xs bottom-9"
                    }`}
                  >
                    نحوه ارسال کالا
                  </label>
                  <select
                    className="text-gray-400 w-full"
                    id="deliveryId"
                    // name="delivery"
                    // value={formData.delivery}
                    // onChange={changeHandler}
                    ref={deliveryTypeRef}
                    {...formik.getFieldProps("delivery")}
                  >
                    <option value=""></option>
                    <option value="پیک">پیک</option>
                    <option value="پست">پست</option>
                    <option value="تیپاکس">تیپاکس</option>
                  </select>
                  {formik.errors.delivery ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.delivery}
                    </small>
                  ) : null}
                </div>

                {/* customer */}
                <div
                  className={`relative border-b min-w-[170px] sm:min-w-[300px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="customerId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.customer &&
                      "text-xs bottom-9 bg-transparent"
                    }${style.required}`}
                  >
                    انتخاب مشتری
                  </label>
                  <select
                    className="text-gray-400 w-full"
                    id="customerId"
                    // name="customer"
                    // value={formData.customer}
                    // onChange={changeHandler}
                    ref={customerRef}
                    {...formik.getFieldProps("customer")}
                  >
                    <option value=""></option>
                    <option value="مشتری اول">مشتری اول</option>
                    <option value="مشتری دوم">مشتری دوم</option>
                    <option value="مشتری سوم">مشتری سوم</option>
                  </select>
                  {formik.errors.customer ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.customer}
                    </small>
                  ) : null}
                </div>

                {/* visitor */}
                <div
                  className={`relative border-b min-w-[170px] sm:min-w-[300px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="visitorId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.visitor && "text-xs bottom-9"
                    }`}
                  >
                    نام ویزیتور
                  </label>
                  <select
                    className="text-gray-400 w-full"
                    id="visitorId"
                    // name="visitor"
                    // value={formData.visitor}
                    // onChange={changeHandler}
                    ref={visitorRef}
                    {...formik.getFieldProps("visitor")}
                  >
                    <option value=""></option>
                    <option value="ویزیتور اول">ویزیتور اول</option>
                    <option value="ویزیتور دوم">ویزیتور دوم</option>
                    <option value="ویزیتور سوم">ویزیتور سوم</option>
                  </select>
                  {formik.errors.visitor ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.visitor}
                    </small>
                  ) : null}
                </div>

                {/* address */}
                <div
                  className={`relative border-b min-w-[170px] sm:min-w-[300px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="addressId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.address && "text-xs bottom-9"
                    }`}
                  >
                    آدرس حمل
                  </label>
                  <select
                    className="text-gray-400 w-full"
                    id="addressId"
                    // name="address"
                    // value={formData.address}
                    // onChange={changeHandler}
                    ref={addressRef}
                    {...formik.getFieldProps("address")}
                  >
                    <option value=""></option>
                    <option value="آدرس اول">آدرس اول</option>
                    <option value="آدرس دوم">آدرس دوم</option>
                    <option value="آدرس سوم">آدرس سوم</option>
                  </select>
                  {formik.errors.address ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.address}
                    </small>
                  ) : null}
                </div>

                {/* customer name */}
                <div
                  className={`relative border-b min-w-[170px] px-1 my-8 ${style.container}`}
                >
                  <label
                    htmlFor="customerNameId"
                    className={`text-gray-400 absolute text-sm bottom-1 ${
                      formik.values.customerName && "text-xs bottom-9"
                    }`}
                  >
                    نام مشتری چاپی
                  </label>
                  <input
                    id="customerNameId"
                    type="text"
                    // name="customerName"
                    // value={formData.customerName}
                    // onChange={changeHandler}
                    className="w-full"
                    ref={customerNameRef}
                    {...formik.getFieldProps("customerName")}
                  />
                  {formik.errors.customerName ? (
                    <small className="text-delete absolute right-0 -bottom-5 text-[10px]">
                      {formik.errors.customerName}
                    </small>
                  ) : null}
                </div>
              </form>
              <div className="flex gap-3 justify-end mt-4">
                <div onClick={() => onModal("")}>
                  <Button type="button" css="gray">
                    انصراف
                  </Button>
                </div>
                <div onClick={saveHandler}>
                  <Button type="submit" css="main">
                    ثبت
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
