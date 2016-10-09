'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var createSchema = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(endpoint) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _getName, saveToFile, name, request, json, schemaSource, schema;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (endpoint) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error('Endpoint is not specified.');

                    case 2:

                        // const _dest = () => {
                        //     const mark = endpoint.lastIndexOf('/');
                        //     const name = endpoint.substring(mark - endpoint.length < 10 ? mark + 1 : 9, endpoint.length) + '.js';
                        //     outputPath = opts.outputPath ? opts.outputPath + '/' + name : name;
                        //     return true;
                        // }
                        _getName = function _getName() {
                            var mark = endpoint.lastIndexOf('/');
                            var name = endpoint.substring(mark - endpoint.length < 10 ? mark + 1 : 9, endpoint.length);
                            return name;
                        };

                        saveToFile = opts.saveToFile || false;
                        name = opts.name || _getName();
                        request = (0, _nodeFetch2.default)(endpoint).then(function (res) {
                            return res.json();
                        }).catch(function (rej) {
                            throw new Error('xhr error. ' + rej);
                        }).then(function (json) {
                            return json;
                        });
                        _context.next = 8;
                        return request;

                    case 8:
                        json = _context.sent;
                        schemaSource = opts.wrapMode ? opts.providedSchema : (0, _maker2.default)(json);

                        if (saveToFile && !opts.wrapMode) {
                            (function () {
                                var filename = name + '.js';
                                _fs2.default.writeFile(filename, schemaSource, function (msg) {
                                    return console.log('Done writing ' + filename + ' ...');
                                });
                            })();
                        }
                        schema = new GraphQLSchema({
                            query: new GraphQLObjectType({
                                name: 'Query',
                                fields: function fields() {
                                    var obj = {};
                                    obj[name] = {
                                        type: opts.wrapMode ? schemaSource : (0, _requireFromString2.default)(schemaSource),
                                        resolve: function resolve(root, params, options) {
                                            return request;
                                        }
                                    };
                                    return obj;
                                }
                            })
                        });
                        return _context.abrupt('return', schema);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function createSchema(_x2) {
        return _ref.apply(this, arguments);
    };
}();

var _maker = require('./maker');

var _maker2 = _interopRequireDefault(_maker);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _requireFromString = require('require-from-string');

var _requireFromString2 = _interopRequireDefault(_requireFromString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('graphql');

var GraphQLObjectType = _require.GraphQLObjectType;
var GraphQLSchema = _require.GraphQLSchema;
exports.default = createSchema;