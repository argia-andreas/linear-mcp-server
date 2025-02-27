# Linear MCP Server Development Guide

## Commands
- Build: `npm run build` - Compiles TypeScript to JavaScript
- Start: `npm run start` - Runs the compiled code
- Dev: `npm run dev` - Runs with ts-node for development
- Tests: Not implemented yet

## Code Style Guidelines
- **Formatting**: 2-space indentation, trailing semicolons
- **Imports**: Group external libraries first, then internal modules
- **Types**: Use strict TypeScript, Zod for validation, explicit return types
- **Naming**: camelCase for variables/functions, PascalCase for types/classes
- **Error Handling**: Use try/catch with typed errors (`error as Error`)
- **Documentation**: Comment complex logic and public APIs
- **Structure**: Keep functions focused on single responsibility
- **Environment**: Use dotenv for configuration, validate required variables

## Linear API
The server uses Linear SDK to fetch user todo tickets. Requires LINEAR_API_KEY in .env file.

## MCP Protocol
Implements Model Context Protocol for exposing Linear data to AI assistants.

## Testing with MCP Inspector
- Install: `npm install -g @modelcontextprotocol/inspector`
- Run server: `npm run dev` (in one terminal)
- Run inspector: `mcp-inspector --transport=stdio --command="node dist/index.js"` (in another terminal)
- For development: `mcp-inspector --transport=stdio --command="ts-node src/index.ts"`