# Reaction Speed Tester

A fullscreen reaction-time mini game built with HTML, CSS, and vanilla JavaScript.

The app waits for a random delay, flashes green, and measures how quickly the user clicks or presses a key. It tracks personal best time, shows recent attempts, and gives a simple reaction rating.

## Live Links

- GitHub Repository: https://github.com/fazal305/reaction-speed-tester
- Live Demo: https://fazal305.github.io/reaction-speed-tester/

## Overview

Reaction Speed Tester is a small browser game focused on timing, feedback, and quick interaction. It uses random delays, precise browser timing, local storage, sound feedback, vibration support, and a recent-attempts list.

This is a good portfolio mini-project because it is simple to understand, easy to demo, and shows practical JavaScript state management.

## Features

- Fullscreen reaction tester
- Random wait delay
- Precise reaction timing with `performance.now()`
- Too-early click detection
- Reaction rating system
- Personal best saved with `localStorage`
- Last 5 attempts history
- Mouse, touch, and keyboard support
- Web Audio API sound effect
- Mobile vibration support
- Responsive dark-mode interface
- Reduced-motion support

## Reaction Ratings

| Time        | Rating            |
| ----------- | ----------------- |
| Under 200ms | Superhuman        |
| 200-300ms   | Elite Reflexes    |
| 300-400ms   | Above Average     |
| 400-500ms   | Average Human     |
| Over 500ms  | Needs more coffee |

## Tech Stack

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Web Audio API
- Vibration API
- localStorage

## Folder Structure

```text
reaction-speed-tester/
  index.html
  style.css
  script.js
  README.md
  LICENSE
```

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Click `Start Game`.
4. Wait for the green screen.
5. Click, tap, or press Space/Enter as fast as possible.

No build step or dependencies are required.

## Architecture Notes

The project is split into three main files:

- `index.html` defines the game layout and stats sections.
- `style.css` controls fullscreen states, cards, buttons, responsive layout, and animations.
- `script.js` manages game state, random timing, scoring, history, sound, vibration, and storage.

## Accessibility

- The game screen is keyboard focusable.
- Space and Enter can be used to react.
- Result text uses live-region attributes for screen reader updates.
- Buttons have visible focus styles.
- Motion is reduced when the user prefers reduced motion.

## Performance

The app is dependency-free and runs fully in the browser. Reaction timing uses `performance.now()` for better precision than `Date.now()`.

## Lessons Learned

- How to manage game state in JavaScript
- How to use random delays
- How to measure elapsed time accurately
- How to store personal best scores with `localStorage`
- How browser APIs can add sound and haptic feedback

## Future Improvements

- Add average reaction analytics
- Add difficulty modes
- Add fake-out flashes
- Add sound toggle
- Add leaderboard UI
- Add keyboard-only challenge mode
- Add theme options

## Fazal Labs Ecosystem

Part of **Fazal Labs** under the **Fun Lab** suite.

This is a lightweight browser game built to show timing logic, UI feedback, and playful interaction.

## License

MIT License
