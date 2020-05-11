const fs = require('fs');
const templatestring = require('templatestring');
const Client = require('pg-native');
const fileReader = require('../tools/fileReader')('./build/queries/');

const schemas = fs.readdirSync('./build/schemas');
const foreignKeySchemas = fs.readdirSync('./build/foreign_keys');
const client = new Client();

client.connectSync('postgresql://postgres:chaos123@localhost:5432');
const queryArray = [];

function createTables(blueprint) {
  blueprint.forEach((schema) => {
    const tableName = schema.replace('.js', '');
    const fileContents = require(`./schemas/${schema}`);
    const queryContents = [];
    const columnNames = Object.keys(fileContents);

    // puts columns data types into array
    columnNames.forEach((column) => {
      queryContents.push(`${column} ${fileContents[column]}`);
    });


    const joinedQueryContents = queryContents.join(',\n');
    const parsedQuery = templatestring(fileReader.create_table, { tableName, joinedQueryContents });
    queryArray.push(parsedQuery);
  });
}

function addForeignKey(blueprint) {
  blueprint.forEach((foreignKeySchema) => {
    const tableName = foreignKeySchema.replace('.js', '');
    const fileContents = require(`./foreign_keys/${foreignKeySchema}`);
    const columnNames = Object.keys(fileContents);
    columnNames.forEach((column) => {
      // columns that i want foreign keys on
      const referencedColumns = `${fileContents[column]}`;
      const fkName = `fk_${column}`;
      const parsedQuery = templatestring(
        fileReader.add_foreign_key,
        {
          tableName,
          fkName,
          column,
          referencedColumns,
        },
      );
      queryArray.push(parsedQuery);
    });
  });
}

function columnCheck(blueprint) {
  blueprint.forEach((schema) => {
    const tableName = schema.replace('.js', '');
    const fileContents = require(`./schemas/${schema}`);
    const columnNames = Object.keys(fileContents);
    columnNames.forEach((column) => {
      const dataType = `${fileContents[column]}`;
      const parsedQuery = templatestring(fileReader.column_check, {
        tableName,
        column,
        dataType,
      });
      queryArray.push(parsedQuery);
    });
  });
}

function insertSeedData(blueprint) {
  blueprint.forEach((schema) => {
    const tableName = schema.replace('.js', '');
    const seedInfo = require(`./seedData/${schema}`);
    const dataKeys = Object.keys(seedInfo);
    const seedDataObj = [];

    dataKeys.forEach((key) => {
      seedDataObj.push(seedInfo[key]);
    });

    seedDataObj.forEach((obj) => {
      const keys = Object.keys(obj);
      const values = Object.values(obj);

      // structures columns and seed data for insert query
      const seedData = values.map((value) => {
        if (typeof value === 'string') {
          const modedIndex = `'${value}'`;
          return modedIndex;
        }
        return value;
      });

      const columns = `(${keys.join()})`;
      const data = `(${seedData.join()})`;
      const parsedQuery = templatestring(fileReader.insert_seed_data, {
        tableName,
        columns,
        data,
      });
      queryArray.push(parsedQuery);
    });
  });
}

function runQueries(arr) {
  arr.forEach((query) => {
    client.querySync(query);
    console.log('query successful');
  });
}

function main(blueprint, foreignKeyBlueprint, arr) {
  createTables(blueprint);
  columnCheck(blueprint);
  insertSeedData(blueprint);
  addForeignKey(foreignKeyBlueprint);
  runQueries(arr);
}

main(schemas, foreignKeySchemas, queryArray);
