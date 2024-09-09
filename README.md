# TypeScript Template for Cinnamon Spices Applet

This project provides a basic template for creating a [Cinnamon Spices Applet](https://github.com/linuxmint/cinnamon-spices-applets) in [TypeScript](https://webpack.js.org/guides/typescript/).

It comes pre-configured with the following tools:

- [Webpack](https://webpack.js.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

## Cinnamon Applet Development

Cinnamon applets are typically written in JavaScript. If you have experience in web development with JavaScript, writing Cinnamon applets should feel quite familiar. However, documentation on the Cinnamon extension system is sparse, requiring you to gather information from various sources and often figure things out independently. This can be disorienting at first.

A good starting point is to examine the work of other applet developers. Refer to the [Resources](#resources) section below for links to tutorials and further documentation.

### TypeScript

[Gr3q](https://github.com/Gr3q) and [jonath92](https://github.com/jonath92) contributed TypeScript declarations for Cinnamon libraries [types-cjs](https://github.com/Gr3q/types-cjs). This significantly reduces the entry barrier for newcomers.

Another interesting project aiming to provide TypeScript type definitions for GNOME libraries is [GJSify](https://gjsify.org/).

This template currently uses the [types-cjs](https://github.com/Gr3q/types-cjs) project. Using TypeScript can drastically improve the developer experience and overall code quality.

### Webpack

The source code is compiled from TypeScript to JavaScript and bundled using [Webpack](https://webpack.js.org).

### ESLint and Prettier

To maintain high coding standards, the template includes [ESLint](https://eslint.org) and [Prettier](https://prettier.io) with pre-configured settings. ESLint helps identify and fix problems in your code through static analysis, while Prettier ensures consistent code formatting. Both tools integrate seamlessly with most text editors, facilitating a smoother development experience.

## Prerequisites

- **Node**
- **NPM**
- **Git**

I recommend using [Volta](https://volta.sh/) for managing the JavaScript tools.

## Setup and Usage of this Template

### Checkout and IDE

Clone the [Cinnamon Applet Repository](https://github.com/linuxmint/cinnamon-spices-applets):

```sh
  git clone https://github.com/linuxmint/cinnamon-spices-applets.git
  cd cinnamon-spices-applets
```
Open the repository in your preferred IDE. I recommend using an editor with robust TypeScript support, such as [VSCodium](https://vscodium.com/).

Copy the template folder `myApplet@name` from this repository into the root directory of `cinnamon-spices-applets` where all other applets reside.

Navigate to the copied template folder `myApplet@name`. This is now your applet's root directory.

Please do not modify any files outside your applet's folder.

### Folder Structure

```sh
myApplet@name/
├── files
│   └── myApplet@name
│       ├── po
│       │   ├── [..]
│       ├── applet.js
│       ├── my-applet.js
│       ├── icon.png
│       ├── metadata.json
│       ├── settings-schema.json
│       └── stylesheet.css
├── node_modules
│   ├── [..]
├── src
│   ├── applet.ts
│   ├── MyApplet.ts
│   └── [..]
├── eslint.config.mjs
├── info.json
├── package.json
├── screenshot.png
├── test.sh
├── tsconfig.json
├── webpack.config.ts
└── [..]
```

The structure is mostly identical to a regular applet written in JavaScript. However, the `src` folder contains the TypeScript files, and this is where development happens. The `files` folder functions similarly to a `dist` folder you may know from JavaScript-based web development projects.

The TypeScript source files are compiled to JavaScript (configured in `tsconfig.json`). Webpack bundles all the compiled individual files into a single JavaScript file (`my-applet.js`) and copies it to the `files` folder, which is then distributed.

`applet.js` is the entry point for the applet and simply imports the compiled and bundled output from Webpack. The bundling process is configured in `webpack.config.ts`. A [build](#build-applet-and-test-changes) should only update `my-applet.js`.

## Template Adjustments
The template itself defines a basic applet that you can experiment with without any initial adjustments. However, you will likely want to write your own applet.

Adjustments to the template are necessary for this:

### Things to Edit:

- Assign a UUID to the applet:  `<YourAppletName>@<YourGithubUsername>`
- Adjust folder and file names accordingly (change `myApplet@name`)
- At least these files need to be adjusted for your specific settings:
  - `metadata.json`
  - `info.json`
  - `package.json`
- Other places needing adjustments are annotated with `// TODO:` in the template. You can find them with a global search within the template.

## Build Applet and Test Changes

### Install Dependencies

The project has some Node _devDependencies_ which are required for the development and build process. They are listed in the `package.json` file.

Ensure you are in the applet's root folder (where the `package.json` is located) and run:

```sh
npm i
```

### Build the Applet

Run:

```sh
npm run build
```

This executes the `build` script command which is defined in the `package.json`. It triggers Webpack, which will in turn invoke the TypeScript compiler to compile the source files. Webpack then bundles the compiled files together and copies the result into the `files` folder. The applet should then be ready for testing.

### Test the Applet

To run the applet, you need to copy the entire content of the `files` folder to your local Cinnamon applet folder `~/.local/share/cinnamon/applets/<YourAppletName>@<YourGithubUsername>/`. Make sure that your applet is added to a panel.

For the changes to take effect, Cinnamon needs to be restarted. Don't worry! This is not like a reboot and is relatively painless. Just the windows are moved around a bit.

Restart Cinnamon:

```sh
ALT+F2, type "r" and press Enter
```

### Test Script
Manually copying files during the development process to test each change can be tedious. Fortunately, there is a shell script `test.sh` in the applet's root folder.

Run:

```sh
./test.sh
```

The script executes `npm run build`, copies the build result into the local Cinnamon applet folder, and restarts Cinnamon. This is quite handy for quickly testing changes while coding. Alternatively, you can use the official `test-spice` Python script in the repository's root directory. For further details, please refer to the README file of Cinnamon Applet Repository.

### Debugging

Debugging options are quite limited, unfortunately. Only the tool `Looking Glass` (Melange) is available. This can be used to view console output and errors of the applets.

Open Looking Glass:

```sh
Win+L (or ALT+F2), type “lg” and hit Enter
```

### ESLint and Prettier
[ESLint](https://eslint.org) and [Prettier](https://prettier.io) help maintain a high coding standard.

There are two script commands to ensure that your code adheres to your project's coding standards. Run the following commands to check for style violations:

**ESLint:**

```sh
npm run lint
npm run lint-fix
```

**Prettier:**

```sh
npm run format-check
npm run format
```

Ideally, your IDE should automatically read the ESLint and Prettier configurations and provide direct feedback while writing code.

For good guideline definitions, see:

- [Cinnamon's coding guidelines](https://linuxmint-developer-guide.readthedocs.io/en/latest/guidelines.html)
- [GNOME's Guidelines](https://developer.gnome.org/documentation/guidelines.html).

## Troubleshooting

Unhandled errors can easily lead to a crash of the Cinnamon desktop. When this happens, window decorations may disappear, and nothing may be clickable.

### Recover and Restore Cinnamon After a Crash

**Restart Cinnamon:**

```sh
CTRL+ALT+Return, to restart Cinnamon
```

Normally, Cinnamon detects issues with applets and prompts you to disable all applets. Restoring applets afterward can be tedious. If you choose not to disable them, the faulty applet code will be reloaded, likely causing another crash.

Instead, you can manually delete the faulty applet code and then restart Cinnamon:

1. **Open a Virtual Terminal:**

```sh
CTRL+ALT+F1, to start a virtual terminal
```

2. **Navigate to the Applet Directory:**

```sh
cd ~/.local/share/cinnamon/applets/<YourAppletName>@<YourGithubUsername>/
```

3. **Remove the Faulty Applet Code:**

```sh
rm <YourAppletName>.js
```

4. **Go back to GUI:**

```sh
CTRL+ALT+F7, to bring back broken Cinnamon session again
```

5. **Restart Cinnamon:**

```sh
CTRL+ALT+Return, to restart Cinnamon
```

This process should help you recover from a crash without disabling all applets.

## License
This repository is licensed under the MIT License.

When creating your own applet with this template, you may choose any license that fits your needs.

## Resources

Developer Guides:

- [Linux Mint Developer Guide](https://linuxmint-developer-guide.readthedocs.io/en/latest/index.html)
- [GNOME Developer Documentation](https://developer.gnome.org/documentation/index.html)

Applet tutorials:

- https://projects.linuxmint.com/reference/git/cinnamon-tutorials/write-applet.html
- https://nickdurante.github.io/development/Writing-a-Cinnamon-Applet
- https://billauer.co.il/blog/2018/12/writing-cinnamon-applet

API References:

- [Cinnamon Documentation](https://projects.linuxmint.com/reference/git/index.html)
- [GNOME JavaScript Docs](https://gjs-docs.gnome.org)
- [GJS Architecture](https://gjs.guide/extensions/overview/architecture.html)
- [GTK 3 classes](https://docs.gtk.org/gtk3/#classes)
- [Gjsify project - TypeScript declarations for GNOME libraries](https://github.com/gjsify)

Alternative template:

- [cinnamon-template-applet by jonath92](https://github.com/jonath92/cinnamon-template-applet)
