import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Bleoo-Connect-App-Backend Core API Documentation",
            version: "1.0.0",
            description: "The official backend for the **Bleoo Connect App**, a platform that unites Accra Academy alumni for mentorship, networking, events, and professional opportunities. This backend API provides robust support for authentication, user management, news feed management, real-time chat messaging, notifications and role-based access control (RBAC).",
        },
        contact: {
            name: "William Ofosu Parwar",
            title: "Project Maintainer: Senior Software Backend Engineer",
            url: "https://williamofosuparwar.vercel.app/",
            email: "williamofosu677@gmail.com",
        },
        license: {
            name: "MIT License",
            url: "https://github.com/1253William/Applicant-Tracking-System-Backend?tab=MIT-1-ov-file#readme",
        },
        servers: [
            {
                url: "http://localhost:8081",
                description: "Development server",
            },
            {
                url: "https://applicant-tracking-system-backend-aqpr.onrender.com",
                description: "Live server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["src/routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
