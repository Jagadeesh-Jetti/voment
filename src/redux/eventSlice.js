import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://volunteer-management-backend-seven.vercel.app/events";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (eventDetails) => {
    try {
      const response = await axios.post(apiUrl, eventDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, updatedData }) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "success";
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = "success";
        const updatedEvent = action.payload;
        const index = state.events.findIndex((e) => e._id === updatedEvent._id);
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = "success";
        const deletedEventId = action.payload._id;
        state.events = state.events.filter(
          (event) => event._id !== deletedEventId
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy } = eventSlice.actions;
export default eventSlice.reducer;
