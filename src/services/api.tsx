import axios from "axios";
import { BASE_URL } from "@/constants/common";

export const api = axios.create({
  baseURL: BASE_URL,
});
