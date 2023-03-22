import express from "express";

export function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err.stack);
    const code = err.code || 500;
    const message = err.message || "Internal server error";
    return res.status(code).json({ message });
}

export function notFoundHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    return res.status(404).json({
        message: "Page not found",
        code: 404
    });
}