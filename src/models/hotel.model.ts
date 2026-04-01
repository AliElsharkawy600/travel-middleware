import { prop } from '@typegoose/typegoose';

class Price {
  @prop({ required: true })
  public amount!: number;

  @prop({ required: true })
  public currency!: string;
}

export class Hotel {
  @prop({ required: true })
  public supplier!: string;

  @prop({ required: true })
  public supplierHotelId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ type: () => Price, required: true })
  public price!: Price;

  @prop({ required: true })
  public stars!: number;

  @prop({ required: true })
  public available!: boolean;
}
