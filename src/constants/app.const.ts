import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.PORT)

export const APP_CONSTANTS = {
  PORT: process.env.PORT as string || 3000,
  SUPPLIER_A_URL: process.env.SUPPLIER_A_URL as string || 'http://localhost:4001/supplier-a/hotels',
  SUPPLIER_B_URL: process.env.SUPPLIER_B_URL as string || 'http://localhost:4002/supplier-b/list',
};

