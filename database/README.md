## RESTful API Docs
> Table of Contents

1. [POST](#POST)
1. [GET](#GET)
1. [PUT](#PUT)
1. [DELETE](#DELETE)


## POST

Endpoint: `http://ip:port/restaurant`

This endpoint accepts an [object](#DATA) and responds with all database rows.

>SERVER CODE:
```
app.post('/restaurant', (req, res) => {
	Insert(req.body)
		.then(() => res.sendStatus(201))
		.catch(() => res.sendStatus(500));
});
```

Server will invoke the database code shown below.

>DATABASE CODE:
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
			console.log('server err from db', err);
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
		.then(() => res.sendStatus(201))
		.catch(() => res.sendStatus(500));
});
```
Server will invoke the database code shown below.

>DATABASE CODE:
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

## DATA

```
{
  restaurants: name,
  locations: location,
  cuisines: cuisine
}
```