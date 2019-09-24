import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

fetch(`http://localhost:8080/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({ descriptions: false }),
  }),
})
  .then((result: any) => result.json())
  .then((result: any) => {
    const { data: schemaJson } = result;
    const sdl = printSchema(buildClientSchema(schemaJson));
    writeFileSync('./schema.graphql', sdl);
    // Write schema.graphql in the SDL format

    // Write filteredSchema.json, a reduced schema for runtime usage
    // See https://www.apollographql.com/docs/react/advanced/fragments.html
    const types = schemaJson.__schema.types.map(
      (type: {
        name: string;
        kind: string;
        possibleTypes: [{ name: string }];
      }) => {
        const { name, kind } = type;
        const possibleTypes = type.possibleTypes
          ? type.possibleTypes.map(t => ({
              name: t.name,
            }))
          : null;
        return { name, kind, possibleTypes };
      },
    );

    writeFileSync(
      './filteredSchema.generated.json',
      JSON.stringify({
        __schema: {
          types,
        },
      }),
    );
  })
  .catch(console.error);
