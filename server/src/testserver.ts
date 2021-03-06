// Swagger Backend Mock-Server
const swagger = require('swagger-server');
const Server = swagger.Server;
const Resource = swagger.Resource;


const port = process.env.PORT || 5000;

// Create a Swagger Server from the swagger.yaml file
const server = new Server();
server.parse('./api/swagger/swagger.yaml');

// Mockdaten für api /users laden
server.dataStore.save(
  new Resource('/api/users/Lassie', {name: 'Lassie', email: 'lassie@gmail', password: 'white'}),
  new Resource('/api/users/Clifford', {name: 'Clifford', email: 'BigC@gmail.com', password: 'red'}),
  new Resource('/api/users/Garfield', {name: 'Garfield', email: 'garfield@gmail.com', password: 'orange'}),
  new Resource('/api/users/Snoopy', {name: 'Snoopy', email: 'Snoopy@gmail.com', password: 'black'}),
  new Resource('/api/users/Hello%20Kitty', {name: 'Hello Kitty', email: 'cat@gmail.com', password: 'white'})
);

// Mockdaten für api/patients laden
server.dataStore.save(
  new Resource('/api/patients/I1',
    {
      _id: 'I1',
      name: 'Strolch',
      tierart: 'Hund',
      rasse: 'Mischling',
      diagnose: 'Bisswunde',
      eigentuemerVorname: 'Hans',
      eigentuemerNachname: 'Iten'
    }),
  new Resource('/api/patients/I2',
    {
      _id: 'I2',
      name: 'Minka',
      tierart: 'Katze',
      rasse: 'Siam',
      diagnose: 'Vergiftung',
      eigentuemerVorname: 'Maria',
      eigentuemerNachname: 'Rogenmoser'
    }),
  new Resource('/api/patients/I3',
    {
      _id: 'I3',
      name: 'Blacky',
      tierart: 'Pferd',
      rasse: 'Freiberger',
      diagnose: 'Stauchung',
      eigentuemerVorname: 'Peter',
      eigentuemerNachname: 'Jura'
    })
);

// Mockdaten für api/journals laden

server.dataStore.save(
  new Resource('/api/journals/I1',
    {
      patient_id: 'I1', name: 'Journal Strolch',
      diagnose: 'Bisswunde', startdatum: '01.11.2016', enddatum: '10.11.2016'
    }),
  new Resource('/api/journals/I2',
    {
      patient_id: 'I2', name: 'Journal Minka',
      diagnose: 'Bisswunde', startdatum: '01.11.2016', enddatum: '10.11.2016'
    }),
  new Resource('/api/journals/I3',
    {
      patient_id: 'I3', name: 'Journal Blacky', tierart: 'Pferd',
      rasse: 'Freiberger', diagnose: 'Stauchung', startdatum: '10.11.2016', enddatum: '16.11.2016'
    })
);

server.listen(port, () => {
  console.log('The Swagger Server is know running at  http://127.0.0.1:' + port);
});

