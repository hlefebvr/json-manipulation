# json-manipulation

Small module which enables to manipulate json structures. 

What you can do :

- Remove json attributes (including nested ones)
- Remove inside array attributes in every row (i.e. : [{col1: 0.1, col2: 0.3},{col1: 0.5, col2: 0.9}] -> [{col1: 0.1},{col1: 0.5}])

What you cannot (yet) do : 

- Remove inside array attributes in specific row