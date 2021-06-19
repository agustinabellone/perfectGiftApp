# Perfect Gift

### ¿Qué 'tecnologías' usé en el desarrollo de ésta app?

- [Git](https://git-scm.com/): Para la administración del código fuente.
- [Gitlab](https://gitlab.com/): Como repositorio de código fuente.
- [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow): Como metodlogía de trabaja con el código fuente.
- [Redmine](https://www.redmine.org/): Para el seguimiento de tareas.
- [nvm](https://github.com/nvm-sh/nvm): Como instalador de nodeJs, para permitir múltiples versiones.
- [nodeJs](https://nodejs.org/es/): Como parte de la instalación básica para contener npm y yarn.
- [yarn](https://yarnpkg.com/lang/en/): Como gestor de paquetes. Aporta varias [ventajas](https://www.arquitecturajava.com/yarn-package-manager-y-node-js/) sobre el uso del (conocido) [npm](https://www.npmjs.com/).
- [React](https://es.reactjs.org/): Como biblioteca de Javascript para la interfaz de usuario.
- [React Native](https://reactnative.dev/): Como fremework para desarrollar apps móviles con React.
- [React Native Elements](https://reactnativeelements.com/): Como UI-Kit y customization.
- [React Navigation](https://reactnavigation.org/): Como librería para la navegación entre pantallas.
- [React Hook Form](https://react-hook-form.com/): Como librería para el manejo de formularios.
- [React Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Context API](https://es.reactjs.org/docs/context.html): Para la persistencia de estado de React. Es una alternativa a Redux.
- [Javascript](https://es.wikipedia.org/wiki/JavaScript)
- [Android Studio](https://developer.android.com/studio): Como IDE para poder levantar el emulador de Android
## Armado de ambientes

### Local

Se describen a continuación los pasos para la instalación del ambiente local, asumiendo que el sistema operativo es Windows. 

Paso 1: Editor de texto

Se recomienda tener como editor [Visual Studio Code](https://code.visualstudio.com/) con los siguientes plugins instalados:

- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [The ES7 React/Redux/GraphQL/React-Native Snippets Extension](https://scotch.io/tutorials/the-best-react-extension-for-vs-code#toc-the-es7-react-redux-graphql-react-native-snippets-extension)
- [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [React Standard Style code snippets](https://marketplace.visualstudio.com/items/TimonVS.ReactSnippetsStandard)

El proyecto cuenta con una carpeta _.vscode_ la cuenta tiene un archivo, el cual establece parámetros de cofguración de vsCode al abrir el proyecto.

Paso 2: Git

Descargar el instalador de Git del siguiente enlace: https://git-scm.com/, ejecutarlo y seguir las indicaciones que aparezcan. 

Paso 3: Entorno de desarrollo de React Native CLI

Seguir el siguiente tutorial para la preparación del entorno de desarrollo:
https://reactnative.dev/docs/environment-setup

## Interacción con la aplicación

### ¿Cómo iniciar la app?

Paso 1: Descargar el código fuente con git

```bash
git clone <repo url>
```

Paso 2: Instalar las dependencias

```bash
yarn install
```

Paso 3: Abrir emulador de Android Studio

Paso 4: Iniciar Metro Bundler

```bash
yarn start
```

Paso 5: Levantar App en Android:
```bash
yarn android
```

Ésto levantará la aplicación en el emulador para poder interactuar con ella.
### Manejo del estado en react

Manejo a través de [context API](https://es.reactjs.org/docs/context.html), con Hooks y siempre dentro del diseño de [functional components](https://es.reactjs.org/docs/components-and-props.html) (no class components).


### Uso de context API en lugar de Redux

- Don, E. (2018). Use Hooks + Context, not React + Redux - LogRocket Blog. [online] LogRocket Blog. Available at: https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/ [Accessed 14 Jan. 2020].

### React Hooks

- codesandbox.io (2020). React Hooks Community Examples. [online]www.codesandbox.io. Available at: https://codesandbox.io/react-hooks [Accessed 29 Jan. 2020].
