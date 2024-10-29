// rates.js
export const baseRates = {
  us: {
    cooking: 18,
    cleaning: 15,
    childcare: 20,
    laundry: 14,
    shopping: 16,
    maintenance: 20,
    organizing: 17
  },
  uk: {
    cooking: 15,
    cleaning: 12,
    childcare: 17,
    laundry: 11,
    shopping: 13,
    maintenance: 16,
    organizing: 14
  },
  au: {
    cooking: 20,
    cleaning: 18,
    childcare: 22,
    laundry: 16,
    shopping: 18,
    maintenance: 22,
    organizing: 19
  }
};

export const taskLabels = {
  cooking: 'Cooking & Meal Preparation',
  cleaning: 'House Cleaning',
  childcare: 'Childcare',
  laundry: 'Laundry & Ironing',
  shopping: 'Grocery Shopping',
  maintenance: 'Home Maintenance',
  organizing: 'Organization & Tidying'
};

export const taskDescriptions = {
  cooking: 'Meal planning, preparation, cooking, and kitchen cleanup',
  cleaning: 'Regular cleaning of floors, bathrooms, dusting, and general housekeeping',
  childcare: 'Taking care of children, including education and activities',
  laundry: 'Washing, drying, ironing, and organizing clothes',
  shopping: 'Planning, grocery shopping, and putting away supplies',
  maintenance: 'Basic home repairs, garden work, and maintenance tasks',
  organizing: 'Decluttering, organizing spaces, managing household inventory, and seasonal tidying'
};