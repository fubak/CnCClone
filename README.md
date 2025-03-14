# Command & Conquer Clone

A browser-based real-time strategy game inspired by the classic Command & Conquer series, built with modern web technologies.

## Tech Stack

- **Frontend**: Phaser 3 (HTML5 game framework)
- **Backend**: Colyseus (multiplayer game server framework) with Node.js
- **Database**: MongoDB
- **Deployment**: Static hosting for client, VPS for server

## Features

- Resource gathering (Tiberium)
- Base building
- Unit production
- Combat system
- Fog of war
- Multiplayer support
- Two factions with shared units

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `client/`: Frontend Phaser game
  - `scenes/`: Game scenes
  - `gameObjects/`: Game entities
  - `ui/`: User interface components
  - `network/`: Network communication
- `server/`: Backend Colyseus server
  - `rooms/`: Game room definitions
  - `db/`: Database interactions
- `shared/`: Shared code between client and server

## License

[MIT](LICENSE) 