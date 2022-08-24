# Release creation instructions

Currently this is a manual process.

0.  Are there changes to the public API? Have they been documented in [the wiki](https://github.com/crossfilter/crossfilter/wiki/API-Reference)?
1.  Increment package.json version
2.  `npm test`
3.  `npm run lint`
4.  `npm run clean`
5.  `npm run build`
6.  `git commit -am "*.*.* Release Prep"`
7.  `git tag -am "*.*.* Release" *.*.*`
8.  `git push`
9.  `git push origin *.*.*`
10. `npm publish`
11. Update release notes on Github
