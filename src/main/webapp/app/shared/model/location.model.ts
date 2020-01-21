import { ICountry } from 'app/shared/model/country.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  country?: ICountry;
}

export const defaultValue: Readonly<ILocation> = {};
