#!/usr/bin/env node

/**
 * Build script to embed comprehensive city data into the userscript
 */

const fs = require('fs');
const path = require('path');

const CITY_DATA_FILE = path.join(__dirname, 'city-timezone-data.js');
const USERSCRIPT_TEMPLATE = path.join(__dirname, 'google-calendar-timezone-helper.template.user.js');
const OUTPUT_FILE = path.join(__dirname, 'dist', 'google-calendar-timezone-helper.user.js');

console.log('Building userscript with comprehensive city data...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Read the generated city data
const cityDataContent = fs.readFileSync(CITY_DATA_FILE, 'utf8');

// Extract just the data definitions (skip the header comments and export)
const cityTimezoneMatch = cityDataContent.match(/const CITY_TIMEZONE_DATA = \{[\s\S]*?\n\};/);

if (!cityTimezoneMatch) {
    console.error('Error: Could not extract data from city-timezone-data.js');
    process.exit(1);
}

const cityTimezoneData = cityTimezoneMatch[0];

// Read the userscript template
let userscript = fs.readFileSync(USERSCRIPT_TEMPLATE, 'utf8');

// Find and replace the data section
const dataStartMarker = '// ============================================================================\n    // CITY-TIMEZONE DATA\n    // ============================================================================';
const dataEndMarker = '// ============================================================================\n    // FUZZY SEARCH ALGORITHM\n    // ============================================================================';

const dataStartIndex = userscript.indexOf(dataStartMarker);
const dataEndIndex = userscript.indexOf(dataEndMarker);

if (dataStartIndex === -1 || dataEndIndex === -1) {
    console.error('Error: Could not find data section markers in userscript');
    process.exit(1);
}

// Build the new data section with stats comment
const stats = cityDataContent.match(/Stats: (.*)/);
const statsComment = stats ? `// ${stats[1]}\n` : '';

const newDataSection = `${dataStartMarker}
    // NOTE: This data was auto-generated from city-timezones and airport-codes packages
    // ${statsComment}
    ${cityTimezoneData}

    `;

// Replace the data section
const before = userscript.substring(0, dataStartIndex);
const after = userscript.substring(dataEndIndex);
const updatedUserscript = before + newDataSection + after;

// Write the updated userscript
fs.writeFileSync(OUTPUT_FILE, updatedUserscript, 'utf8');

console.log('✓ Userscript built successfully!');
console.log(`  - Output: ${OUTPUT_FILE}`);
console.log(`  - ${stats ? stats[1] : 'Data embedded'}`);
console.log(`\nYou can now reload the userscript in Tampermonkey!`);
