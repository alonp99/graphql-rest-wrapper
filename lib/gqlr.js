'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schemaGenerator = require('./schemaGenerator');

var _schemaGenerator2 = _interopRequireDefault(_schemaGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  GraphQL rest wrapper takes all express-graphql options and some additional options.
 *
 *  Options object:
 *
 *  - express-graphql: (Main ones)
 *  schema: GraphQLSchema    -> You can specify a schema or let gqlRestWrapper to generate one
 *  graphiql: Boolean        -> Render GraphQL query client
 *
 *  - gqlRestWrapper:
 *  name: String            -> Will name the main query, and file if asked for
 *  generateSchema: Boolean -> Generate schema from the API response
 *  saveSchema: Boolean     -> Save the generated schema to a javascript file
 *
 */
var _RestWrapper = function () {
    function _RestWrapper(endpoint) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, _RestWrapper);

        this.endpoint = endpoint;
        this.options = Object.assign({}, opts);

        this.options.schema = opts.schema && !opts.generateSchema ? opts.schema : this._generateSchema();
        this.options.name = opts.name || 'RestWrapper';
        this.options.saveSchema = opts.saveSchema || false;
        this.options.outputPath = opts.outputPath || './';
    }

    _createClass(_RestWrapper, [{
        key: '_generateSchema',
        value: function _generateSchema() {
            return (0, _schemaGenerator2.default)(this.endpoint, { saveToFile: this.options.saveSchema, name: this.options.name });
        }
    }, {
        key: 'expressMiddleware',
        value: function expressMiddleware() {
            var _this = this;

            var gqlOpts = {
                schema: undefined,
                context: undefined,
                rootValue: undefined,
                pretty: undefined,
                graphiql: undefined,
                formatErrorFn: undefined,
                showGraphiQL: undefined,
                query: undefined,
                variables: undefined,
                operationName: undefined,
                validationRules: undefined
            };
            for (var key in gqlOpts) {
                if (this.options[key]) {
                    gqlOpts[key] = this.options[key];
                }
            }

            var p = new Promise(function (resolve) {
                Promise.resolve(_this.options.schema).then(function (generatedSchema) {
                    gqlOpts.schema = generatedSchema;
                    resolve(gqlOpts);
                });
            });

            return (0, _expressGraphql2.default)(p);
        }
    }]);

    return _RestWrapper;
}();

exports.default = _RestWrapper;