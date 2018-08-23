#!/usr/bin/env node

/*
 * This file is part of the PunktDe.Neos.Hyphenation package.
 *
 * This package is open source software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

var program = require('commander');
var hyphenation = require('hypher');
var language = require('hyphenation.de');


program
    .arguments('<text> [minpad]')
    .action(function(text, minpad) {
        minpad = parseInt(minpad, 10);
        language.leftmin = minpad;
        language.rightmin = minpad;
        let hyphenationAgent = new hyphenation(language);
        console.log(hyphenationAgent.hyphenateText(text));
    })
    .parse(process.argv);

