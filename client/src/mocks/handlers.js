import { http } from 'msw';

export const handlers = [
    // Mock a GET request to /api/setup
    http.get('/api/setup', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            { message: "Database is working" }
        ]))
    }),
    // Mock a POST request to /api/login
    http.post('/api/login', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            { email, token }
        ]))
    }),
    // Mock a GET request to /api/user
    http.get('/api/user', (req, res, ctx) => {
        return res(ctx.status(200), ctx.send([
            { name: userName, email: email, sortcode: sortcode, accountNumber: accountNumber }
        ]))
    }),
    // Mock a POST request to /api/user/edit
    http.get('/api/user/edit', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            { message: "Account succesfully updated" }
        ]))
    }),
];