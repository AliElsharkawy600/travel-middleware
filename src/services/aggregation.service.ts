import { Hotel } from '../models/hotel.model';
import { SupplierAService } from './supplierA.service';
import { SupplierBService } from './supplierB.service';

export class AggregationService {
  public static async aggregateHotels(city?: string) {
    const results = await Promise.allSettled([
      SupplierAService.fetchHotels(city),
      SupplierBService.fetchHotels(city),
    ]);

    const allHotels: Hotel[] = [];
    const warnings: string[] = [];

    results.forEach((result, index) => {
      const supplierName = index === 0 ? 'A' : 'B';

      if (result.status === 'fulfilled') {
        allHotels.push(...result.value);
      } else {
        console.error(`Supplier ${supplierName} failed:`, result.reason?.message || result.reason);
        warnings.push(`Supplier ${supplierName} is unavailable`);
      }
    });

    // Filter for available hotels and name deduplicate with lowest price
    const uniqueAvailableHotelsMap = new Map<string, Hotel>();

    for (const hotel of allHotels) {
      if (!hotel.available) continue;

      const existingHotel = uniqueAvailableHotelsMap.get(hotel.name);

      if (!existingHotel || hotel.price.amount < existingHotel.price.amount) {
        uniqueAvailableHotelsMap.set(hotel.name, hotel);
      }
    }

    const data = Array.from(uniqueAvailableHotelsMap.values());

    return {
      data,
      warnings,
    };
  }
}
