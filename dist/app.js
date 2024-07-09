"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
/**------------------------ */
const index_1 = __importDefault(require("./routes/index"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const database_1 = __importDefault(require("./config/database"));
// Initialize database
(0, database_1.default)();
//Initialize express
const app = (0, express_1.default)();
//Middleware Setup
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
//Routes
app.use('/', index_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
// Middleware to handle 404 errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error); // Pass the error to the next middleware
});
// Error-handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message || 'Internal Server Error',
        },
    });
});
exports.default = app;
