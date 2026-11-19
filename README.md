# BlackCodex Creative website

Static site (plain HTML, CSS and JavaScript). No build step, no server, no database.

## Put it online (GitHub Pages)
1. Use the public repo `BlackCodex-`.
2. Upload every file in this folder to the repo root (Add file, then Upload files). Commit.
3. Settings, then Pages. Source: Deploy from a branch. Branch: `main`, folder `/ (root)`. Save.
4. The site goes live at https://lau101-ui.github.io/BlackCodex-/ after a minute or two.

## Replace before launch
Everything outlined with a dashed amber border is a placeholder:
- Package names, prices and what is included (packages.html)
- Add-on prices (packages.html)
- Deposit, cancellation, delivery and revision details (terms.html)
- Link to the wallpaper app (index.html, "Things I build")
Delete the "Draft for review" boxes on terms.html and privacy.html once reviewed.
To remove an amber outline, delete `class="todo"` from that element.

## Add a video to a project
In index.html or work.html, find the project button and set `data-video` to a YouTube
privacy embed link, for example `data-video="https://www.youtube-nocookie.com/embed/VIDEO_ID"`.
Only that address pattern is accepted.

## Custom domain later
1. Buy the domain, then in repo Settings, Pages, enter it under Custom domain.
2. Add the DNS records GitHub shows you, and turn on Enforce HTTPS.
3. In every .html file, sitemap.xml and robots.txt, replace
   `https://lau101-ui.github.io/BlackCodex-` with your domain (find and replace).
Links inside the site are relative, so nothing else breaks.

## Security notes
- No server code, no database, no logins, no cookies, no analytics: almost nothing to attack.
- Content Security Policy in every page blocks scripts and styles from anywhere except this site.
- The contact form only opens WhatsApp or email on the visitor's phone. Nothing is stored.
- No inline scripts or styles, and no third-party files. Fonts and the 3D library are included here.
- GitHub Pages cannot set HTTP headers. If you want HSTS and extra headers later, put the custom
  domain behind Cloudflare's free plan.
- Protect your GitHub account: turn on two-factor authentication or a passkey, and keep the Claude
  GitHub app limited to the repos it needs.

## Test checklist (do this on your phone, live)
- Home loads, the lens appears and turns when you drag it, f-stop buttons open and close the iris
- Menu opens and closes on mobile
- Work frames open details; Esc or Close shuts them
- Contact form opens WhatsApp and email with the message filled in
- Terms, Privacy and 404 pages load; favicon shows in the browser tab
- Paste the live link into WhatsApp and check the preview image shows
