import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// Fetch all orders (buyer sees own, farmer sees orders with their animals)
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/orders");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Failed to fetch orders");
    }
  }
);

// Create order from cart
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (_, thunkAPI) => {
    try {
      const res = await API.post("/orders");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.response?.data || error.message || "Failed to create order");
    }
  }
);

// Pay for an order
export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async ({ orderId, paymentDetails }, thunkAPI) => {
    try {
      const res = await API.post(`/orders/${orderId}/pay`, paymentDetails);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.response?.data || error.message || "Payment failed");
    }
  }
);

// Confirm an order (Farmer)
export const confirmOrder = createAsyncThunk(
  "orders/confirmOrder",
  async (orderId, thunkAPI) => {
    try {
      const res = await API.post(`/orders/${orderId}/confirm`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Failed to confirm order");
    }
  }
);

// Reject an order (Farmer)
export const rejectOrder = createAsyncThunk(
  "orders/rejectOrder",
  async (orderId, thunkAPI) => {
    try {
      const res = await API.post(`/orders/${orderId}/reject`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Failed to reject order");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // payOrder
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Update the current order with paid status
        if (action.payload.order) {
          state.currentOrder = action.payload.order;
          const index = state.orders.findIndex((o) => o.id === action.payload.order.id);
          if (index !== -1) state.orders[index] = action.payload.order;
        }
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // confirmOrder
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (o) => o.id === action.payload.id
        );
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // rejectOrder
      .addCase(rejectOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (o) => o.id === action.payload.id
        );
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
