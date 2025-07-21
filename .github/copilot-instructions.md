# Copilot Instructions for WikipediaSearchApplication

## Project Overview
This is a single-page web application for searching Wikipedia articles. It is built using vanilla JavaScript, HTML, and CSS. The app interacts directly with the Wikipedia API to fetch search results and article details.

## Architecture & Data Flow
- **index.html**: Main entry point. Contains the search form, result container, and detail view.
- **script.js**: Handles all client-side logic:
  - Debounced search input for suggestions
  - Fetches search results and details from Wikipedia API
  - Renders results and details dynamically
  - Manages UI state (loading, error, navigation)
- **style.css**: Custom styles for responsive layout, cards, suggestion box, and detail view.

## Key Patterns & Conventions
- **API Integration**: Uses `fetch` to call Wikipedia's public API endpoints. All requests use `origin=*` for CORS.
- **Debounce**: Input events for suggestions are debounced (500ms) to reduce API calls.
- **Error Handling**: User-facing error messages are shown in the `#message` element. API errors are caught and displayed.
- **UI State**: Loading indicators and navigation between result and detail views are managed by toggling `display` styles.
- **Responsive Design**: CSS grid and media queries ensure usability on mobile and desktop.
- **No Build Step**: The app runs directly in the browser. No bundler or transpiler is used.

## Developer Workflows
- **Local Development**: Use Live Server (port 5501, see `.vscode/settings.json`) to preview changes. No build or test commands required.
- **Debugging**: Use browser DevTools for JS debugging and CSS inspection.
- **Adding Features**: Extend `script.js` for new UI logic or API calls. Update `index.html` and `style.css` as needed.

## External Dependencies
- **Wikipedia API**: All data is fetched from `https://en.wikipedia.org/w/api.php`.
- **No third-party JS/CSS libraries**: All code is custom and self-contained.

## Examples
- To add a new search filter, update the API query in `searchWikipedia()` in `script.js`.
- To customize card appearance, edit `.card` styles in `style.css`.
- To change the app's language, update static text in `index.html` and `script.js`.

## File References
- `index.html`: UI structure
- `script.js`: App logic, API calls, event handling
- `style.css`: Layout and visual design
- `.vscode/settings.json`: Live Server port configuration

---
For questions about unclear patterns or missing documentation, ask the user for clarification or examples from their workflow.
