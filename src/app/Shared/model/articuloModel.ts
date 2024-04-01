export class Articulo {
  id : string;
  model: string = "";
  salesSample: string = "";
  sourcingTrackingNumber: string = "";
  warrant: string = "";
  originCountry: string = "";
  destinationCountry: string = "";
  warehouse: string = "";
  timeOfArrival: Date = new Date();
  currentLocation: string = "";
  incoterm: string = "";
  containerNumber: string = "";
}
