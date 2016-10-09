import graphqlHTTP from 'express-graphql';
import schemaGenerator from './schemaGenerator';

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
class _RestWrapper {
    constructor(endpoint, opts = {}) {
        this.endpoint = endpoint;
        this.options = Object.assign({}, opts)

        this.options.schema = (opts.schema && !opts.generateSchema) ? this._wrapSchema(opts.schema) : this._generateSchema();
        this.options.name = opts.name || 'RestWrapper';
        this.options.saveSchema = opts.saveSchema || false;
        this.options.outputPath = opts.outputPath || './';

    }

    _generateSchema() {
        return schemaGenerator(this.endpoint, {saveToFile: this.options.saveSchema, name: this.options.name});
    }

    _wrapSchema(schema) {
        return schemaGenerator(this.endpoint, {saveToFile: this.options.saveSchema, name: this.options.name, wrapMode: true, providedSchema: schema});
    }

    expressMiddleware() {
        let gqlOpts = {
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
        }
        for (let key in gqlOpts) {
            if (this.options[key]) {
                gqlOpts[key] = this.options[key];
            }
        }

        let p = new Promise((resolve)=> {
            Promise.resolve(this.options.schema).then((generatedSchema)=> {
                gqlOpts.schema = generatedSchema;
                resolve(gqlOpts)
            })
        })

        return graphqlHTTP(p);
    }

}

export default _RestWrapper;



