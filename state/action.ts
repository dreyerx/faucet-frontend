import { createAction } from "@reduxjs/toolkit";

export const typeInput = createAction<{ address: string }>('typeInput')