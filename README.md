# node-config
**Loads a config based on environment variables config and node_env.**

#Config

**Directory structure**
```
foo
+-- conf
|   `-- default.json
`-- package.json
```
**default.json**
```
{
  "person" : {
    "name" : "Bruce",
    "age"  : 122,
  }
}
```
#Usage

```
var config = require('config');
var age = config.get('person.age');
```
