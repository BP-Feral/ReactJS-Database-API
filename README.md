### Endpoints
>` https://api-user-forms.herokuapp.com/v1/users/`

>` https://api-user-forms.herokuapp.com/v1/users/<id>`
---
### Methods 

`POST https://api-user-forms.herokuapp.com/v1/users/`
> ###### takes a user object and insert it into the database
> ###### this is the structure of the json object
```json
//json request
{
  "name": " enter name here ",           // required - string
  "password": " enter password here ",   // required - string
  "email": " email@example.com ",        // required - string
  "address": " enter address here ",     // required - string
  "fiscal_code": " defaults to 0 "       // optional - number
}
```
---
`GET https://api-user-forms.herokuapp.com/v1/users/`
> ###### returns a complete list of all users objects from the database
 - empty list example:  
 ```json
// json response
[]
 ```

 - users in list example:
```json
//json response
[
	{
		"_id": "6404692ed2cc374748b0fb23",
		"name": "Stefan",
		"password": "mypass12",
		"email": "stefan@yahoo.com",
		"address": "personal address",
		"fiscal_code": 0,
		"__v": 0
	},
	{
		"_id": "64046940d2cc374748b0fb27",
		"name": "Mihai",
		"password": "cookie",
		"email": "mihai@yahoo.com",
		"address": "personal address 2",
		"fiscal_code": 0,
		"__v": 0
	},
	{
		"_id": "64046952d2cc374748b0fb29",
		"name": "Andreea",
		"password": "flower pot",
		"email": "andreea@gmail.com",
		"address": "personal address 3",
		"fiscal_code": 0,
		"__v": 0
	}
]
```
---
`GET https://api-user-forms.herokuapp.com/v1/users/<id>`
> ###### replace `<id>` with the user id and it will return all of the user's data

- example `GET https://api-user-forms.herokuapp.com/v1/users/64046952d2cc374748b0fb29` returns:

```json
//json response
{
    "_id": "64046952d2cc374748b0fb29",
    "name": "Andreea",
    "password": "flower pot",
    "email": "andreea@gmail.com",
    "address": "personal address 3",
    "fiscal_code": 0,
    "__v": 0
}
```
---
`PATCH https://api-user-forms.herokuapp.com/v1/users/<id>`
> ##### update a user's data, you only need to type the fields you want to update
- example `PATCH https://api-user-forms.herokuapp.com/v1/users/64046952d2cc374748b0fb29`:
```json
//json request
{
    "password": "new flower pot",
    "email": "newmail@gmail.com"
}
```
> ##### This will change the password and email with the new fields

`GET https://api-user-forms.herokuapp.com/v1/users/64046952d2cc374748b0fb29`:
```json
//json response
{
    "_id": "64046952d2cc374748b0fb29",
    "name": "Andreea",
    "password": "new flower pot",      // changed
    "email": "newmail@gmail.com",      // changed
    "address": "personal address 3",
    "fiscal_code": 0,
    "__v": 0
}
```
---
`DELETE https://api-user-forms.herokuapp.com/v1/users/<id>`

> ##### remove a user completely from database

- example `DELETE https://api-user-forms.herokuapp.com/v1/users/64046940d2cc374748b0fb27`:
> ##### this will remove the user with id `64046940d2cc374748b0fb27` in our case Mihai
`GET https://api-user-forms.herokuapp.com/v1/users/` will return this now:
```json
//json response
[
	{
		"_id": "6404692ed2cc374748b0fb23",
		"name": "Stefan",
		"password": "mypass12",
		"email": "stefan@yahoo.com",
		"address": "personal address",
		"fiscal_code": 0,
		"__v": 0
	},        // Second user Mihai was removed
	{
		"_id": "64046952d2cc374748b0fb29",
		"name": "Andreea",
		"password": "flower pot",
		"email": "andreea@gmail.com",
		"address": "personal address 3",
		"fiscal_code": 0,
		"__v": 0
	}
]
```
