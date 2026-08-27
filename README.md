# For Shabarna 🧡

A birthday gift website for Shabarna — built with plain HTML, CSS, and JS (no build tools needed).

## Files
- `index.html` — the page structure
- `style.css` — all styling (warm white + baby orange theme)
- `script.js` — gift-box open animation, confetti, scroll reveals

## How to view it locally
Just double-click `index.html`, or open it in your browser.

## How to add your own photos
The "Us, in pictures" section shows 6 polaroid frames. Right now they're placeholders (they'll show a "📷 add photo here" hint until you add real images).

1. Create a folder named `photos` right next to `index.html`.
2. Add 6 photos of you two, named exactly: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`
   (suggested order: first meeting → first date → Durga Pujo → Saraswati Pujo → a favorite candid → a hopeful/future-feeling one)
3. If your files are `.png` instead of `.jpg`, open `index.html`, find the lines like `src="photos/1.jpg"` and change the extension to `.png`.
4. Refresh the page — the photos should appear in their frames automatically, tiltable and clickable (tap to view full-size).

You can also edit the caption text under each photo — search `index.html` for `figcaption` and `data-caption`.

## How to publish it to your GitHub repo

Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Happy birthday, Shabarna 🧡"
git branch -M main
git remote add origin https://github.com/Apurba003/shee.git
git push -u origin main
```

If the repo already has a README or other files in it, do this instead so it merges cleanly:

```bash
git init
git remote add origin https://github.com/Apurba003/shee.git
git fetch
git checkout -b main origin/main   # only if origin/main exists
git add .
git commit -m "Happy birthday, Shabarna 🧡"
git push -u origin main
```

## How to make it live as a real website (free) via GitHub Pages
1. Push the code (steps above).
2. On GitHub, go to your repo → **Settings** → **Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch = `main`, folder = `/ (root)`.
4. Save. After a minute or two, your site will be live at:
   `https://apurba003.github.io/shee/`

Send her that link 🎁
