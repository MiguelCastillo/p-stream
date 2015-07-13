# p-stream

> Readable stream to Promise

Create Promises that resolve when a `readable` stream is finished streaming data. Or rejected when the stream reports an error.

> Promise must be polyfilled.

### Examples

``` javascript
var fs = require("fs");
var pstream = require("p-stream");

function readFile(filePath) {
  return fs
    .createReadStream(filePath)
    .setEncoding("utf8");
}

pstream(readFile("somefile.log")).then(function(text) {
  console.log("File read", text);
});
```

> p-stream can handle strings and buffers.

TIP: Make sure to set the encoding on the stream to properly handle utf8 strings. Please refer to [setEncoding ](https://nodejs.org/api/stream.html#stream_readable_setencoding_encoding) for more details.
