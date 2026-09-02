import fs from 'fs';
import path from 'path';

const pages = [
  { url: 'http://127.0.0.1:3000/', file: 'index.html' },
  { url: 'http://127.0.0.1:3000/bounce-houses', file: 'bounce-houses.html' },
  { url: 'http://127.0.0.1:3000/movie-screen', file: 'movie-screen.html' },
  { url: 'http://127.0.0.1:3000/popcorn-cart', file: 'popcorn-cart.html' },
  { url: 'http://127.0.0.1:3000/about', file: 'about.html' },
  { url: 'http://127.0.0.1:3000/contact', file: 'contact.html' }
];

async function generate() {
  console.log('Generating static HTML files for Hostinger / cPanel / Apache...');
  for (const p of pages) {
    try {
      const res = await fetch(p.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      fs.writeFileSync(p.file, html, 'utf-8');
      console.log(`✓ ${p.file} generated (${html.length} bytes)`);
    } catch (e) {
      console.error(`Failed to fetch ${p.url}:`, e.message);
    }
  }
  console.log('Static build complete!');
}

generate();
