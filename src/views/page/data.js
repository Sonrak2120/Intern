const energySources = [
  { value: "hydro", name: "Hydro-electric" },
  { value: "oil", name: "Oil" },
  { value: "gas", name: "Natural gas" },
  { value: "coal", name: "Coal" },
  { value: "nuclear", name: "Nuclear" },
];

const countriesInfo = [
  {
    country: -10,
    hydro: 0.000005978065445786691,
  },
  {
    country: -6,
    hydro: 0.000006416575846298263,
  },
  {
    country: -2,
    hydro: 0.000004758675162901171,
  },
  {
    country: 2,
    hydro: 0.0000032106742420140302,
  },
  {
    country: 6,
    hydro: 0.000017296783398254028,
  },
  {
    country: 10,
    hydro: 0.000005288116422110144,
  },
];

export default {
  getEnergySources() {
    return energySources;
  },
  getCountriesInfo() {
    return countriesInfo;
  },
};
