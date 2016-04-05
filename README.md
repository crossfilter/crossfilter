# Crossfilter

[![Join the chat at https://gitter.im/crossfilter/crossfilter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/crossfilter/crossfilter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Test status via Travis CI](https://travis-ci.org/crossfilter/crossfilter.svg?branch=master)](https://travis-ci.org/crossfilter/crossfilter)

**Crossfilter** is a JavaScript library for exploring large multivariate datasets in the browser. Crossfilter supports extremely fast (<30ms) interaction with coordinated views, even with datasets containing a million or more records.

Since most interactions only involve a single dimension, and then only small adjustments are made to the filter values, incremental filtering and reducing is significantly faster than starting from scratch. Crossfilter uses sorted indexes (and a few bit-twiddling hacks) to make this possible, dramatically increasing the perfor­mance of live histograms and top-K lists. Crossfilter is available under the [Apache License](/square/crossfilter/blob/master/LICENSE).

Want to learn more? [See the wiki.](https://github.com/crossfilter/crossfilter/wiki)

## Gallery of Community Examples

* [Configurable Chart Collection (C3) - World Bank Example](http://drarmstr.github.io/c3/examples/#worldbank) - ([Source](http://drarmstr.github.io/c3/examples/#worldbank/source), [HTML](http://drarmstr.github.io/c3/examples/#worldbank/html))
* [Dimensional Charting JavaScript Library (dc.js)](https://dc-js.github.io/dc.js/) - ([Source](https://dc-js.github.io/dc.js/docs/stock.html))
