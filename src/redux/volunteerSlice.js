import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl =
  "https://volunteer-management-backend-seven.vercel.app/volunteers";

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addVolunteer = createAsyncThunk(
  "volunteers/addVolunteer",
  async (volunteerDetails) => {
    try {
      const response = await axios.post(apiUrl, volunteerDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateVolunteer = createAsyncThunk(
  "volunteers/updateVolunteer",
  async ({ id, updatedData }) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteVolunteer = createAsyncThunk(
  "volunteers/deleteVolunteer",
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
  volunteers: [],
  status: "idle",
  error: null,
};

export const volunteerSlice = createSlice({
  name: "volunteers",
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
      .addCase(fetchVolunteers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        state.status = "success";
        state.volunteers = action.payload;
      })
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addVolunteer.fulfilled, (state, action) => {
        state.status = "success";
        state.volunteers.push(action.payload);
      })
      .addCase(addVolunteer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVolunteer.fulfilled, (state, action) => {
        state.status = "success";
        const updatedVolunteer = action.payload;
        const index = state.volunteers.findIndex(
          (v) => v._id === updatedVolunteer._id
        );
        if (index !== -1) {
          state.volunteers[index] = updatedVolunteer;
        }
      })
      .addCase(updateVolunteer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteVolunteer.fulfilled, (state, action) => {
        state.status = "success";
        const deletedVolunteerId = action.payload._id;
        state.volunteers = state.volunteers.filter(
          (volunteer) => volunteer._id !== deletedVolunteerId
        );
      })
      .addCase(deleteVolunteer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy } = volunteerSlice.actions;

export default volunteerSlice.reducer;
