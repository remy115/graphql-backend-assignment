# NodeJS/GraphQL Backend test for *Undisclosed Company*

## Author: Remy Barros

## Installation

```bash
yarn
```

## Usage

```bash
yarn start
```

Make GraphQL queries to "/graphql": (listen or port 4000)

```bash
query getPropertiesQuery($getPropertiesCity: String) {
  getProperties(city: $getPropertiesCity) {
    msg,
    type
    data {
      address {
        city,
        state
      }
      property {
        bathrooms,
        yearBuilt
      }
    }
  }
}

# with variables
{
  "getPropertiesCity": "houston"
}
```

** dont forget to pass *Authorization* HTTP header with the string:  **

```bash

dXNlcjFAc2lkZWluYy5jb206Njc2Y2ZkMzQtZTcwNi00Y2NlLTg3Y2EtOTdmOTQ3YzQzYmQ0
# which is base64 of user1@sideinc.com:676cfd34-e706-4cce-87ca-97f947c43bd4
```

## Test

```bash
yarn test
```



### Design aspects

- Schema types separated by ".graphql" files;
- "context" with request ID, to keep track of possible errors, event like implementations *("Pub/Sub")*, etc;
- Query structured response with *message* and *type of message* passed along with the actual data (to report errors, possibles warnings, etc);


### Improvements

- modular structure according to: [Node Best Practices - Project structure](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md)
- error logging/monitoring tool;
- env vars;