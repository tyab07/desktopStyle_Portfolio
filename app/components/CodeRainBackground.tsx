"use client";

import { useEffect, useRef, useMemo } from "react";

const CODE_SNIPPETS = [
    `const app = express();`,
    `import React from 'react';`,
    `async function fetchData() {`,
    `  const res = await fetch(url);`,
    `  return res.json();`,
    `}`,
    `export default function App() {`,
    `  const [state, setState] = useState();`,
    `  useEffect(() => {`,
    `    loadData();`,
    `  }, []);`,
    `  return <div>{data}</div>;`,
    `}`,
    `app.get('/api', (req, res) => {`,
    `  res.json({ status: 'ok' });`,
    `});`,
    `const schema = new Schema({`,
    `  name: { type: String },`,
    `  email: { type: String },`,
    `});`,
    `function middleware(req, res, next) {`,
    `  if (req.headers.auth) next();`,
    `}`,
    `const router = createBrowserRouter([`,
    `  { path: '/', element: <Home /> },`,
    `]);`,
    `import { motion } from 'framer-motion';`,
    `const variants = {`,
    `  hidden: { opacity: 0, y: 20 },`,
    `  visible: { opacity: 1, y: 0 },`,
    `};`,
    `export async function POST(req) {`,
    `  const body = await req.json();`,
    `  return NextResponse.json(body);`,
    `}`,
    `const db = mongoose.connect(URI);`,
    `npm install next react`,
    `git commit -m "feat: init"`,
    `docker build -t app .`,
    `SELECT * FROM users WHERE id=$1`,
    `CREATE TABLE projects (`,
    `  id SERIAL PRIMARY KEY,`,
    `  title TEXT NOT NULL`,
    `);`,
    `model.fit(X_train, y_train)`,
    `pipeline = Pipeline([`,
    `  ('vectorizer', TfidfVectorizer()),`,
    `  ('clf', LogisticRegression()),`,
    `])`,
];

export default function CodeRainBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const columns = useMemo(() => {
        const cols = [];
        const numCols = 30;
        for (let i = 0; i < numCols; i++) {
            const snippetLines: string[] = [];
            // Each column gets a random set of code lines
            const startIdx = Math.floor(Math.random() * CODE_SNIPPETS.length);
            for (let j = 0; j < 40; j++) {
                snippetLines.push(CODE_SNIPPETS[(startIdx + j) % CODE_SNIPPETS.length]);
            }
            cols.push({
                x: (i / numCols) * 100,
                speed: 12 + Math.random() * 18,
                opacity: 0.04 + Math.random() * 0.06,
                lines: snippetLines,
                offset: Math.random() * 2000,
                fontSize: 11 + Math.floor(Math.random() * 3),
                hue: 200 + Math.floor(Math.random() * 40), // blue-ish range
            });
        }
        return cols;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animFrame: number;
        const lineHeight = 18;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = (timestamp: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            columns.forEach((col) => {
                const totalTextHeight = col.lines.length * lineHeight;
                const x = (col.x / 100) * canvas.width;
                const scrollY = ((timestamp + col.offset) / col.speed / 100) * lineHeight;
                const startY = -(scrollY % totalTextHeight);

                ctx.font = `${col.fontSize}px 'JetBrains Mono', 'Consolas', monospace`;

                col.lines.forEach((line, lineIdx) => {
                    const y = startY + lineIdx * lineHeight;
                    if (y > -lineHeight && y < canvas.height + lineHeight) {
                        // Syntax highlighting simulation
                        const isKeyword = line.match(/^(const|let|var|function|import|export|async|await|return|if|new|from)\b/);
                        const isString = line.includes("'") || line.includes('"');
                        const isComment = line.startsWith("//") || line.startsWith("npm") || line.startsWith("git") || line.startsWith("docker");

                        let hue = col.hue;
                        let saturation = 70;
                        let lightness = 55;

                        if (isKeyword) {
                            hue = 280; // purple for keywords
                            saturation = 60;
                            lightness = 60;
                        } else if (isString) {
                            hue = 140; // green for strings
                            saturation = 50;
                            lightness = 50;
                        } else if (isComment) {
                            hue = 30; // orange for commands
                            saturation = 60;
                            lightness = 50;
                        }

                        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${col.opacity})`;
                        ctx.fillText(line, x, y);
                    }
                });

                // Draw the same lines again after the total height for seamless loop
                col.lines.forEach((line, lineIdx) => {
                    const y = startY + totalTextHeight + lineIdx * lineHeight;
                    if (y > -lineHeight && y < canvas.height + lineHeight) {
                        const isKeyword = line.match(/^(const|let|var|function|import|export|async|await|return|if|new|from)\b/);
                        const isString = line.includes("'") || line.includes('"');
                        const isComment = line.startsWith("//") || line.startsWith("npm") || line.startsWith("git") || line.startsWith("docker");

                        let hue = col.hue;
                        let saturation = 70;
                        let lightness = 55;

                        if (isKeyword) { hue = 280; saturation = 60; lightness = 60; }
                        else if (isString) { hue = 140; saturation = 50; lightness = 50; }
                        else if (isComment) { hue = 30; saturation = 60; lightness = 50; }

                        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${col.opacity})`;
                        ctx.fillText(line, x, y);
                    }
                });
            });

            animFrame = requestAnimationFrame(draw);
        };

        animFrame = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener("resize", resize);
        };
    }, [columns]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 1 }}
        />
    );
}
