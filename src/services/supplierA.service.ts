import { APP_CONSTANTS } from '../constants/app.const';
import apiClient from '../utils/apiClient';
import { Hotel } from '../models/hotel.model';

interface SupplierAHotel {
  hotelId: string;
  name: string;
  city: string;
  price: number;
  currency: string;
  stars: number;
  available: boolean;
}

export class SupplierAService {
  private static readonly URL = APP_CONSTANTS.SUPPLIER_A_URL;

  public static async fetchHotels(city?: string): Promise<Hotel[]> {
    const response = await apiClient.get<SupplierAHotel[]>(this.URL, {
      params: { city },
    });

    return response.data.map((h) => ({
      supplier: 'A',
      supplierHotelId: h.hotelId,
      name: h.name,
      city: h.city,
      price: {
        amount: h.price,
        currency: h.currency,
      },
      stars: h.stars,
      available: h.available,
    }));
  }
}
