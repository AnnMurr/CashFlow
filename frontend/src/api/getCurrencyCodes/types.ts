export type CurrencyCodesType = Array<Country>;

export interface Country {
    name: Name;
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: Record<string, Currency>;
    idd: Idd;
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: Record<string, string>;
    translations: Record<string, Translation>;
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    demonyms: Demonyms;
    flag: string;
    maps: Maps;
    population: number;
    gini: Record<string, number>;
    fifa: string;
    car: Car;
    timezones: string[];
    continents: string[];
    flags: ImageLinks;
    coatOfArms: ImageLinks;
    startOfWeek: string;
    capitalInfo: CapitalInfo;
    postalCode: PostalCode;
}

interface Name {
    common: string;
    official: string;
    nativeName: Record<string, Translation>;
}

interface Currency {
    name: string;
    symbol: string;
}

interface Idd {
    root: string;
    suffixes: string[];
}

interface Translation {
    official: string;
    common: string;
}

interface Demonyms {
    eng: Demonym;
}

interface Demonym {
    f: string;
    m: string;
}

interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

interface Car {
    signs: string[];
    side: string;
}

interface ImageLinks {
    png: string;
    svg: string;
}

interface CapitalInfo {
    latlng: number[];
}

interface PostalCode {
    format: string;
    regex: string;
}

export interface CurrencyNameAndCode {
    name: string;
    code: string;
}