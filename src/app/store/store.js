import { configureStore } from '@reduxjs/toolkit';
import CountReducer from './CountSlice';
import ProDataReducer from './ProdataSlice';

export const store = configureStore({
	reducer: {
		Count: CountReducer,
		ProData: ProDataReducer,
	},
});

export default store; 