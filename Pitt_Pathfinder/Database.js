import Realm from 'realm';

class NodeSchema extends Realm.Object {}
NodeSchema.schema = {
    name: 'Node',
    properties: {
        id: 'int',
        lon: 'double',
        lat: 'double'
    }
};

class EdgeSchema extends Realm.Object {}
EdgeSchema.schema = {
    name: 'Edge',
    properties: {
        source: 'int',
        destination: 'int',
        distance: 'double',
        oneway: 'bool'
    }
};

let realm = new Realm({ schema: [NodeSchema, EdgeSchema], schemaVersion: 1});
export default realm;