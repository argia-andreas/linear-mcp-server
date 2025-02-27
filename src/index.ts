import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { LinearClient } from "@linear/sdk";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set up Linear client
const linearApiKey = process.env.LINEAR_API_KEY;
if (!linearApiKey) {
  console.error("ERROR: LINEAR_API_KEY environment variable is required");
  process.exit(1);
}

const linearClient = new LinearClient({
  apiKey: linearApiKey
});

// Create MCP server
const server = new McpServer({
  name: "Linear MCP Server",
  version: "1.0.0"
});

// Add a tool to get a user's todo tickets
server.tool(
  "get-user-todo-tickets",
  {
    userId: z.string().optional(),
    email: z.string().optional(),
  },
  async ({ userId, email }) => {
    try {
      // Get user by ID or email
      let user;
      if (userId) {
        user = await linearClient.user(userId);
      } else if (email) {
        const users = await linearClient.users();
        user = users.nodes.find(u => u.email === email);
        if (!user) {
          return {
            content: [{ type: "text", text: `User with email ${email} not found` }],
            isError: true
          };
        }
      } else {
        return {
          content: [{ type: "text", text: "Either userId or email is required" }],
          isError: true
        };
      }

      if (!user) {
        return {
          content: [{ type: "text", text: `User not found` }],
          isError: true
        };
      }

      // Get assigned issues with todo status
      const issues = await linearClient.issues({
        filter: {
          assignee: { id: { eq: user.id } },
          state: { name: { eq: "Todo" } }
        }
      });

      if (issues.nodes.length === 0) {
        return {
          content: [{ type: "text", text: `No todo tickets found for ${user.name || user.email}` }]
        };
      }

      // Format tickets for display
      const formattedTickets = issues.nodes.map(issue => {
        return {
          id: issue.id,
          identifier: issue.identifier,
          title: issue.title,
          url: issue.url,
          priority: issue.priority
        };
      });

      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(formattedTickets, null, 2)
        }]
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error fetching Linear tickets:", err);
      return {
        content: [{ type: "text", text: `Error: ${err.message || "Unknown error"}` }],
        isError: true
      };
    }
  }
);

// Start the server
const transport = new StdioServerTransport();
server.connect(transport).catch(error => {
  console.error("Server error:", error);
  process.exit(1);
});

console.log("Linear MCP Server started");