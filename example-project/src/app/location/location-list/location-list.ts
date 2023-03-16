export interface LocationList {
  id: number;
  countryId: number;
  country: string;
  cityId: number;
  city: string;
  districtId: number;
  district: string;
  villageId: number;
  village: string;
}

export interface Country {
  country: string;
}

export interface City {
  city: string;
}

export interface District {
  district: string;
}

export interface Village {
  village: string;
}
