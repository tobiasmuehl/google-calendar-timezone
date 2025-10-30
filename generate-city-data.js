#!/usr/bin/env node

/**
 * Generate City-Timezone Data for Google Calendar Helper
 *
 * This script creates a comprehensive city-to-timezone mapping
 * using the city-timezones npm package and custom aliases
 */

const fs = require('fs');
const path = require('path');

// You'll need to install this: npm install city-timezones
let cityTimezones;
try {
    cityTimezones = require('city-timezones');
} catch (e) {
    console.log('Please install city-timezones first: npm install city-timezones');
    process.exit(1);
}

// Import airport codes
let airportCodes;
try {
    const airportData = require('@nwpr/airport-codes');
    airportCodes = airportData.airports;
} catch (e) {
    console.log('Warning: Could not load airport codes. Continuing without them.');
    airportCodes = [];
}

// Custom city aliases for common abbreviations and alternative names
const customAliases = {
    'NYC': 'New York',
    'NY': 'New York',
    'SF': 'San Francisco',
    'LA': 'Los Angeles',
    'LAX': 'Los Angeles',
    'SFO': 'San Francisco',
    'SD': 'San Diego',
    'CHI': 'Chicago',
    'BOS': 'Boston',
    'DC': 'Washington',
    'PHX': 'Phoenix',
    'SEA': 'Seattle',
    'ATL': 'Atlanta',
    'MIA': 'Miami',
    'DFW': 'Dallas',
    'DAL': 'Dallas',
    'HOU': 'Houston',
    'DEN': 'Denver',
    'LAS': 'Las Vegas',
    'PHL': 'Philadelphia',
    'PDX': 'Portland',
    'AUS': 'Austin',
    'SJC': 'San Jose',
    'BER': 'Berlin',
    'AMS': 'Amsterdam',
    'LON': 'London',
    'PAR': 'Paris',
    'ROM': 'Rome',
    'MAD': 'Madrid',
    'BCN': 'Barcelona',
    'VIE': 'Vienna',
    'ZRH': 'Zurich',
    'GVA': 'Geneva',
    'BKK': 'Bangkok',
    'SYD': 'Sydney',
    'MEL': 'Melbourne',
    'SIN': 'Singapore',
    'HKG': 'Hong Kong',
    'TOK': 'Tokyo',
    'NRT': 'Tokyo',
    'OSA': 'Osaka',
    'KIX': 'Osaka',
    'SEL': 'Seoul',
    'ICN': 'Seoul',
    'BEI': 'Beijing',
    'PEK': 'Beijing',
    'SHA': 'Shanghai',
    'PVG': 'Shanghai',
    'DEL': 'Delhi',
    'BOM': 'Mumbai',
    'BLR': 'Bangalore',
    'DXB': 'Dubai',
    'IST': 'Istanbul',
    'CAI': 'Cairo',
    'JNB': 'Johannesburg',
    'CPT': 'Cape Town',
    'YYZ': 'Toronto',
    'YVR': 'Vancouver',
    'YUL': 'Montreal',
    'YYC': 'Calgary',
    'MEX': 'Mexico City',
    'GRU': 'São Paulo',
    'GIG': 'Rio de Janeiro',
    'RIO': 'Rio de Janeiro',
    'EZE': 'Buenos Aires',
    'SCL': 'Santiago'
};

// Additional timezone mappings for cities not in the database
const additionalCities = [
    { city: 'San Francisco', country: 'US', timezone: 'America/Los_Angeles', pop: 874961 },
    { city: 'San Diego', country: 'US', timezone: 'America/Los_Angeles', pop: 1425976 },
    { city: 'Silicon Valley', country: 'US', timezone: 'America/Los_Angeles', pop: 3000000 },
    { city: 'Hollywood', country: 'US', timezone: 'America/Los_Angeles', pop: 200000 },
];

