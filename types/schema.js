const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')

// https://www.graphql-tools.com/docs/schema-merging
const typesArray = loadFilesSync(path.join(__dirname, '.'), { extensions: ['graphql'] })
const typeDefs = mergeTypeDefs(typesArray)

// TODO add pre-commit script to update schema.graphql
// const { print } = require('graphql')
// const fs = require('fs')
// const printedTypeDefs = print(typeDefs)
// fs.writeFileSync('schema.graphql', printedTypeDefs)

module.exports = typeDefs