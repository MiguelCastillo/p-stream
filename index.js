var chunkTypes = {
  "string": 1,
  "object": 2
};


/**
 * Takes in a readable stream and returns a promise. The promise is resolved
 * when all the data is read. Or reject if the stream has errors.
 *
 * @param {Stream} stream - Stream to read from to resolve the promise with.
 *
 * @returns {Promise}
 */
function readableStream(stream) {
  return new Promise(function(resolve, reject) {
    var chunks = {
      data: []
    };

    function onData(chunk) {
      if (!chunks.type) {
        chunks.type = chunkTypes[typeof chunk];
      }

      chunks.data.push(chunk);
    }

    function onEnd() {
      if (chunks.type === chunkTypes.object) {
        resolve(Buffer.concat(chunks.data));
      }
      else {
        resolve(chunks.data.join(""));
      }
    }

    function onError(error) {
      reject(error);
    }

    stream
      .on("error", onError)
      .on("data", onData)
      .on("end", onEnd);
  });
}


/**
 * Takes a stream and returns a promise that is resolved when the stream
 * emitting data. Or rejected when the stream has an error.
 *
 * @param {Stream} stream - Stream to process
 *
 * @returns {Promise} Promise that is resolved when stream has no more
 *  data or rejected if the stream has errors.
 */
function pstream(stream) {
  if (stream.readable) {
    return readableStream(stream);
  }
  else {
    return Promise.resolve();
  }
}


module.exports = pstream;
