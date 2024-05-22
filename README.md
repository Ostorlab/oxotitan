# OXO Titan

This project is the open-source user interface for the OXO open-source scanner. It is designed to provide a seamless and intuitive experience for users who need to manage and operate their scanning tasks efficiently. The OXO scanner, known for its robust and versatile scanning capabilities, now has a dedicated UI built with Nuxt 3 to enhance user interaction and functionality. This project aims to offer a comprehensive solution for scanning management, including features like remote access, local caching of scan results, and integration with various scanning agents. By leveraging the power of Nuxt 3, this UI ensures high performance, scalability, and ease of use for all OXO scanner users.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Deployment](#deployment)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is built with [Nuxt 3](https://v3.nuxtjs.org/), a powerful framework for creating universal web applications. It provides a solid foundation to build robust and performant applications.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 20 or later)
- npm (version 7 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-nuxt3-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd oxotitan
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Development

To start the development server, run:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to see your application in action. The server will automatically reload when you make changes to the code.

## Build

To build the project for production, run:

```bash
npm run build
```

This will create a `.output` directory with the production files.

## Directory Structure

Here's an overview of the project directory structure:

```
.
├── assets          # Asset files (e.g., images, stylesheets)
├── components      # Vue components
├── layouts         # Layout components
├── middleware      # Middleware for handling requests
├── pages           # Page components (routes)
├── plugins         # Plugins to extend Nuxt functionality
├── public          # Static files (e.g., robots.txt)
├── store           # Vuex store (state management)
├── .nuxt           # Nuxt build directory (auto-generated)
├── nuxt.config.ts  # Nuxt configuration file
└── package.json    # Project metadata and dependencies
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any ideas or improvements.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
