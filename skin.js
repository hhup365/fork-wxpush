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
            background: linear-gradient(145deg, #16132b 0%, #1e2245 35%, #182a3a 65%, #162635 100%);
            color: #e0e6f5;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;
            position: relative;
            overflow-x: hidden;
        }

        .bg-aurora {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
        }

        .aurora-layer {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.22;
            animation: auroraMove 20s ease-in-out infinite alternate;
        }

        .aurora-layer:nth-child(1) {
            width: 650px;
            height: 650px;
            background: radial-gradient(circle, rgba(140, 100, 230, 0.5) 0%, transparent 70%);
            top: -18%;
            left: -12%;
        }

        .aurora-layer:nth-child(2) {
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, rgba(40, 150, 210, 0.45) 0%, transparent 70%);
            bottom: -18%;
            right: -12%;
            animation-delay: -7s;
        }

        .aurora-layer:nth-child(3) {
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(70, 190, 170, 0.4) 0%, transparent 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: -14s;
        }

        @keyframes auroraMove {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(45px, -35px) scale(1.12); }
            100% { transform: translate(-35px, 30px) scale(0.92); }
        }

        .particles {
            position: absolute;
            inset: 0;
            z-index: 1;
            overflow: hidden;
            pointer-events: none;
        }

        .star-particle {
            position: absolute;
            background: #fff;
            border-radius: 50%;
            filter: blur(0.6px);
            animation: starFloat 14s infinite ease-in-out;
            box-shadow: 0 0 12px rgba(170, 140, 255, 0.8), 0 0 20px rgba(80, 170, 245, 0.6);
        }

        @keyframes starFloat {
            0% { transform: translateY(0) scale(1); opacity: 0.2; }
            15% { opacity: 0.8; }
            50% { transform: translateY(-28vh) scale(1.3); opacity: 0.9; }
            85% { opacity: 0.7; }
            100% { transform: translateY(-55vh) scale(0.75); opacity: 0.15; }
        }

        .container {
            position: relative;
            z-index: 2;
            max-width: 680px;
            width: 100%;
            background: rgba(30, 27, 55, 0.35);
            backdrop-filter: blur(32px) saturate(140%);
            -webkit-backdrop-filter: blur(32px) saturate(140%);
            border-radius: 32px;
            padding: 36px 34px 28px;
            box-shadow: 0 30px 50px -10px rgba(0, 0, 0, 0.45),
                        0 0 0 1px rgba(255, 255, 255, 0.12),
                        inset 0 0 50px rgba(255, 255, 255, 0.05);
            transition: all 0.4s ease;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .container:hover {
            transform: translateY(-2px);
            box-shadow: 0 35px 65px -12px rgba(0, 0, 0, 0.55),
                        0 0 0 1px rgba(255, 255, 255, 0.22),
                        inset 0 0 60px rgba(255, 255, 255, 0.08);
        }

        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 24px;
            right: 24px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #a48bff, #4da8ff, #6dd4b5, #a48bff, transparent);
            border-radius: 0 0 10px 10px;
        }

        .title {
            text-align: center;
            margin-bottom: 28px;
            font-size: 2rem;
            font-weight: 500;
            letter-spacing: 2.5px;
            background: linear-gradient(135deg, #cfc0ff, #7ec8ff, #8adfc8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 25px rgba(160, 140, 255, 0.7);
            position: relative;
            padding-bottom: 8px;
        }

        .title::after {
            content: '✨';
            position: absolute;
            bottom: -14px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.1rem;
            filter: drop-shadow(0 0 10px #c0b0ff);
            animation: twinkle 2.5s infinite alternate;
        }

        @keyframes twinkle {
            0% { opacity: 0.6; transform: translateX(-50%) scale(0.95); }
            100% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        .info-card {
            position: relative;
            background: rgba(40, 35, 70, 0.35);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 18px 24px;
            margin-bottom: 18px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.3);
            text-align: left;
        }

        .info-card.flow-border::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 20px;
            padding: 1.5px;
            background: linear-gradient(60deg, #b3a0ff, #4ea6ff, #6ad4b0, #4ea6ff, #b3a0ff);
            background-size: 300% 300%;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: flowBorder 3s ease infinite;
            pointer-events: none;
        }

        @keyframes flowBorder {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .info-card:hover {
            background: rgba(55, 48, 90, 0.5);
            transform: translateX(2px);
            box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.45);
        }

        .info-card.time-card {
            padding: 12px 24px;
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .time-card .info-label {
            margin-bottom: 0;
            white-space: nowrap;
        }

        .time-card .info-content {
            font-size: 1rem;
            line-height: 1.4;
        }

        .info-label {
            font-weight: 600;
            letter-spacing: 1px;
            color: #c8bdff;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            font-size: 0.82rem;
        }

        .info-label::before {
            content: '';
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #a48bff;
            margin-right: 10px;
            box-shadow: 0 0 10px #a48bff;
        }

        .info-content {
            font-size: 1.1rem;
            line-height: 1.65;
            color: #e1e7fc;
            word-break: break-word;
            white-space: pre-line;
            font-weight: 400;
        }

        .info-content h1, .info-content h2, .info-content h3 {
            color: #d5cbff;
            margin: 1em 0 0.3em;
            font-weight: 500;
        }
        .info-content strong {
            color: #f0eaff;
            font-weight: 600;
            text-shadow: 0 0 6px rgba(140, 120, 240, 0.6);
        }
        .info-content em {
            color: #b6caff;
        }
        .info-content code {
            background: rgba(70, 60, 110, 0.55);
            color: #dacdff;
            padding: 2px 8px;
            border-radius: 8px;
        }
        .info-content pre {
            background: rgba(20, 16, 45, 0.65);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.15);
            color: #e6deff;
            padding: 1em;
            border-radius: 16px;
            overflow-x: auto;
        }
        .info-content blockquote {
            border-left: 4px solid #a48bff;
            background: rgba(255,255,255,0.03);
            padding-left: 1.2em;
            color: #c9c0f5;
            border-radius: 0 8px 8px 0;
        }
        .info-content a {
            color: #bb9eff;
            border-bottom: 1px dashed rgba(150,120,240,0.7);
        }
        .info-content table {
            background: rgba(35,30,60,0.4);
            border-radius: 14px;
        }
        .info-content th {
            background: rgba(120,105,200,0.4);
            color: #dcd2ff;
        }
        .info-content td {
            border-bottom: 1px solid rgba(140,130,200,0.2);
            color: #cbc6f5;
        }

        @media (max-width: 640px) {
            .container {
                padding: 28px 20px 22px;
                border-radius: 26px;
            }
            .title {
                font-size: 1.7rem;
                margin-bottom: 24px;
            }
            .info-card {
                padding: 16px 18px;
            }
            .time-card {
                flex-direction: column;
                align-items: flex-start;
                gap: 6px;
            }
            .time-card .info-label,
            .time-card .info-content {
                text-align: left;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="bg-aurora">
        <div class="aurora-layer"></div>
        <div class="aurora-layer"></div>
        <div class="aurora-layer"></div>
    </div>
    <div class="particles" id="particles"></div>
    <div class="container">
        <div class="title" id="title">${title}</div>
        <div class="info-card flow-border">
            <div class="info-label">通知内容</div>
            <div class="info-content" id="message">${message}</div>
        </div>
        <div class="info-card time-card flow-border">
            <div class="info-label">时间</div>
            <div class="info-content" id="date">${date}</div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
    <script>
        function createParticles() {
            const container = document.getElementById('particles');
            if (!container) return;
            const count = 32;
            const colors = [
                'rgba(210, 195, 255, 0.85)', 
                'rgba(140, 190, 255, 0.8)', 
                'rgba(120, 220, 200, 0.8)',
                'rgba(230, 220, 255, 0.7)',
                'rgba(170, 200, 245, 0.85)'
            ];
            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.classList.add('star-particle');
                const size = Math.random() * 4 + 2;
                star.style.width = \`\${size}px\`;
                star.style.height = \`\${size}px\`;
                star.style.background = colors[Math.floor(Math.random() * colors.length)];
                star.style.left = \`\${Math.random() * 95}%\`;
                star.style.top = \`\${65 + Math.random() * 35}%\`;
                star.style.animationDuration = \`\${13 + Math.random() * 17}s\`;
                star.style.animationDelay = \`\${Math.random() * 8}s\`;
                star.style.opacity = \`\${0.3 + Math.random() * 0.5}\`;
                container.appendChild(star);
            }
        }

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
