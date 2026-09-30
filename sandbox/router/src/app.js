import express from 'express'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()

app.use(morgan('combined'))


app.get('/api/status/healthz', (req, res) => {
    res.status(200).json({ status: "OK" })
})

app.get('/api/status/ready', (req, res) => {
    res.status(200).json({ status: "OK" })
})

app.use((req, res, next) => {
    const host = req.headers.host
    const sandboxId = host.split('.')[0]

    const target = `http://sandbox-service-${sandboxId}`; // constuct target URL based on sandboxId

    return createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true

    })(req, res, next)

})



export default app