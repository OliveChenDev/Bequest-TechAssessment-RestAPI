You can use this command to run this test project.

npm start

- create

http://localhost:5000/api/v1/data/create

The input values could be like this:

key: key1
value: value1

- update

http://localhost:5000/api/v1/data/update

The input values could be like this:

key: key1
value: value2

- delete

https://localhost:5000/api/v1/data/delete

The input values could be like this:

key: key1

- get

http://localhost:5000/api/v1/data/get

If you provide a key, the api will return the latest answer by key.

key: key1

- getEvent

http://localhost:5000/api/v1/data/getEvent

If you provide a key, the api will return all create/update/delete events by the key.