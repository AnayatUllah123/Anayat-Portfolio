import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import contactHandler from './api/contact.js'
import reviewHandler from './api/review.js'

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''

    req.on('data', (chunk) => {
      raw += chunk
    })

    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })
}

function createApiResponse(res) {
  return {
    status(code) {
      res.statusCode = code
      return this
    },
    json(data) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(data))
      return this
    }
  }
}

function localMailApi() {
  return {
    name: 'local-mail-api',
    configureServer(server) {
      const mount = (path, handler) => {
        server.middlewares.use(path, async (req, res) => {
          try {
            req.body = await readJsonBody(req)
            await handler(req, createApiResponse(res))
          } catch (error) {
            console.error(`Local API error for ${path}:`, error)

            if (!res.headersSent) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json; charset=utf-8')
            }

            if (!res.writableEnded) {
              res.end(JSON.stringify({ message: 'Local API request failed.' }))
            }
          }
        })
      }

      mount('/api/contact', contactHandler)
      mount('/api/review', reviewHandler)
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  process.env.GMAIL_USER = env.GMAIL_USER
  process.env.GMAIL_APP_PASSWORD = env.GMAIL_APP_PASSWORD
  process.env.CONTACT_TO = env.CONTACT_TO || env.GMAIL_USER

  return {
    plugins: [react(), localMailApi()],
    server: { port: 5173, host: true },
    preview: { port: 4173, host: true }
  }
})
