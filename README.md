# Portfolio Frontend

A personal portfolio website built with **Next.js 16**, **React 19**, **Tailwind CSS 4** and **Framer Motion**. It has a home page, projects, a blog, an about page and a contact form, with light and dark themes.

All content comes from a separate Laravel backend:
**[makgr/personalportfolio](https://github.com/makgr/personalportfolio)**. Nothing about the portfolio owner is hardcoded here, so you can fork this repo, point it at your own backend and get your own site.

## Features

- Home page with hero, stats, featured projects, skills, services, experience, testimonials and latest posts
- Projects list with category filter and a detail page with an image gallery
- Blog with search, category filter, pagination, a table of contents and a reading progress bar
- About page with bio, experience timeline, education, skills and training/certifications
- Contact form and newsletter signup (both post to the backend)
- Light and dark themes, skeleton loaders, page transitions, SEO metadata

## Requirements

- Node.js 20+
- A running copy of the [backend API](https://github.com/makgr/personalportfolio)

## Getting started

```bash
git clone https://github.com/makgr/portfolio-frontend.git
cd portfolio-frontend
npm install
cp .env.example .env.local   # then edit the values
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Variable | Description | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API, including `/api/v1` | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this frontend, used for SEO metadata | `https://example.com` |

Images whose paths come back relative are loaded from the backend host (`NEXT_PUBLIC_API_URL` minus `/api/v1`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Type-check with TypeScript |

## Project structure

```
src/
  app/          Routes (home, projects, blog, about, contact)
  components/   UI grouped by page, plus layout/, shared/, skeletons/
  hooks/        Client hooks (theme, forms, scroll, debounce, ...)
  lib/api/      One fetcher per backend endpoint (client.ts holds the base URL)
  lib/utils/    Helpers (dates, image URLs, headings, constants)
  types/        TypeScript types matching the API responses
```

## Security note

Blog post content is rendered as HTML exactly as the backend returns it. Only trusted admins should be able to write posts, or you should sanitize the HTML on the backend before saving it.

## Contributing

Issues and pull requests are welcome. Please open PRs against the `development` branch and make sure `npm run typecheck` and `npm run build` pass.

## Support the Project

If this project helps you, you can sponsor or donate to support its development.

- **GitHub Sponsors:** [github.com/sponsors/makgr](https://github.com/sponsors/makgr)
- **Bank transfer:**

|              |                       |
| ------------ | --------------------- |
| Account Name | MOHAMMAD ALI KHAN     |
| Account No   | 2061510357001         |
| Bank         | Dutch Bangla Bank PLC |
| Branch       | Jamalpur              |
| SWIFT        | DBBLBDDH              |
| Routing No   | 090390854             |
| Country      | Bangladesh            |

For other ways to donate, contact us by email or Discord.

## Contact

- **Email:** [xvirus.bd@gmail.com](mailto:xvirus.bd@gmail.com)
- **Discord:** `semakgr`
- **Facebook:** [facebook.com/robotbalok](https://www.facebook.com/robotbalok)

## License

[MIT](LICENSE)
