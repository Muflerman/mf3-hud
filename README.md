# vf3-hud

A high-performance, minimalist Heads-Up Display (HUD) for FiveM, featuring a sleek modern design with advanced vehicle feedback systems.

## Features

### Player HUD
- **Minimalist Icon Boxes:** Vertical status bars for Health, Armor, Hunger, and Thirst integrated into clean, glowing boxes.
- **Micro-Animations:** Icons pulse when status is low and shake when critical.
- **Side Bars:** Slim vertical bar for Voice/Microphone and a horizontal bar for Stamina/Oxygen.
- **Dynamic Positioning:** Automatically shifts to the right to accommodate the minimap while driving.

### Vehicle HUD (Speedometer)
- **Digital Display:** Retro-modern white LCD style speed display with zero-padding (e.g., `005`).
- **Sensation of Speed:** Dynamic scaling, motion blur, and glow effects that intensify as you accelerate.
- **Gear Indicator:** Vertical segment bar that pulses upwards as you change gears.
- **Reverse Mode:** Red "R" indicator with matching red bar segments and glow when reversing.
- **Interactive Seatbelt:** Clean icon that fills with a solid white glow when buckled.
- **Compass & Street:** Integrated location system showing current street name and direction.

### Minimap Enhancements
- **Neon Pulse Border:** A stylish border surrounding the minimap that glows based on vehicle speed.
- **Emergency Sirens:** For police and emergency vehicles, the border flashes red and blue in a strobe effect (only active when the player is the driver).

## Configuration

Settings are located in `config.lua`:
- Change update rates (default 100ms for ultra-smoothness).
- Toggle between KMH and MPH.
- Define core framework support (default `qb-core`).

## Credits
Developed by **MFL-Scripts**, based on the original **mt-hud** by **MT-Scripts**.
