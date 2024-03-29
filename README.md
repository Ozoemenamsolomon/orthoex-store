This is a [Next.js](https://nextjs.org/) project and uses `npm` as it's package manager.

## Getting Started

First, make sure you have [node](https://nodejs.org/en/download/) installed to install the project's depndencies:

```bash
npm install
```

then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Branching strategy

This project uses a [Feature Branching](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) strategy. This means that all new features are developed on a separate branch and merged into the `main` branch once they are ready to be deployed.

### Branch naming

Branches should be named using the following convention:

`feature/feature-name`  
`hotfix/hotfix-name`

## Commit messages

Commit messages should be written in the imperative mood, e.g. "Fix bug" and not "Fixed bug" or "Fixes bug".

## Pull requests

Pull requests should be named using the following convention:

`[feature/bug/chore/hotfix] feature-name`

## Deployment

This project is deployed to [Netlify](https://www.netlify.com/). The `main` branch is automatically deployed to the [production environment](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) and all other branches are deployed to [deploy previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
