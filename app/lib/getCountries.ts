import countries from "world-countries";


const countriesFormatted = countries.map((item) => ({
  value: item.cca2,
  label: item.name.common,
  flag: item.flag,
  latlang: item.latlng,
  region: item.region,
}));
//here we used ({}) this format as we need to return an object for each item in the countries array. Usually we explicitly mention return inside {} but here since we didnt use the return method we used the implcit way hence we need to wrap the object with parentheses.

//creating custom hook
export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value == value);
  };
  return {
    getAllCountries,
    getCountryByValue,
  };
};
