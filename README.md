# epubjs-react-native-file-system

> File system adapter for [epubjs-react-native](https://github.com/victorsoares96/epubjs-react-native) on bare React Native.

Uses [`@dr.pogodin/react-native-fs`](https://github.com/birdofpreyru/react-native-fs) **2.40.1 or newer** (the maintained fork of `react-native-fs`).

That version links `UniformTypeIdentifiers` on iOS. Older releases fail to link when the Podfile uses `use_frameworks! :linkage => :dynamic`:

```text
Undefined symbol: _OBJC_CLASS_$_UTType
```

Do not install the unmaintained `react-native-fs` package in the same app.

## Usage

See the [epubjs-react-native](https://github.com/victorsoares96/epubjs-react-native) repository.
