import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Router = (server) => {
    // Serve static files from the client folder
    server.set("view engine", "ejs")
    server.set("views", (path.join(__dirname, '../src/client/views')));

    server.use(express.static(path.join(__dirname, '../src/client')));

    // Render the main index.ejs view on the "/" route
    server.get("/", (req, res) => {
        try {
            res.render("index"); // Renders views/index.ejs
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    });

    // Render the login page using EJS
    server.get("/login", (req, res) => {
        try {
            res.render("login"); // Renders views/login.ejs
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    });


    server.get("/movies", (req, res) => {
        try {
            res.render("movies"); // Renders views/login.ejs
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    });
    server.get("/services", (req, res) => {
        try {
            res.render("services"); // Renders views/login.ejs
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    });
    server.get("/about", (req, res) => {
        try {
            res.render("about"); // Renders views/login.ejs
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    });
};

export default Router;
