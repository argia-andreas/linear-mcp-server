# Linear MCP Server

A Model Context Protocol (MCP) server for interacting with Linear. This server allows AI assistants to fetch data from Linear through the MCP standard.

## Current Features

- Get a user's todo tickets by user ID or email address

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file at the root of the project (copy from `.env.example`):
   ```
   LINEAR_API_KEY=your_linear_api_key_here
   ```
   Get your Linear API key from the [Linear Developer Console](https://linear.app/settings/api)

## Development

Run the development server (with hot reload):

```bash
npm run dev
```

## Building for Production

Build the TypeScript code:

```bash
npm run build
```

Run the compiled code:

```bash
npm start
```

## Using with MCP clients

This MCP server implements the standard MCP protocol and can be used with any MCP client. The server exposes the following tools:

### Using with Claude Code

To use this MCP server with Claude Code, run the following command:

```bash
claude mcp add linear-mcp-server -- node dist/index.js
```

This registers the Linear MCP server with Claude Code, allowing you to access Linear tickets directly from your Claude conversations.

### get-user-todo-tickets

Gets all tickets in the "Todo" state for a specified user.

Parameters:
- `userId` (optional): The ID of the user
- `email` (optional): The email of the user

Note: You must provide either `userId` or `email`.

Example response:
```json
[
  {
    "id": "issue-id",
    "identifier": "PROJ-123",
    "title": "Fix login issue",
    "url": "https://linear.app/...",
    "priority": 1
  },
  ...
]
```

## Contributing

Contributions are welcome! Feel free to submit a pull request.