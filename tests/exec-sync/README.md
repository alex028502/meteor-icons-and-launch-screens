just to clarify how this method works even though it's not mine
since I keep forgetting if the output goes straight to the console or gets returned

can run both the tests in the file, and check the output of the file like this:

```
#the following would be great but only works in bash:
diff <(node tests/exec-sync/echo-test.js) <(echo only output) #thanks http://stackoverflow.com/a/345526/5203563

#so doing it like this:
node tests/exec-sync/echo-test.js | node tests/exec-sync/fail-on-output.js
```

This will show that the output of execSync is returned my the method, and not passed through.
