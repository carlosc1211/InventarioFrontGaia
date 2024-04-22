export class Articulo {
  id: string;
  model: string;
  salesSample: string;
  sourcingTrackingNumber: string;
  warrant: string;
  originCountry: string;
  destinationCountry: string;
  warehouse: string;
  timeOfArrival: Date = new Date();
  currentLocation: string;
  incoterm: string;
  containerNumber: string;
  sku: string;
  description: string;
  qtyGross: number = 0;
  qtyNet: number = 0;
  available: number = 0;
  reserved: number = 0;
  potentialBuyer: string;
  // createDate: Date;
  activo:boolean;
}
