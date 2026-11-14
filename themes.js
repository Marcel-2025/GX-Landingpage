const looks = [
  {
    "key": "ice",
    "de": "Eiskeramik",
    "en": "Ice Ceramic",
    "bg": "#bddff2",
    "accent": "#057ca1",
    "fx": "ice"
  },
  {
    "key": "laser",
    "de": "Neon Ice",
    "en": "Neon Ice",
    "bg": "#071d2d",
    "accent": "#ff7396",
    "fx": "neon"
  },
  {
    "key": "cobalt",
    "de": "Kobaltglas",
    "en": "Cobalt Glass",
    "bg": "#080f32",
    "accent": "#55c8ff",
    "fx": "glass"
  },
  {
    "key": "ruby",
    "de": "Rubinglas",
    "en": "Ruby Glass",
    "bg": "#100813",
    "accent": "#ff6586",
    "fx": "ruby"
  },
  {
    "key": "rim",
    "de": "Rubin · Neon-X",
    "en": "Ruby · Neon X",
    "bg": "#160c19",
    "accent": "#ff95b0",
    "fx": "ruby"
  },
  {
    "key": "neon",
    "de": "Neon Midnight",
    "en": "Neon Midnight",
    "bg": "#070b22",
    "accent": "#8fb8ff",
    "fx": "neon"
  },
  {
    "key": "black",
    "de": "Mattes Schwarz",
    "en": "Matte Black",
    "bg": "#060606",
    "accent": "#ff758a",
    "fx": "black"
  },
  {
    "key": "smoke",
    "de": "Rauchglas",
    "en": "Smoked Glass",
    "bg": "#101219",
    "accent": "#cbd7ec",
    "fx": "smoke"
  },
  {
    "key": "crt",
    "de": "Retro CRT",
    "en": "Retro CRT",
    "bg": "#04120f",
    "accent": "#68e6bc",
    "fx": "crt"
  },
  {
    "key": "aurora",
    "de": "Polarlicht",
    "en": "Aurora",
    "bg": "#080e18",
    "accent": "#75ebc9",
    "fx": "aurora"
  },
  {
    "key": "gold",
    "de": "Schwarzgold",
    "en": "Black Gold",
    "bg": "#100d09",
    "accent": "#ffd27a",
    "fx": "glass"
  },
  {
    "key": "amethyst",
    "de": "Amethyst",
    "en": "Amethyst",
    "bg": "#140c22",
    "accent": "#d4a5ff",
    "fx": "glass"
  },
  {
    "key": "emerald",
    "de": "Smaragd · Violett",
    "en": "Emerald · Violet",
    "bg": "#0b1118",
    "accent": "#69efbc",
    "light": "#c999ff",
    "fx": "duo"
  },
  {
    "key": "sapphire",
    "de": "Saphir · Gold",
    "en": "Sapphire · Gold",
    "bg": "#0a1020",
    "accent": "#80b6ff",
    "light": "#ffcd72",
    "fx": "duo"
  },
  {
    "key": "rose",
    "de": "Roségold · Türkis",
    "en": "Rose Gold · Turquoise",
    "bg": "#180e16",
    "accent": "#ffb9bf",
    "light": "#67ebda",
    "fx": "duo"
  },
  {
    "key": "copper",
    "de": "Kupfer · Eisblau",
    "en": "Copper · Ice Blue",
    "bg": "#150f11",
    "accent": "#ffb07d",
    "light": "#83dfff",
    "fx": "duo"
  }
];
const body = document.body;
const lookButtons = document.querySelectorAll('[data-look]');
let active;
function updateName() {
  lookButtons.forEach(button => {
    button.title = button.querySelector("span").dataset[document.documentElement.lang];
  });
  document.querySelectorAll('[data-current]').forEach(label => {
    label.textContent = active[document.documentElement.lang] || active.de;
  });
}
function chooseLook(key) {
  active = looks.find(look => look.key === key) || looks.find(look => look.key === 'ruby');
  body.dataset.fx = active.fx;
  body.classList.toggle('bright', active.fx === 'ice');
  body.style.setProperty('--bg', active.bg);
  body.style.setProperty('--accent', active.accent);
  body.style.setProperty('--light', active.light || active.accent);
  document.querySelectorAll('[data-brand-icon]').forEach(img => {
    img.src = 'assets/themes/' + active.key + (img.id === 'showcase-icon' ? '.webp' : '-thumb.webp');
  });
  document.querySelector('link[rel="icon"]').href = 'assets/themes/' + active.key + '-thumb.webp';
  document.querySelector('meta[name="theme-color"]').content = active.bg;
  lookButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.look === active.key)));
  updateName();
}
let initial = 'ruby';
try { initial = localStorage.getItem('gx-look') || initial; } catch {}
chooseLook(initial);
lookButtons.forEach(button => button.addEventListener('click', () => {
  chooseLook(button.dataset.look);
  try { localStorage.setItem('gx-look', active.key); } catch {}
}));
document.getElementById('language').addEventListener('click', updateName);
const previews = [
  ['pc_alle_konsolen.jpg', 'GX Launcher · Coverflow'],
  ['pc_regal_gamecube.jpg', 'GX Launcher · GameCube'],
  ['pc_spielstaende.jpg', 'GX Launcher · Memory Card']
];
const previewButtons = document.querySelectorAll('[data-preview]');
previewButtons.forEach(button => button.addEventListener('click', () => {
  const [file, alt] = previews[Number(button.dataset.preview)];
  const zoom = document.querySelector('.preview-image');
  zoom.dataset.image = 'assets/' + file;
  zoom.firstElementChild.src = zoom.dataset.image;
  zoom.firstElementChild.alt = alt;
  previewButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));
