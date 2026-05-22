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

const chillTracks = [
  { id: 1, title: 'Midnight Breeze', artist: 'Lofi Harbor', mood: 'Focus · Calm', length: '03:42', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Rain on Glass', artist: 'Slow Neon', mood: 'Rainy · Relax', length: '04:18', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Sunset Echo', artist: 'Cozy Tapes', mood: 'Warm · Acoustic', length: '02:56', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Night Ride', artist: 'City Pulse', mood: 'Urban · Dreamy', length: '03:25', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Cloud Notes', artist: 'Amber Keys', mood: 'Sleep · Soft', length: '05:01', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
];

const chillYoutube = [
  { id: 1, title: 'Lofi Girl - beats to relax/study to', channel: 'Lofi Girl', youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
  { id: 2, title: 'Chillhop Radio - jazzy & lofi hip hop beats', channel: 'Chillhop Music', youtubeUrl: 'https://www.youtube.com/watch?v=5yx6BWlEVcY' },
  { id: 3, title: 'Calm Piano - sleep & focus', channel: 'Soothing Relaxation', youtubeUrl: 'https://www.youtube.com/watch?v=sA9qJfV6WmE' }
];

const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', 'http://localhost:3000');

  if (req.method === 'GET' && requestUrl.pathname === '/api/portfolio') return json(res, 200, portfolio);

  if (req.method === 'GET' && requestUrl.pathname === '/api/contact') return json(res, 200, contacts);

  if (req.method === 'GET' && requestUrl.pathname === '/api/chill-youtube') return json(res, 200, chillYoutube);

  if (req.method === 'GET' && requestUrl.pathname === '/api/chill-tracks') {
    const keyword = requestUrl.searchParams.get('q')?.trim().toLowerCase() || '';
    const filtered = keyword
      ? chillTracks.filter((track) => `${track.title} ${track.artist} ${track.mood}`.toLowerCase().includes(keyword))
      : chillTracks;
    return json(res, 200, filtered);
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
