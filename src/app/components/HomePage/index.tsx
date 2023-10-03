"use client";
import React, { useEffect, useState } from "react";
import style from "./homepage.module.css";
import {
  MdOutlineMoreVert,
  MdDeleteForever,
  MdBorderColor,
  MdAdd,
  MdOutlineSearch,
  MdOutlineKeyboardDoubleArrowDown,
  MdDensityLarge,
  MdClear,
  MdDragHandle,
  MdKeyboardArrowDown,
  MdMoreVert,
} from "react-icons/md";
import TableTitle from "../TableTitle";
import { bills } from "@/app/dummyData";
import Modal from "../Modal";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hook";
import {
  fetchBills,
} from "@/app/redux/slices/bills";
import { Bill } from "@/next-type";
import Loader from "../Loader";


type Props = {};

const HomePage = (props: Props) => {
  const [selectedRow, setSelectedRow] = useState<number>();
  const [showModal, setShowModal] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const changeHandler = (e: React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setSearchQuery(target.value);
  };

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.bills);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  const [prevData, setPrevData] = useState<Bill>();

  useEffect(() => {
    if (showModal == "edit" || showModal == "delete") {
      const selectedBill = data.bills.find((bill) => bill.id == selectedRow);
      setPrevData(selectedBill);
    }
  }, [data.bills, prevData, selectedRow, showModal]);


  // const test= {id:5,
  //   factorNumber: 98735465656,
  //   factorDate: 202656565653,
  //   customerName: "علی منیری",
  //   factorPrice: 2000,
  //   factorType: "همکاری",
  //   deliveryType: "تیپاکس",};
  //   dispatch(updateBill(
  //    test
  //   ))

  // useEffect(() => {

  //   async function getData() {
  //     const res=await axios.post('http://127.0.0.1:3500/bills',{
  //       factorNumber: 123,
  //     factorDate: 1999,
  //     customerName: "علی منیری",
  //     factorPrice: 500,
  //     factorType: "همکاری",
  //     deliveryType: "پیک",
  //     })
  //     // const data=await res.json();
  //     console.log(res.data)
  //     return res;
  //   }

  //   getData()

  // }, []);

  const titles = [
    "شماره فاکتور",
    "تاریخ فاکتور",
    "نام مشتری",
    "مبلغ فاکتور",
    "نوع فاکتور",
    "نحوه ارسال",
  ];


  const filteredData = searchQuery
    ? data.bills.filter((item) =>
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data.bills;

  return (
    <>
      {showModal && (
        <Modal state={showModal} selected={prevData!} onModal={setShowModal} />
      )}
 


      <section className="p-2 sm:p-4 max-w-[1000px] mx-auto pt-8">
        <div className={style.title}>
          <h4 className="ps-2 text-xl sm:text-2xl">صورت حساب ها</h4>
          <hr />
        </div>
        <div className="flex justify-between items-center px-2 my-6">
          <div className={`flex gap-2 ${style.options}`}>
            <div
              onClick={() => setShowModal(selectedRow ? "edit" : "")}
              className={`text-edit text-lg ${
                selectedRow ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <MdBorderColor />
            </div>
            <div
              onClick={() => setShowModal(selectedRow ? "delete" : "")}
              className={`text-delete text-lg  ${
                selectedRow ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <MdDeleteForever />
            </div>
            <div
              onClick={() => setShowModal("add")}
              className="text-add cursor-pointer text-lg"
            >
              <MdAdd />
            </div>
          </div>
          <div className={`${style.search} sm:me-10`}>
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو (نام مشتری)"
                className="border-b-2 p-1 placeholder:pr-5 text-sm cursor-pointer"
                value={searchQuery}
                onChange={changeHandler}
              />
              {searchQuery ? (
                <div
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 transform -translate-y-1/2 left-1 cursor-pointer"
                >
                  <MdClear className="text-lg" />
                </div>
              ) : (
                <div className="absolute top-1/2 transform -translate-y-1/2 right-1">
                  <MdOutlineSearch className="text-lg" />
                </div>
              )}
            </div>
          </div>
        </div>

        {data.status == "loading" || data.status == "idle" ? (
          <Loader />
        ) : (
          <div className="overflow-x-scroll lg:overflow-x-hidden">
            <table className={`table-auto overflow-x-scroll ${style.table}`}>
              <thead className="mb-10">
                <tr>
                  <th className="min-w-[40px]">
                    <MdOutlineKeyboardDoubleArrowDown />
                  </th>
                  {titles.map((title) => {
                    return <TableTitle key={title} title={title} />;
                  })}
                </tr>
              </thead>
              <tbody className="bg-light-green">
                {filteredData.map((bill) => {
                  return (
                    <tr
                      key={bill.id}
                      onClick={() => setSelectedRow(bill.id)}
                      className={`cursor-pointer ${
                        bill.id == selectedRow && "bg-main-green"
                      }`}
                    >
                      <td className="min-w-[40px]">
                        <MdKeyboardArrowDown />
                      </td>
                      <td>{bill.factorNumber}</td>
                      <td>{bill.factorDate?.toString().split('T')[0]}</td>
                      <td>{bill.customerName}</td>
                      <td>{bill.factorPrice}</td>
                      <td>{bill.factorType}</td>
                      <td>{bill.deliveryType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <small>{`1-${data.bills.length} از ${data.bills.length}`}</small>
        </div>
      </section>
    </>
  );
};

export default HomePage;
