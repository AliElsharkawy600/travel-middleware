import { APP_CONSTANTS } from '../constants/app.const';
import apiClient from '../utils/apiClient';
import { Hotel } from '../models/hotel.model';

interface SupplierBHotel {
  id: string;
  hotel_name: string;
  location: {
    cityName: string;
  };
  pricing: {
    amount: number;
    currencyCode: string;
  };
  rating: number;
  isAvailable: boolean;
}

export class SupplierBService {
  private static readonly URL = APP_CONSTANTS.SUPPLIER_B_URL;

  public static async fetchHotels(city?: string): Promise<Hotel[]> {
    const response = await apiClient.get<SupplierBHotel[]>(this.URL, {
      params: { city },
    });

    return response.data.map((h) => ({
      supplier: 'B',
      supplierHotelId: h.id,
      name: h.hotel_name,
      city: h.location.cityName,
      price: {
        amount: h.pricing.amount,
        currency: h.pricing.currencyCode,
      },
      stars: h.rating,
      available: h.isAvailable,
    }));
  }
}
