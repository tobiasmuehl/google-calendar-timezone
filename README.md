# Google Calendar Timezone Helper

I highly dislike the Google Calendar timezone selection dropdown. It doesn't have a search bar - ironic for a search company! This GreasyMonkey/Tampermonkey userscript  adds keyboard-only city search inputs to Google Calendar timezone dropdowns with fuzzy matching, comprehensive city data, and airport codes.

## Demo

<video src="https://raw.githubusercontent.com/tobiasmuehl/google-calendar-timezone/main/before%20after%20video.mp4" autoplay loop muted playsinline width="600"></video>

## Features

- 🔍 **Fuzzy search** - Type city names with typo tolerance
- ⌨️ **Keyboard-only** - No mouse required, full arrow key navigation
- 🌍 **Comprehensive data** - 5,767 cities + 5,515 airports across 399 timezones
- ✈️ **Airport codes** - Search by IATA codes (DMK, JFK, SFO, etc.)
- 🎯 **Smart matching** - Exact, starts-with, contains, and fuzzy matching
- 📍 **Two inputs** - Separate search for start and end timezone
- 🕐 **GMT offset display** - See timezone offset in search results

## Installation

### Step 1: Install Browser Extension

Install a userscript manager for your browser:
- **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Violentmonkey](https://violentmonkey.github.io/)
- **Other browsers**: Check [GreasyFork](https://greasyfork.org/en) for compatible extensions

### Step 2: Install the Userscript

1. Go to the [Releases page](../../releases)
2. Download `google-calendar-timezone-helper.user.js` from the latest release
3. Open the downloaded file in your browser
4. Tampermonkey will automatically detect it and prompt to install
5. Click "Install"


## Usage

### Keyboard Navigation

1. **Open Google Calendar** and create/edit an event
2. **Locate the timezone fields** - you'll see search inputs below them
3. **Type a city name or airport code** - e.g., "berlin", "nyc", "bangkok"
4. **Navigate results**:
   - `↓` / `↑` - Move through suggestions
   - `Enter` - Select highlighted timezone
   - `Escape` - Clear and close
   - `Tab` - Move to next field

### Search Examples

**Cities:**
- Type **"berlin"** → Berlin, Germany (Europe/Berlin)
- Type **"bangkok"** → Bangkok, Thailand (Asia/Bangkok)
- Type **"bangk"** → Fuzzy matches Bangkok
- Type **"san fran"** → San Francisco, United States

**Airports:**
- Type **"DMK"** → ✈️ Don Mueang International Airport (DMK), Thailand
- Type **"JFK"** → ✈️ John F Kennedy International Airport (JFK), United States
- Type **"SFO"** → ✈️ San Francisco International Airport (SFO), United States
- Type **"BKK"** → ✈️ Suvarnabhumi Airport (BKK), Thailand
- Type **"YYZ"** → ✈️ Lester B. Pearson International Airport (YYZ), Canada

## How It Works

1. **Data Sources**:
   - Cities from `city-timezones` npm package (5,767 cities)
   - Airports from `@nwpr/airport-codes` npm package (5,515 airports)
2. **Fuzzy Matching**: Implements Levenshtein distance algorithm for typo tolerance
3. **IATA Code Search**: Airports are searchable by their 3-letter codes (DMK, JFK, etc.)
4. **Ranking**: Results sorted by:
   - Match type (exact > IATA exact > starts-with > contains > fuzzy)
   - Population (larger cities ranked higher)
5. **Programmatic Selection**: Directly sets timezone values without clicking

## Files

- `dist/google-calendar-timezone-helper.user.js` - Built userscript (install this)
- `google-calendar-timezone-helper.template.user.js` - Source template
- `generate-city-data.js` - Generates city + airport data
- `build.js` - Embeds data into userscript
- `package.json` - Dependencies for data generation
- `city-timezone-data.js` - Generated data (created by npm run build)

## Customization

The userscript includes comprehensive city and airport data by default. If you need to customize:

### Rebuild with Custom Data

1. Edit `generate-city-data.js` to modify the data sources
2. Run `npm run build` to regenerate the userscript
3. Reinstall the updated `dist/google-calendar-timezone-helper.user.js`

### Manual Edits (Not Recommended)

You can directly edit `CITY_TIMEZONE_DATA` in the template, but your changes will be lost on rebuild. Each entry has this structure:

```javascript
"America/Los_Angeles": [
    { n: "Los Angeles", c: "United States", p: 3971883, t: "city" },
    { n: "LAX Airport", c: "United States", p: 0, t: "airport", iata: "LAX" }
]
```

## Development

```bash
# Install dependencies
npm install

# Build the userscript (generates data + embeds in template)
npm run build

# Edit the source template
# File: google-calendar-timezone-helper.template.user.js

# After changes, rebuild
npm run build

# Test the built userscript
# File: dist/google-calendar-timezone-helper.user.js
# Install in Tampermonkey and test on https://calendar.google.com
```

### Project Structure

```
.
├── dist/
│   └── google-calendar-timezone-helper.user.js  # Built file (install this)
├── google-calendar-timezone-helper.template.user.js  # Source template
├── generate-city-data.js  # Generates city + airport data
├── build.js  # Embeds data into template
├── city-timezone-data.js  # Generated data (git-ignored)
└── package.json
```

### Publishing Releases

This project uses GitHub Actions to automatically create releases when you push a version tag.

**To publish a new release:**

```bash
# Tag the release (e.g., v1.0.0)
git tag v1.0.0

# Push the tag to GitHub
git push origin v1.0.0
```

**What happens automatically:**
1. GitHub Actions workflow triggers (`.github/workflows/release.yml`)
2. Dependencies are installed using Node.js 24
3. Userscript is built via `npm run build`
4. GitHub release is created with auto-generated release notes
5. `dist/google-calendar-timezone-helper.user.js` is attached as a downloadable asset

Users can then install directly from the [Releases page](../../releases) by clicking the `.user.js` file!

## License

MIT

## Contributing

All contributions welcome.