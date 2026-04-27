export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const title = url.searchParams.get('title') || '消息推送';
      const message = url.searchParams.get('message') || '无告警信息';
      const date = url.searchParams.get('date') || '无时间信息';
      const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
            background: radial-gradient(ellipse at 30% 10%, #2d1b3a 0%, #1a1c3b 40%, #0f1b2d 100%);
            color: #e0e8ff;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;
            position: relative;
            overflow-x: hidden;
        }

        body::before {
            content: '';
            position: absolute;
            inset: 0;
            background: 
                radial-gradient(circle at 20% 30%, rgba(180, 140, 255, 0.15) 0%, transparent 45%),
                radial-gradient(circle at 80% 70%, rgba(100, 200, 255, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 50% 90%, rgba(200, 160, 255, 0.08) 0%, transparent 50%);
            pointer-events: none;
        }

        .particles {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
        }

        .star-particle {
            position: absolute;
            background: #fff;
            border-radius: 50%;
            filter: blur(0.6px);
            animation: starFloat 14s infinite ease-in-out;
            box-shadow: 0 0 6px rgba(180, 160, 255, 0.7), 0 0 12px rgba(140, 200, 255, 0.4);
        }

        @keyframes starFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.2;
            }
            15% {
                opacity: 0.7;
            }
            50% {
                transform: translateY(-25vh) scale(1.3);
                opacity: 0.9;
            }
            85% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(-52vh) scale(0.8);
                opacity: 0.1;
            }
        }

        .container {
            position: relative;
            z-index: 1;
            max-width: 720px;
            width: 100%;
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(28px) saturate(180%);
            -webkit-backdrop-filter: blur(28px) saturate(180%);
            border-radius: 28px;
            padding: 44px 40px;
            box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.45),
                        0 0 0 1px rgba(255, 255, 255, 0.12),
                        inset 0 0 20px rgba(255, 255, 255, 0.03);
            transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .container:hover {
            transform: translateY(-4px);
            box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.55),
                        0 0 0 1px rgba(255, 255, 255, 0.18),
                        inset 0 0 30px rgba(255, 255, 255, 0.04);
        }

        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 20px;
            right: 20px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #b794f4, #63b3ed, #b794f4, transparent);
            border-radius: 0 0 10px 10px;
        }

        .title {
            text-align: center;
            margin-bottom: 38px;
            font-size: 2.1rem;
            font-weight: 500;
            letter-spacing: 3px;
            background: linear-gradient(135deg, #e2c6ff, #b5deff, #dab6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 15px rgba(180, 150, 255, 0.5);
            position: relative;
            padding-bottom: 14px;
        }

        .title::after {
            content: '✨';
            position: absolute;
            bottom: -18px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.2rem;
            filter: drop-shadow(0 0 8px #c4b5fd);
            animation: twinkle 2.2s infinite alternate;
        }

        @keyframes twinkle {
            0% { opacity: 0.5; transform: translateX(-50%) scale(0.95); }
            100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        .info-card {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-radius: 20px;
            padding: 24px 28px;
            margin-bottom: 22px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-left: 3px solid #a78bfa;
            transition: all 0.3s ease;
            box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.25);
        }

        .info-card:last-child {
            border-left-color: #60a5fa;
        }

        .info-card:hover {
            background: rgba(255, 255, 255, 0.07);
            border-left-width: 4px;
            transform: translateX(4px);
            box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.35);
            border-color: rgba(255, 255, 255, 0.15);
        }

        .info-label {
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 1px;
            color: #b4bdf8;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            font-size: 0.85rem;
        }

        .info-label::before {
            content: '';
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #c4b5fd;
            margin-right: 10px;
            box-shadow: 0 0 8px #a78bfa;
        }

        .info-content {
            font-size: 1.15rem;
            line-height: 1.7;
            color: #dde7ff;
            word-break: break-word;
            white-space: pre-line;
            font-weight: 400;
        }

        .info-content h1, .info-content h2, .info-content h3 {
            color: #e2ccff;
            margin: 1.2em 0 0.5em;
            font-weight: 500;
            letter-spacing: 0.5px;
        }
        .info-content p {
            margin-bottom: 1em;
        }
        .info-content strong {
            color: #f5efff;
            font-weight: 600;
            text-shadow: 0 0 6px rgba(200, 180, 255, 0.5);
        }
        .info-content em {
            color: #b6c8ff;
            font-style: italic;
        }
        .info-content code {
            background: rgba(20, 18, 40, 0.5);
            color: #cab8ff;
            padding: 2px 8px;
            border-radius: 8px;
            font-family: 'SF Mono', 'Fira Code', monospace;
            font-size: 0.9em;
        }
        .info-content pre {
            background: rgba(10, 8, 25, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #dde7ff;
            padding: 1.2em;
            border-radius: 16px;
            overflow-x: auto;
            margin: 1em 0;
        }
        .info-content blockquote {
            border-left: 4px solid #8b9cf7;
            margin: 1em 0;
            padding-left: 1.2em;
            color: #b9c8ff;
            font-style: italic;
            background: rgba(255,255,255,0.02);
            border-radius: 0 8px 8px 0;
        }
        .info-content ul, .info-content ol {
            padding-left: 1.8em;
            margin-bottom: 1em;
        }
        .info-content li {
            margin-bottom: 0.5em;
        }
        .info-content a {
            color: #b595ff;
            text-decoration: none;
            border-bottom: 1px dashed rgba(180, 150, 255, 0.5);
        }
        .info-content a:hover {
            color: #d8c4ff;
            border-bottom-style: solid;
        }
        .info-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            background: rgba(20, 18, 40, 0.4);
            border-radius: 14px;
            overflow: hidden;
            backdrop-filter: blur(5px);
        }
        .info-content th {
            background: rgba(120, 100, 210, 0.25);
            color: #ddceff;
            padding: 0.8em;
            font-weight: 500;
        }
        .info-content td {
            padding: 0.8em;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            color: #ccd9ff;
        }

        @media (max-width: 640px) {
            .container {
                padding: 32px 24px;
                border-radius: 24px;
            }
            .title {
                font-size: 1.8rem;
            }
            .info-card {
                padding: 20px 18px;
            }
        }

        .particles {
            display: block;
        }
    </style>
</head>
<body>
    <div class="particles" id="particles"></div>
    <div class="container">
        <div class="title" id="title">${title}</div>
        <div class="info-card">
            <div class="info-label">通知内容</div>
            <div class="info-content" id="message">${message}</div>
        </div>
        <div class="info-card">
            <div class="info-label">时间</div>
            <div class="info-content" id="date">${date}</div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
    <script>
        function createParticles() {
            const container = document.getElementById('particles');
            if (!container) return;
            const count = 28;
            const colors = [
                'rgba(230, 210, 255, 0.8)', 
                'rgba(180, 210, 255, 0.7)', 
                'rgba(210, 190, 255, 0.7)',
                'rgba(255, 220, 255, 0.6)',
                'rgba(170, 200, 255, 0.7)'
            ];
            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.classList.add('star-particle');
                const size = Math.random() * 4 + 2;
                star.style.width = \`\${size}px\`;
                star.style.height = \`\${size}px\`;
                star.style.background = colors[Math.floor(Math.random() * colors.length)];
                star.style.left = \`\${Math.random() * 95}%\`;
                star.style.top = \`\${60 + Math.random() * 40}%\`; // 从下方开始
                star.style.animationDuration = \`\${12 + Math.random() * 18}s\`;
                star.style.animationDelay = \`\${Math.random() * 10}s\`;
                star.style.opacity = \`\${0.3 + Math.random() * 0.5}\`;
                container.appendChild(star);
            }
        }

        // Markdown 渲染
        function renderMarkdown() {
            const messageEl = document.getElementById('message');
            if (messageEl && typeof marked !== 'undefined') {
                const raw = messageEl.textContent || messageEl.innerText || '';
                messageEl.innerHTML = marked.parse(raw);
            }
        }

        window.onload = function() {
            createParticles();
            renderMarkdown();
        };
    </script>
</body>
</html>`;
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      });
    },
};
