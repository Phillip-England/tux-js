# A MPA Application written in Bun using the Elysia web framework.

## Environment Variables
This project uses fontawesome for icons. Provide a FONTAWESOME_KEY in a .env file found in the root of your project to opt in. To get your own key, go to fontawesome and get a script tag to use their icons. In the script tag, the src attribute is the key. Place this src attribute in the .env file.
```bash
FONTAWESOME_KEY = the value in the src attribute of your fontawesome script tag
```

## Development
Three package.json scripts exist within this project. Here is a breakdown of how they all work.

To start tailwind and watch for changes to class names in your project run:
```bash
bun run tailwind
```

To bundle all your client side code into a single .js file, run
```bash
bun run bundle
```

To start the development server run:
```bash
bun run dev
```

To build your application for production run:
```bash
bun run build
```
