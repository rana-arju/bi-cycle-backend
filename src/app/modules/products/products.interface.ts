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

export type bicycleBrands =
  | 'Trek'
  | 'Giant'
  | 'Specialized'
  | 'Cannondale'
  | 'Scott'
  | 'Santa Cruz'
  | 'Bianchi'
  | 'Merida'
  | 'Cervélo'
  | 'Orbea'
  | 'Fuji'
  | 'Cube'
  | 'Marin'
  | 'Kona'
  | 'Raleigh'
  | 'GT Bicycles'
  | 'Polygon'
  | 'Norco'
  | 'BMC'
  | 'Yeti Cycles';

export type IProduct = {
  name: string;
  brand: bicycleBrands;
  price: number;
  model: BicycleModel;
  category: BicycleCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  images: string[];
};
