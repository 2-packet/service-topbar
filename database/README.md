## RESTful API Docs
> Table of Contents

1. [POST](#POST)
1. [GET](#GET)
1. [PUT](#PUT)
1. [DELETE](#DELETE)


## POST

Endpoint: `http://ip:port/restaurant`

This endpoint takes accepts an [object](#DATA) and responds with all database rows.

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

This endpoint takes accepts no data and responds with all database rows.

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

## DELETE

## DATA

```
{
  restaurants: name,
  locations: location,
  cuisines: cuisine
}
```