import generateSchema from './maker'
import fetch from 'node-fetch'
import fs from 'fs'
import requireFromString from 'require-from-string'

const {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql')

async function createSchema(endpoint, opts = {}) {
    if (!endpoint)
        throw new Error('Endpoint is not specified.')

    // const _dest = () => {
    //     const mark = endpoint.lastIndexOf('/');
    //     const name = endpoint.substring(mark - endpoint.length < 10 ? mark + 1 : 9, endpoint.length) + '.js';
    //     outputPath = opts.outputPath ? opts.outputPath + '/' + name : name;
    //     return true;
    // }
    const _getName = () => {
        const mark = endpoint.lastIndexOf('/');
        const name = endpoint.substring(mark - endpoint.length < 10 ? mark + 1 : 9, endpoint.length);
        return name;
    }
    const saveToFile = opts.saveToFile || false;
    const name = opts.name || _getName();
    const request = fetch(endpoint)
        .then((res) => {
            return res.json();
        })
        .catch((rej) => {
            throw new Error(`xhr error. ${rej}`)
        })
        .then(json => json);

    const json = await request;
    const schemaSource = opts.wrapMode ? opts.providedSchema : generateSchema(json);
    if (saveToFile && !opts.wrapMode) {
        const filename = name + '.js';
        fs.writeFile(filename, schemaSource, (msg) => console.log(`Done writing ${filename} ...`))
    }
    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: ()=> {
                let obj = {};
                obj[name] = {
                    type: opts.wrapMode ? schemaSource : requireFromString(schemaSource),
                    resolve (root, params, options) {
                        return request;
                    }
                }
                return obj;
            }
        })
    })

    return schema;
}

export default createSchema;