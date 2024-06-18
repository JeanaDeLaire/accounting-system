const { setup } = require("jest-environment-node");
const { configure } = require("supertest");

global.setup = setup;
global.configure = configure;
