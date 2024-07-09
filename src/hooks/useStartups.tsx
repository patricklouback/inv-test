import { Country, State } from 'country-state-city';
import { useState } from 'react';

export function useStartups() {
  const countries = Country.getAllCountries();
  const [step, setStep] = useState(1);

  const returnStates = (country: string) => {
    return State.getStatesOfCountry(country);
  };

  const formatCountry = (countryCode: string) => {
    return countries.find(country => country.isoCode === countryCode);
  };

  const year = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => {
    return { id: i, value: year - i, name: year - i };
  });

  return { countries, years, returnStates, step, setStep, formatCountry };
}
