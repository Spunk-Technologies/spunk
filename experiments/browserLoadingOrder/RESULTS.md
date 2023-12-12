## Results

- script & link tags are downloaded in parallel
- script & link tags are evaluated sequencially
  - except if script tag has defer attribute
    - in this case, script tag gets added to a queue
    - that queue gets evaluated asynchronously and sequencially as soon as first script is ready
    - this is similar to s1 = Promise(downloadS1); s2 = Promise(downloadS2); s1.then(runS1).then(s2).then(runS2)...
- load event seems to be when \</html> is reached during evaluation
- defer and async have similar results when used as attributes on a script tag
  - the main difference is async does not guarauntee that scripts will be executed in order like defer does
- The defer attribute has no effect on module scripts — they defer by default.
