# Travel Middleware

A robust Node.js service built with TypeScript and Express that fetches hotel data from multiple mock suppliers, normalizes it into a unified model, and provides optimized results (filtered by availability and deduplicated by lowest price).

## Features
- **Normalization**: Unifies disparate supplier API contracts into a single model.
- **Availability Filtering**: Automatically excludes hotels marked as unavailable.
- **Cheap-Price Deduplication**: If multiple suppliers offer the same hotel, only the cheapest option is returned.
- **Graceful Failure**: Uses `Promise.allSettled` to return data even if one supplier is down, with clear warnings in metadata.
- **Swagger Documentation**: Interactive API testing available at `/api-docs`.
- **Environment Driven**: Configurable via `.env` file and a centralized constants layer.

## Project Structure
- `src/controllers/hotel/`: Contains API endpoint logic.
- `src/services/`: Business logic for fetching, mapping, and aggregating data.
- `src/models/`: Typegoose-based data models.
- `src/constants/`: Central environment configuration.
- `mocks/`: Local servers to simulate Supplier A and Supplier B.

## Setup and Installation

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```
*Note: Using `--legacy-peer-deps` is recommended due to specific version requirements of Typegoose and Mongoose 9.*

### 2. Configure Environment
A default `.env` file should be present in the root. If not, create one:
```env
PORT=3000
SUPPLIER_A_URL=http://localhost:4001/supplier-a/hotels
SUPPLIER_B_URL=http://localhost:4002/supplier-b/list
```

### 3. Run the Project
To start the middleware and all mock suppliers concurrently:
```bash
npm run dev:all
```

Alternatively, run them separately:
- `npm run mock:a` (Supplier A on 4001)
- `npm run mock:b` (Supplier B on 4002)
- `npm run dev` (Middleware on 3000)

## API Endpoints

### 1. List Hotels
Returns a normalized list of unique, available hotels.
- **URL**: `GET /hotels`
- **Optional Query**: `?city=Istanbul`
- **Example Response**:
```json
{
  "success": true,
  "data": [...],
  "meta": { "count": 2 }
}
```

### 2. Swagger Documentation
Interactive UI to explore the API.
- **URL**: `http://localhost:3000/api-docs`

## Important Assumptions
- **Deduplication**: Hotels are matched purely by their `name`. In a real-world scenario, a unique identifier or address/lat-long matching would be safer.
- **Currency**: The logic assumes all prices are in a compatible currency or ignores conversion for the purpose of this middleware.

## Future Improvements
- **Pagination**: Implement cursor-based pagination for large data sets.
- **Sorting**: Add sorting by price or stars.
- **Deduplication**: Use fuzzy matching for hotel names to handle slight variations in supplier data.
