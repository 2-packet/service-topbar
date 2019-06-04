## RESTful API Docs
> Table of Contents

1. [POST](#POST)
1. [GET](#GET)
1. [PUT](#PUT)
1. [DELETE](#DELETE)

---

## POST

Endpoint: `http://ip:port/restaurant`

This endpoint accepts an [object](#DATA) and responds with 201 success code.

>SERVER CODE:
```
app.post('/restaurant', (req, res) => {
	Insert(req.body)
		.then(() => res.status(201).send('Restaurant created.'))
		.catch(() => res.status(500).send('Could not create restaurant.'));
});
```

>**Server will invoke the database code shown below.** 

>DATABASE CODE:
This function will make a query that ***creates*** a table row using the provided data.
```
const Insert = (data) => {
	return new Promise((resolve, reject) => {
		Search.create({
			restaurants: data.restaurants,
			locations: data.locations,
			cuisines: data.cuisines
		})
			.then(() => resolve())
			.catch(() => reject());
	});
};
```

## GET

Endpoint: `http://ip:port/search`

This endpoint accepts no data and responds with all database rows.

>SERVER CODE:
```
app.get('/search', (req, res) => {
	console.log(req.params.name);

	Search.findAll({ attributes: ['restaurants', 'cuisines', 'locations'] })
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			console.status(500).send('Database failed to retrieve data.');
		});
});
```

## PUT

Endpoint: `http://ip:port/restaurant/:id`

This endpoint accepts an [object](#DATA) on the request body and an id parameter that will be used to identify the database entry that will be updated. Responds with 201 success code or 500 server error code.

>SERVER CODE:
```
app.put('/restaurant/:id', (req, res) => {
	Update(req.body, req.params.id)
		.then(() => res.status(200).send('Restaurant updated.'))
		.catch(() => res.status(500).send('Could not update restaurant.'));
});
```

>**Server will invoke the database code shown below.** 

>DATABASE CODE:
This function will make a query that ***updates*** the table row matching the provided id.
```
const Update = (data, id) => {
	return new Promise((resolve, reject) => {
		Search.update({
			restaurants: data.restaurants,
			locations: data.locations,
			cuisines: data.cuisines
		}, { where: { id } })
			.then(({ dataValues }) => resolve(dataValues))
			.catch(() => reject());
	});
};
```

## DELETE

Endpoint: `http://ip:port/restaurant`

This endpoint accepts an [object](#AUTHDATA) on the request. Responds with 200 success code or 500 server error code.

>SERVER CODE:
```
app.delete('/restaurant', (req, res) => {
	const { idToDelete, authenticated } = req.body;

	if (!authenticated) {
		res.status(403).send('Authentication failed.');
		return;
	}

	Delete(idToDelete)
		.then(() => res.status(200).send('Restaurant deleted.'))
		.catch(() => res.status(500).send('Could not delete restaurant.'));
});
```

>**Server will invoke the database code shown below.** 

>DATABASE CODE:
>This function will make a query that ***deletes*** the table row matching the provided id.
```
const Delete = (id) => {
	return new Promise((resolve, reject) => {
		Search.destroy({ where: { id } })
			.then(({ dataValues }) => resolve(dataValues))
			.catch(() => reject());
	});
};
```

---

## DATA
> Used with: [POST](#POST) [PUT](#PUT)
```
{
  restaurants: String,
  locations: String,
  cuisines: String
}
```

## AUTHDATA
> Used with: [DELETE](#DELETE)
```
{
  idToDelete: Number,
  authenticated: Boolean
}
```