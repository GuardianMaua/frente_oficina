const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

let messages = [];

function findIndex(id) {
    return messages.findIndex(m => m.id === id);
}

// XSS Detection function
function detectXSS(text) {
    const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe[^>]*>/gi,
        /<object[^>]*>/gi,
        /<embed[^>]*>/gi,
        /<img[^>]*onerror/gi,
        /<svg[^>]*onload/gi,
        /<body[^>]*onload/gi,
        /<input[^>]*onfocus/gi,
        /<form[^>]*onsubmit/gi,
        /<link[^>]*onload/gi,
        /<meta[^>]*onload/gi,
        /<style[^>]*>.*?<\/style>/gi,
        /expression\s*\(/gi,
        /url\s*\(/gi,
        /@import/gi
    ];
    
    return xssPatterns.some(pattern => pattern.test(text));
}

// Work in Progress page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Work in Progress</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                text-align: center;
            }
            .container {
                background: white;
                padding: 3rem;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                max-width: 500px;
            }
            h1 {
                color: #333;
                margin-bottom: 1rem;
                font-size: 2.5rem;
            }
            p {
                color: #666;
                font-size: 1.2rem;
                margin-bottom: 2rem;
            }
            .spinner {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 2s linear infinite;
                margin: 0 auto;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚧 Work in Progress</h1>
            <p>We're building something amazing!<br>Please check back soon.</p>
            <div class="spinner"></div>
        </div>
    </body>
    </html>
  `);
});

// List
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Read one
app.get("/messages/:id", (req, res) => {
  const m = messages.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: "Not found" });
  res.json(m);
});

// Create
app.post("/messages", (req, res) => {
  const { text, author = "Anonymous" } = req.body || {};
  if (typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({ error: "text is required" });
  }
  
  const isXSS = detectXSS(text);
  const now = new Date().toISOString();
  const msg = {
    id: nanoid(),
    text: text.trim(),
    author,
    createdAt: now,
    updatedAt: now,
    isXSS: isXSS,
    flag: isXSS ? "MAUA{XSS_C0MPL3T3D}" : null
  };
  messages.push(msg);
  res.status(201).json(msg);
});


app.put("/messages/:id", (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const { text, author } = req.body || {};
  if (typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({ error: "text is required" });
  }
  
  const isXSS = detectXSS(text);
  const now = new Date().toISOString();
  messages[idx] = {
    ...messages[idx],
    text: text.trim(),
    author: author ?? messages[idx].author,
    updatedAt: now,
    isXSS: isXSS,
    flag: isXSS ? "MAUA{XSS_C0MPL3T3D}" : null
  };
  res.json(messages[idx]);
});

// Partial update
app.patch("/messages/:id", (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const { text, author } = req.body || {};
  if (text !== undefined && (typeof text !== "string" || text.trim().length === 0)) {
    return res.status(400).json({ error: "text, if provided, must be non-empty string" });
  }
  
  const isXSS = text !== undefined ? detectXSS(text) : messages[idx].isXSS;
  const now = new Date().toISOString();
  messages[idx] = {
    ...messages[idx],
    ...(text !== undefined ? { text: text.trim() } : {}),
    ...(author !== undefined ? { author } : {}),
    updatedAt: now,
    isXSS: isXSS,
    flag: isXSS ? "MAUA{XSS_C0MPL3T3D}" : null
  };
  res.json(messages[idx]);
});

// Delete
app.delete("/messages/:id", (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const [deleted] = messages.splice(idx, 1);
  res.json({ deleted });
});


app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});