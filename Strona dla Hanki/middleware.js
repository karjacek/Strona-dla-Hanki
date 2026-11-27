// Ochrona hasłem całej strony (HTTP Basic Auth) — Vercel Routing Middleware.
// Ustaw w Vercel → Project → Settings → Environment Variables:
//   SITE_USER      (np. rodzina)
//   SITE_PASSWORD  (długie hasło)
// Jeśli zmienne nie są ustawione, strona jest otwarta (wygodne przy pierwszym wdrożeniu).
import { next } from '@vercel/functions';

export const config = {
  // wszystko oprócz manifestu i ikony (przeglądarki pobierają je bez hasła)
  matcher: ['/((?!manifest.webmanifest|assets/favicon.svg).*)'],
};

const safeEqual = (a, b) => {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
};

export default function middleware(request) {
  const user = process.env.SITE_USER;
  const pass = process.env.SITE_PASSWORD;
  if (!user || !pass) return next();

  const header = request.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(':');
      if (safeEqual(u, user) && safeEqual(rest.join(':'), pass)) return next();
    } catch { /* zły nagłówek */ }
  }
  return new Response('Ta strona jest prywatna. Podaj login i hasło rodziny.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Nasz Rodzinny Kacik", charset="UTF-8"', 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
