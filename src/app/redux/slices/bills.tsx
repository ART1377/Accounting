import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Bill } from "../../../next-type.d";

const BILLS_URL = "http://127.0.0.1:3500/bills";

export interface InitialStateType {
  bills: Bill[];
  status: string;
  error: null | string;
}
const initialState: InitialStateType = {
  bills: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchBills = createAsyncThunk("bills/fetchBills", async () => {
  const response = await axios.get(BILLS_URL);
  return response.data;
});

export const addNewBill = createAsyncThunk(
  "bills/addNewBill",
  async (initialBill: Bill) => {
    const newObj={...initialBill,id:initialState.bills.length};
    const response = await axios.post(BILLS_URL, newObj);
    return response.data;
  }
);

export const updateBill = createAsyncThunk(
  "bills/updateBill",
  async (initialBill: Bill) => {
    const { id } = initialBill;
    try {
      const response = await axios.put(`${BILLS_URL}/${id}`, initialBill);
      return response.data;
    } catch (err) {
      return initialBill;
    }
  }
);

export const deleteBill = createAsyncThunk(
  "bills/deleteBill",
  async (initialBill: Bill) => {
    const { id } = initialBill;
    try {
      const response = await axios.delete(`${BILLS_URL}/${id}`);
      if (response?.status === 200) return initialBill;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err: any) {
      return err.message;
    }
  }
);

const biilsSlice = createSlice({
  name: "biils",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBills.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = "failed";
        state.error = "something went wrong";
      })

      .addCase(addNewBill.fulfilled, (state, action) => {
        action.payload.id = state.bills[state.bills.length - 1].id + 1;
        state.bills.push(action.payload);
      })

      .addCase(updateBill.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const bills = state.bills.filter((bill) => bill.id !== id);
        state.bills = [...bills, action.payload];
      })

      .addCase(deleteBill.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const bills = state.bills.filter((bill) => bill.id !== id);
        state.bills = bills;
      });
  },
});

export default biilsSlice.reducer;
