"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fs_1 = require("fs");
const node_fetch_1 = require("node-fetch");
node_fetch_1.default(`http://localhost:8000/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        variables: {},
        query: graphql_1.getIntrospectionQuery({ descriptions: false }),
    }),
})
    .then((result) => result.json())
    .then((result) => {
    const { data: schemaJson } = result;
    console.log({ schemaJson });
    const sdl = graphql_1.printSchema(graphql_1.buildClientSchema(schemaJson));
    fs_1.writeFileSync('./schema.graphql', sdl);
    // Write schema.graphql in the SDL format
    // Write filteredSchema.json, a reduced schema for runtime usage
    // See https://www.apollographql.com/docs/react/advanced/fragments.html
    const types = schemaJson.__schema.types.map((type) => {
        const { name, kind } = type;
        const possibleTypes = type.possibleTypes
            ? type.possibleTypes.map(t => ({
                name: t.name,
            }))
            : null;
        return { name, kind, possibleTypes };
    });
    fs_1.writeFileSync('./filteredSchema.generated.json', JSON.stringify({
        __schema: {
            types,
        },
    }));
})
    .catch(console.error);
//# sourceMappingURL=downloadSchema.js.map