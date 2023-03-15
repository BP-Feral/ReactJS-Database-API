### Endpoints
>` https://api-user-forms.herokuapp.com/v1/users/`

>` https://api-user-forms.herokuapp.com/v1/users/<id>`

>` https://api-user-forms.herokuapp.com/v1/forms/`

>` https://api-user-forms.herokuapp.com/v1/forms/<id>`
---
### User Methods 

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

---
### Forms Methods 

`POST https://api-user-forms.herokuapp.com/v1/forms/`
> ###### takes a form object and insert it into the database
> ###### this is the structure of the json object
```json
//json request
{
  "title": " enter title here ",                         // required - string
  "retention_date": " enter retention date here ",       // required - date
  "dynamic_fields": [           // LIST
	{
		"dynamic_field_name": " enter field name here ", // required - string
		"label": " enter label name here ",              // required - string
            "placeholder": " enter placeholder here ",   // required - string
            "mandatory": true,                           // required - boolean
            "keywords": [       // LIST
							" enter key here "           // required - string
						],
            "field_type": {
                "name": " enter name here ",             // required - string
                "options": [    // LIST
					" enter option name here "           // required - string
				]
			}
        }
    ]
}
```
---
`GET https://api-user-forms.herokuapp.com/v1/forms/`
> ###### returns a complete list of all forms objects from the database
 - empty list example:  
 ```json
// json response
[]
 ```

 - forms in list example:
```json
//json response
[
	{ // form start
		"_id": "6411da8bcfe3dbcddf3c8b20",
		"title": "Test Form",
		"retention_date": "2023-03-10T00:00:00.000Z",
		"dynamic_fields": [
			{
				"dynamic_field_name": "First Field",
				"label": "Label",
				"placeholder": "Placeholder",
				"mandatory": true,
				"keywords": [
					"Key 1",
					"Key 2",
					"Key 3"
				],
				"field_type": [
					{
						"_id": "6411dfec11625e1776b1bb88",
						"name": "Field Type name",
						"options": [
							"Option 1",
							"Option 2"
						]
					}
				],
				"_id": "6411da8bcfe3dbcddf3c8b21"
			}
		],
		"__v": 0
	} // form end
 // , { NEXT FORM }, { NEXT FORM }
]
```
---
`GET https://api-user-forms.herokuapp.com/v1/forms/<id>`
> ###### replace `<id>` with the form id and it will return all of the form's data

- example `GET https://api-user-forms.herokuapp.com/v1/forms/6411da8bcfe3dbcddf3c8b20` returns:

```json
//json response
{
	"_id": "6411da8bcfe3dbcddf3c8b20",
	"title": "Formular de test",
	"retention_date": "2023-03-10T00:00:00.000Z",
	"dynamic_fields": [
		{
			"dynamic_field_name": "Primul Camp",
			"label": "Eticheta Camp",
			"placeholder": "Introdu date",
			"mandatory": true,
			"keywords": [
				"cheie 1",
				"cheie 2",
				"cheie 3"
			],
			"field_type": [
				{
					"_id": "6411e0de11625e1776b1bb8b",
					"name": "nume tip camp",
					"options": [
						"nume optiune 1",
						"nume optiune 2"
					]
				}
			],
			"_id": "6411da8bcfe3dbcddf3c8b21"
		}
	],
	"__v": 0
}
```
---
`PATCH https://api-user-forms.herokuapp.com/v1/forms/<id>`
> ##### update a forms's data, you only need to type the fields you want to update
- example `PATCH https://api-user-forms.herokuapp.com/v1/forms/6411da8bcfe3dbcddf3c8b20`:
```json
//json request
{
    "title": "new form title"
}
```
> ##### This will change the title with the new one

`GET https://api-user-forms.herokuapp.com/v1/users/6411da8bcfe3dbcddf3c8b20`:
```json
//json response
{
	"_id": "6411da8bcfe3dbcddf3c8b20",
	"title": "new form title",
	"retention_date": "2023-03-10T00:00:00.000Z",
	"dynamic_fields": [
		{
			"dynamic_field_name": "Primul Camp",
			"label": "Eticheta Camp",
			"placeholder": "Introdu date",
			"mandatory": true,
			"keywords": [
				"cheie 1",
				"cheie 2",
				"cheie 3"
			],
			"field_type": [
				{
					"_id": "6411e0de11625e1776b1bb8b",
					"name": "nume tip camp",
					"options": [
						"nume optiune 1",
						"nume optiune 2"
					]
				}
			],
			"_id": "6411da8bcfe3dbcddf3c8b21"
		}
	],
	"__v": 0
}
```
---
`DELETE https://api-user-forms.herokuapp.com/v1/forms/<id>`

> ##### remove a form completely from database

- example `DELETE https://api-user-forms.herokuapp.com/v1/forms/6411da8bcfe3dbcddf3c8b20`:
> ##### this will remove the form with id `6411da8bcfe3dbcddf3c8b20`