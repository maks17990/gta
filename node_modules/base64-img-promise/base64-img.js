var fs = require('file-system');
var path = require('path');
var request = require('ajax-request');

function base64(filename, data) {
  var extname = path.extname(filename).substr(1);
  extname = extname || 'png';

  return 'data:image/' + extname + ';base64,' + data.toString('base64');
}

function img(data) {
  var reg = /^data:image\/(\w+);base64,([\s\S]+)/;
  var match = data.match(reg);
  var baseType = {
    jpeg: 'jpg'
  };

  if (!match) {
    throw new Error('image base64 data error');
  }

  var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: '.' + extname,
    base64: match[2]
  };
}

function base64Promise(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, function (err, data) {
      if (err) reject(err);

      resolve(base64(filename, data));
    });
  });
};

function requestBase64Promise(url) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      isBuffer: true
    }, function (err, res, body) {
      if (err) return reject(err);

      var data = 'data:' + res.headers['content-type'] + ';base64,' + body.toString('base64');
      resolve({ res, data });
    });
  });
};

function imgPromise(data, destpath, name) {
  return new Promise((resolve, reject) => {
    var result = img(data);
    var filepath = path.join(destpath, name + result.extname);

    fs.writeFile(filepath, result.base64, { encoding: 'base64' }, function (err) {
      if (err) return reject(err);
      resolve(filepath);
    });
  });
};

/**
 * @description
 * Get image file base64 data
 * @example
 * base64Img.base64('path/demo.png', function(err, data) {})
 * @example
 * base64Img.base64('path/demo.png').then(function(data) {
 * 
 * });
 */
exports.base64 = function (filename, callback) {
  if (!callback) return base64Promise(filename);

  fs.readFile(filename, function (err, data) {
    if (err) return callback(err);

    callback(null, base64(filename, data));
  });
};

/**
 * @description
 * The api same as base64, but it's synchronous
 * @example
 * var data = base64Img.base64Sync('path/demo.png');
 */
exports.base64Sync = function (filename) {
  var data = fs.readFileSync(filename);

  return base64(filename, data);
};

/**
 * @description
 * Get base64 from url
 * @example
 * request.base64(
 *   'http://webresource.c-ctrip.com/ResCRMOnline/R5/html5/images/57.png', 
 *   function(err, res, body) {
 * 
 *   }
 * );
 * @example
 * request.base64(
 *   'http://webresource.c-ctrip.com/ResCRMOnline/R5/html5/images/57.png',
 * ).then(function({res, data}) {
 * 
 * });
 */
exports.requestBase64 = function (url, callback) {
  if (!callback) return requestBase64Promise(url);

  request({
    url: url,
    isBuffer: true
  }, function (err, res, body) {
    if (err) return callback(err);

    var data = 'data:' + res.headers['content-type'] + ';base64,' + body.toString('base64');
    callback(err, res, data);
  });
};

/**
 * @description
 * Convert image base64 data to img
 * @example
 * base64Img.img('data:image/png;base64,...', 'dest', '1', function(err, filepath) {});
 * @example
 * base64Img.img('data:image/png;base64,...', 'dest', '1').then(function(filepath) {});
 */
exports.img = function (data, destpath, name, callback) {
  if (!callback) return imgPromise(data, destpath, name);

  var result = img(data);
  var filepath = path.join(destpath, name + result.extname);

  fs.writeFile(filepath, result.base64, { encoding: 'base64' }, function (err) {
    callback(err, filepath);
  });
};

/**
 * @description
 * The api same as img, but it's synchronous
 * @example
 * var filepath = base64Img.imgSync('data:image/png;base64,...', 'dest', '1');
 */
exports.imgSync = function (data, destpath, name) {
  var result = img(data);
  var filepath = path.join(destpath, name + result.extname);

  fs.writeFileSync(filepath, result.base64, { encoding: 'base64' });
  return filepath;
};