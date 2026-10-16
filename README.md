# epubjs-react-native-file-system

> File system adapter for [epubjs-react-native](https://github.com/victorsoares96/epubjs-react-native) on bare React Native.

## Installation

```sh
npm install @epubjs-react-native/file-system @dr.pogodin/react-native-fs
```

```sh
yarn add @epubjs-react-native/file-system @dr.pogodin/react-native-fs
```

This package imports [`@dr.pogodin/react-native-fs`](https://github.com/birdofpreyru/react-native-fs) **2.40.1 or newer**. That release links `UniformTypeIdentifiers` on iOS. Older releases fail to link when the Podfile uses `use_frameworks! :linkage => :dynamic`:

```text
Undefined symbol: _OBJC_CLASS_$_UTType
```

If `react-native-fs` is still listed in the project, remove it, install the package above, then rebuild the native app. On iOS, run `npx pod-install` and launch the app again.

Skipping that rebuild crashes on launch with `'ReactNativeFs' could not be found`. This module then fails to evaluate, which shows up as `Cannot read property 'useFileSystem' of undefined`.

## Usage

```tsx
import { useFileSystem } from '@epubjs-react-native/file-system';
```

Pass `useFileSystem` to the `fileSystem` prop of `<Reader>`. The full setup is in the [epubjs-react-native](https://github.com/victorsoares96/epubjs-react-native) repository.
