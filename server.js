import http from 'node:http';
import { createServer as createViteServer } from 'vite';

const portfolio = [
  { id: 1, title: 'Cinematic Film Edit', category: 'Cinematic', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Product Commercial', category: 'Product', thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Motion Graphics', category: 'Motion', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Brand Film', category: 'Brand', thumbnail: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Music Video', category: 'Music', thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Social Media Content', category: 'Social', thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop' }
];

const contacts = [];

const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function parseYoutubeId(input = '') {
  if (!input) return null;
  try {
    const url = new URL(input);
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1) || null;
    if (url.hostname.includes('youtube.com')) return url.searchParams.get('v');
  } catch {
    return null;
  }
  return null;
}

async function searchDeezer(keyword) {
  const deezerUrl = `https://api.deezer.com/search?q=${encodeURIComponent(keyword)}`;
  const response = await fetch(deezerUrl);
  if (!response.ok) throw new Error('Không gọi được Deezer API.');
  const payload = await response.json();
  return (payload.data || []).slice(0, 10).map((item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist?.name || 'Unknown artist',
    album: item.album?.title || 'Unknown album',
    albumCover: item.album?.cover_medium || item.album?.cover || '',
    preview: item.preview || '',
    deezerUrl: item.link || '',
    youtubeSearchQuery: `${item.title} ${item.artist?.name || ''} official music video`.trim(),
    youtubeSearchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${item.title} ${item.artist?.name || ''} official music video`)}`
  }));
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', 'http://localhost:3000');

  if (req.method === 'GET' && requestUrl.pathname === '/api/portfolio') return json(res, 200, portfolio);
  if (req.method === 'GET' && requestUrl.pathname === '/api/contact') return json(res, 200, contacts);

  if (req.method === 'GET' && requestUrl.pathname === '/api/deezer-search') {
    const keyword = requestUrl.searchParams.get('q')?.trim();
    if (!keyword) return json(res, 400, { message: 'Thiếu từ khóa tìm bài hát.' });
    try {
      const items = await searchDeezer(keyword);
      return json(res, 200, items);
    } catch (error) {
      return json(res, 502, { message: error.message || 'Lỗi khi gọi Deezer API.' });
    }
  }

  if (req.method === 'GET' && requestUrl.pathname === '/api/youtube-embed') {
    const input = requestUrl.searchParams.get('url')?.trim() || '';
    const query = requestUrl.searchParams.get('q')?.trim() || '';
    const videoId = parseYoutubeId(input);
    if (videoId) return json(res, 200, { embedUrl: `https://www.youtube.com/embed/${videoId}`, source: 'url' });

    return json(res, 200, {
      embedUrl: '',
      source: query ? 'search' : 'empty',
      searchUrl: query ? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}` : ''
    });
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/contact') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { name, email, message } = JSON.parse(body || '{}');
        if (!name || !email || !message) return json(res, 400, { message: 'Thiếu dữ liệu bắt buộc.' });
        contacts.push({ id: Date.now(), name, email, message, createdAt: new Date().toISOString() });
        return json(res, 200, { message: 'Cảm ơn bạn! Mình đã nhận được brief 🎬' });
      } catch {
        return json(res, 400, { message: 'JSON không hợp lệ.' });
      }
    });
    return;
  }

  vite.middlewares(req, res, () => {
    res.statusCode = 404;
    res.end('Not found');
  });
});

server.listen(3000, () => console.log('Full-stack app running at http://localhost:3000'));
