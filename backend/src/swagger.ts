require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Fatwa",
    description: "Fatwa Islamic website",
  },
  host: process.env.HOST ?? "localhost:8000",
  schemes: ["http", "https"],
  tags: [
    {
      name: "Authentication",
      description: "Authentication endpoint for manage user",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Some description...",
    },
  },
};

const APP_ROUTES = ["./index.ts"];

const outputFile = "./swagger.json";

swaggerAutogen(outputFile, APP_ROUTES, doc);
