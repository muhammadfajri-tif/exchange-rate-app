# Exchange Rate App

Exchange Rate App is a simple web application that allows users to see visualized exchange rates of different currencies and get the latest exchange rates with insights from generative AI.

## Installation

### Pre-requisites

- [NodeJS](https://nodejs.org/en/download/) `v18` or latest
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

### Setup

1. Clone the project repository:

    ```bash
    git clone https://github.com/muhammadfajri-tif/exchange-rate-app.git
    cd exchange-rate-app
    ```

2. Install required packages and dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Scripts

- **`dev`**: Starts the Vite development server.
- **`build`**: Compiles TypeScript and builds the project using Vite.
- **`lint`**: Runs ESLint on the `src` directory with specific options.
- **`preview`**: Serves the built project for preview.

## Project Structure

```plaintext
exchange-rate-app/
├── public
├── src/
│ ├── assets/
│ ├── components/
│ ├── config/
│ ├── context/
│ ├── data/
│ ├── pages/
│ ├── styles/
│ ├── types/
│ ├── App.tsx
│ ├── data.ts
│ ├── main.tsx
│ ├── validateEnv.ts
│ └── vite-env.d.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

src directory contains the main source code of the project. It consists of the following directories and files:

- **`assets/`**: Contains static assets like images, icons, and fonts.
- **`components/`**: Contains reusable components used in the project.
- **`config/`**: Contains configuration files for the project.
- **`context/`**: Contains React context providers for global state management.
- **`data/`**: Contains data files used in the project.
- **`pages/`**: Contains React components for different pages of the application.
- **`styles/`**: Contains global styles and SCSS files.
- **`types/`**: Contains TypeScript type definitions used in the project.
- **`App.tsx`**: Main React component that serves as the entry point of the application.
- **`data.ts`**: Contains functions to fetch data from the API.
- **`main.tsx`**: Main file that initializes the React application.
- **`validateEnv.ts`**: Validates the environment variables used in the project.
- **`vite-env.d.ts`**: TypeScript type definitions for Vite environment variables.

Other important files and directories in the project root are:

- **`.env.example`**: Example environment variables file.
- **`.gitignore`**: Specifies intentionally untracked files to ignore.
- **`index.html`**: HTML template file for the application.
- **`package.json`**: Contains project metadata and dependencies.
- **`tsconfig.json`**: TypeScript configuration file.
- **`vite.config.ts`**: Vite configuration file.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: React package for working with the DOM.
- **React Router DOM**: Declarative routing for React applications.
- **@tanstack/react-query**: Hooks for fetching, caching, and updating data.
- **@mui/x-data-grid**: Advanced Data Grid component for Material-UI.
- **ApexCharts & React ApexCharts**: Modern charting library that helps to create interactive and responsive charts.
- **Recharts**: A composable charting library built on React components.
- **React Markdown**: Convert Markdown into React components.
- **React Select**: A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.
- **React Slick & Slick Carousel**: Carousel component for React.
- **Sass**: CSS preprocessor to make writing styles easier and more maintainable.

## DevDependencies

- **TypeScript**: A strict syntactical superset of JavaScript that adds optional static typing.
- **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **@typescript-eslint/eslint-plugin & @typescript-eslint/parser**: Integrates ESLint with TypeScript.
- **@vitejs/plugin-react**: Vite plugin to support React projects.
- **@types/react & @types/react-dom**: TypeScript type definitions for React.
- **@types/react-slick**: TypeScript type definitions for React Slick.
- **Vite**: Next generation frontend tooling. It's fast!

## Linting

To lint the project, run:

```bash
npm run lint
# or
yarn lint
```

## Building the Project

To build the project, run:

```bash
npm run build
# or
yarn build
```

The compiled project will be available in the `dist` directory.

## Previewing the Project

To preview the built project, run:

```bash
npm run preview
# or
yarn preview
```

The preview server will be available at `http://localhost:5173`.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [ApexCharts](https://apexcharts.com/)
- [Recharts](https://recharts.org/)
- [React Select](https://react-select.com/)
- [React Slick](https://react-slick.neostack.com/)
- [Sass](https://sass-lang.com/)
