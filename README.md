# Spellbook

Welcome to _Spellbook_ - your comprehensive spellbook and spell management tool! 📚✨<br />
Organize and explore an extensive library of magical spells with ease. Enhance your mystical prowess and streamline your wizardry journey with _Spellbook_ today! 🧙‍♂️🔮

This project draws inspiration from the "_How to Build a Full-stack CRUD App_" tutorial on YouTube, presented by [Orc Dev](https://www.youtube.com/@orcdev). For a comprehensive walkthrough, check out the full video tutorial [here](https://www.youtube.com/watch?v=zdUS_Dwje8Q).

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).<br />
To begin exploring and contributing to this project, follow these steps:

```bash
git clone https://github.com/ThomasCode92/spellbook
cd spellbook  # navigate into project
npm install   # install dependencies
# set up Prisma, as described below
npm run dev   # start development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.<br />
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Local Development with Prima

This project harnesses the power of [Prisma](https://www.prisma.io/) paired with a SQLite database for seamless local development. To set up your local database, just drop a `dev.db` file into the `prisma` directory. Then, execute the following commands to apply migrations and to create a Client:

```bash
touch prisma/dev.db     # create SQLite DB file, if not exists
npx prisma migrate dev  # apply migrations
npx prisma generate     # generate a prisma client
```
