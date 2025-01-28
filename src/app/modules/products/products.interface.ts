export type BicycleCategory =
  | 'Mountain'
  | 'Road'
  | 'Hybrid'
  | 'BMX'
  | 'Electric'
  | 'Cruiser'
  | 'Folding'
  | 'Kids'
  | 'Touring'
  | 'Cyclocross'
  | 'Gravel'
  | 'Fat'
  | 'Recumbent'
  | 'Tandem'
  | 'Track';

export type BicycleModel =
  | 'ModelX100'
  | 'TrailBlazer'
  | 'SpeedsterPro'
  | 'UrbanRider'
  | 'EcoCruise'
  | 'XtremeBMX'
  | 'PowerPedal'
  | 'FoldMaster'
  | 'JuniorJoy'
  | 'TouringPro'
  | 'GravelGrinder'
  | 'FatTireX'
  | 'RecuRide'
  | 'TandemExpress'
  | 'TrackStar';
export type IProduct = {
  name: string;
  brand: string;
  price: number;
  model: BicycleModel;
  category: BicycleCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  images: string[];
};