function generateCityDatabase() {
    // Get all cities from city-timezones
    const allCities = cityTimezones.cityMapping;

    // Build timezone to cities mapping
    const timezoneMap = {};

    // Process main city database
    allCities.forEach(city => {
        if (!city.timezone) return;

        const tz = city.timezone;
        if (!timezoneMap[tz]) {
            timezoneMap[tz] = [];
        }

        // Create compressed city object
        const cityObj = {
            n: city.city,           // name
            c: city.country,        // country
            p: city.pop || 0,       // population
            t: 'city'               // type
        };

        timezoneMap[tz].push(cityObj);
    });

    // Add additional cities
    additionalCities.forEach(city => {
        const tz = city.timezone;
        if (!timezoneMap[tz]) {
            timezoneMap[tz] = [];
        }

        const cityObj = {
            n: city.city,
            c: city.country,
            p: city.pop || 0,
            t: 'city'
        };

        // Only add if not already present
        const exists = timezoneMap[tz].some(c => c.n === city.city);
        if (!exists) {
            timezoneMap[tz].push(cityObj);
        }
    });

    // Add airports
    console.log(`Processing ${airportCodes.length} airports...`);
    let airportsAdded = 0;
    airportCodes.forEach(airport => {
        // Only add airports with valid IATA codes and timezones
        if (!airport.iata || !airport.tz || airport.iata === '\\N') return;

        const tz = airport.tz;
        if (!timezoneMap[tz]) {
            timezoneMap[tz] = [];
        }

        const airportObj = {
            n: airport.name,
            c: airport.country,
            p: 0,  // Airports don't have population
            t: 'airport',
            iata: airport.iata
        };

        timezoneMap[tz].push(airportObj);
        airportsAdded++;
    });
    console.log(`Added ${airportsAdded} airports`);

    // Sort entries: cities by population first, then airports
    Object.keys(timezoneMap).forEach(tz => {
        const cities = timezoneMap[tz].filter(e => e.t === 'city');
        const airports = timezoneMap[tz].filter(e => e.t === 'airport');

        // Sort cities by population
        cities.sort((a, b) => (b.p || 0) - (a.p || 0));

        // Sort airports alphabetically by name
        airports.sort((a, b) => a.n.localeCompare(b.n));

        // Keep top 50 cities and all airports per timezone
        timezoneMap[tz] = [...cities.slice(0, 50), ...airports];
    });

    // Calculate stats
    let totalCities = 0;
    let totalAirports = 0;
    Object.values(timezoneMap).forEach(entries => {
        totalCities += entries.filter(e => e.t === 'city').length;
        totalAirports += entries.filter(e => e.t === 'airport').length;
    });

    return {
        tzMap: timezoneMap,
        stats: {
            timezones: Object.keys(timezoneMap).length,
            cities: totalCities,
            airports: totalAirports,
            total: totalCities + totalAirports
        }
    };
}

// Generate the database
console.log('Generating city-timezone database...');
const database = generateCityDatabase();

// Create the JavaScript code for embedding in the userscript
const jsCode = `// Auto-generated city-timezone database
// Generated on: ${new Date().toISOString()}
// Stats: ${database.stats.timezones} timezones, ${database.stats.cities} cities, ${database.stats.airports} airports, ${database.stats.total} total entries

const CITY_TIMEZONE_DATA = ${JSON.stringify(database.tzMap, null, 2)};

// Export for use in userscript
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CITY_TIMEZONE_DATA };
}
`;

// Write to file
const outputPath = path.join(__dirname, 'city-timezone-data.js');
fs.writeFileSync(outputPath, jsCode);

console.log(`✓ Database generated successfully!`);
console.log(`  - Timezones: ${database.stats.timezones}`);
console.log(`  - Cities: ${database.stats.cities}`);
console.log(`  - Airports: ${database.stats.airports}`);
console.log(`  - Total entries: ${database.stats.total}`);
console.log(`  - Output: ${outputPath}`);
console.log(`\nFile size: ${(Buffer.byteLength(jsCode) / 1024).toFixed(2)} KB`);