// locationData.js
export const countries = {
    us: {
      name: "United States",
      flag: "🇺🇸",
      regions: {
        northeast: {
          name: "Northeast",
          rateMultiplier: 1.2,
          states: ["ME", "NH", "VT", "MA", "RI", "CT", "NY", "NJ", "PA"]
        },
        midwest: {
          name: "Midwest",
          rateMultiplier: 1.0,
          states: ["OH", "IN", "IL", "MI", "WI", "MN", "IA", "MO", "ND", "SD", "NE", "KS"]
        },
        south: {
          name: "South",
          rateMultiplier: 0.9,
          states: ["DE", "MD", "DC", "VA", "WV", "NC", "SC", "GA", "FL", "KY", "TN", "AL", "MS", "AR", "LA", "OK", "TX"]
        },
        west: {
          name: "West",
          rateMultiplier: 1.3,
          states: ["MT", "ID", "WY", "CO", "NM", "AZ", "UT", "NV", "WA", "OR", "CA", "AK", "HI"]
        }
      }
    },
    uk: {
      name: "United Kingdom",
      flag: "🇬🇧",
      regions: {
        london: {
          name: "London",
          rateMultiplier: 1.4
        },
        southeast: {
          name: "South East",
          rateMultiplier: 1.2
        },
        southwest: {
          name: "South West",
          rateMultiplier: 1.0
        },
        midlands: {
          name: "Midlands",
          rateMultiplier: 0.9
        },
        north: {
          name: "North",
          rateMultiplier: 0.85
        },
        scotland: {
          name: "Scotland",
          rateMultiplier: 0.95
        },
        wales: {
          name: "Wales",
          rateMultiplier: 0.9
        }
      }
    },
    au: {
      name: "Australia",
      flag: "🇦🇺",
      regions: {
        nsw: {
          name: "New South Wales",
          rateMultiplier: 1.2
        },
        vic: {
          name: "Victoria",
          rateMultiplier: 1.15
        },
        qld: {
          name: "Queensland",
          rateMultiplier: 1.0
        },
        wa: {
          name: "Western Australia",
          rateMultiplier: 1.1
        },
        sa: {
          name: "South Australia",
          rateMultiplier: 0.95
        },
        tas: {
          name: "Tasmania",
          rateMultiplier: 0.9
        },
        nt: {
          name: "Northern Territory",
          rateMultiplier: 1.25
        },
        act: {
          name: "Australian Capital Territory",
          rateMultiplier: 1.15
        }
      }
    }
  };
  
  // Helper function to calculate adjusted rates for a region
  export const getRegionRates = (baseRates, countryCode, regionCode) => {
    const country = countries[countryCode];
    if (!country || !country.regions[regionCode]) {
      return baseRates;
    }
  
    const multiplier = country.regions[regionCode].rateMultiplier;
    return Object.entries(baseRates).reduce((acc, [key, value]) => {
      acc[key] = Math.round(value * multiplier * 100) / 100;
      return acc;
    }, {});
  };