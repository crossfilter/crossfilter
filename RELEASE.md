# Release creation instructions

Currently this is a manual process.

 1. Increment package.json version
 2. `npm run-script test`
 3. `npm run-script clean`
 4. `npm run-script build`
 5. `git commit -am "*.*.* Release Prep"`
 6. `git tag -am "*.*.* Release" *.*.*`
 7. `git push`
 8. `git push origin *.*.*`
 9. `npm publish`
 10. Update release notes on Github
