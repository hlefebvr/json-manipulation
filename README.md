# json-omit


Small module which enables to manipulate json structures. 

## What you can do :

- Remove json attributes (including nested ones)
- Remove inside array attributes in every element

## Examples

- Removing nested attribute
```node
const json = {
    firstname: 'John',
    lastname: 'Doe',
    address: {
        country: 'FR',
        postalCode: 60200,
    },
};

const changed = omit(json, ['address.postalCode']);

/*
Will give : 
{
    firstname: 'John',
    lastname: 'Doe',
    address: {
        country: 'FR',
    }
}
*/
```
- Remove inside array attributes in every element
```node
const json = {
    people: [
        { name: 'John', age: 24 },
        { name: 'Doe', age: 27 },
    ],
};

const changed = omit(json, [people.age]);
/*
Will give :
{
    people: [
        { name: 'John' },
        { name: 'Doe'  },
    ],
}
*/
```

## What you cannot (yet) do : 

- Remove inside array attributes in specific row (ex: people.1.age)

# Running test

Run ``` npm test ```