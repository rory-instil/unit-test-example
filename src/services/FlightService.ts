import {Flight} from "../model/Flight";
import Axios from "axios";

const baseUrl = 'http://localhost:8080/flights';

export async function getAll(): Promise<Flight[]> {
  const response = await Axios.get<Flight[]>(baseUrl);
  return response.data
}
