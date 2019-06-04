## RESTful API Docs
> Table of Contents

1. [POST](#POST)
1. [GET](#GET)
1. [PUT](#PUT)
1. [DELETE](#DELETE)


## POST

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

## GET

## PUT

## DELETE