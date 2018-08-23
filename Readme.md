# Neos Package for hyphenating text output

This package is licensed under the MIT license, please view the LICENSE file.

Since automatic hyphenation support by browsers can be described as inconsistent at best and might lead to techincally correct but ugly results, this package provides an Eel helper, which can hyphenate text with soft-hyphens (`&:shy;`) in a consistent and configurable manner.
The Eel helper calls a node.js CLI app, which uses the [Hypher](https://github.com/bramstein/hypher) node module and [hyphenation pattern files](https://github.com/bramstein/hyphenation-patterns) to do the initial hyphenation.
Once a word is hyphenated, the result is cached and the word will be served from the cache instead of calling the node.js app every time it occurs.

## Installation

**Install the package:**

	composer require punktde/neos-hyphenation

**Install the node.js app and its dependencies:**

Please make sure you have node.js (this app is tested on node.js 8.0.0 and newer) and npm installed.
Navigate to the `Resources/Private/Library` directory of this package, where the JavaScript app lives, and install it. Please make sure the `index.js` file has its executability flag set:
  ```
  cd Resources/Private/Library
  npm install
  
  #if necessary
  chmod +x index.js
```

**Configure caching in your project:**

Please specify a cache backend for this package's cache (`PunktDeNeosHyphenation_HyphenationCache`) in your project's global cache configuration file. I recommend making the cache persistent, as its contents are unlikely to change.
The first page hit will be very slow, but once most of the long words are in the cache, it will be quite performant.

##Usage

 This package provides the Eel Helper `Hyphenation.hyphenateText(string <text>)`, which takes a string as an argument and returns a hyphenated version of this string. 

## Configuration options

**Minimum word length and padding:**

Users can configure a minimum padding at `PunktDe:Neos:Hyphenation:minimumPadding:`in the `Settings.yaml` file. This is an offset which is applied from both ends of the word wherein no hyphenation can occur. Adjust this to ensure a nice and consistent look of the text, e.g. avoiding linebreaks after just one syllable which might look a bit silly in long words.
To save resources, the Eel Helper will only call hyphenation on words which are at least twice as long as the minimum padding, since only those are eligible for hyphenation in the first place.
The default value is `4`.

**Language/pattern file used for hyphenation:**

The pattern file can be specified in the `Resources/Private/Library/package.json` file or by running `npm install --save <pattern file package>` in the `Resources/Private/Library` directory. Furthermore, it needs to be specified in the `index.js` app in line 4:
 ```
  var language = require('<language package name>');
  //replace <language package name> with the "name" from the language package's package.json file
  ```
Please run `npm install` in the Library directory afterwards.
The default language package is german.
