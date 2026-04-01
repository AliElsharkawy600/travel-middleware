import { Request, Response, NextFunction } from 'express';
import { AggregationService } from '../../services/aggregation.service';
import { CustomError } from '../../utils/customError';

export const getHotels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let city = req.query.city as string | undefined;
    if (city === '') city = undefined;

    const { data, warnings } = await AggregationService.aggregateHotels(city);

    res.json({
      success: true,
      data,
      meta: {
        count: data.length,
        ...(warnings.length > 0 ? { warnings } : {}),
      },
    });
  } catch (error) {
    next(error);
  }
};
