import express from 'express'
import morgan from 'morgan'

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/sandbox/health', (req, res) => {
    res.status(200).json({
        message: "sandbox server is running",
        uptime: process.uptime(),
        status: "ok"
    });
})

export default app;
