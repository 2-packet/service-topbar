const Sequelize = require('sequelize');
// const mysql = require('mysql');
// const Search = require('./seeding');

// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'student'
// });

// connection.query('DROP DATABASE IF EXISTS Search', () => {});
// connection.query('CREATE DATABASE Search', () => {
const sequelize = new Sequelize('search', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	logging: false
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection Has Been Established Successfully');
	})
	.catch((err) => {
		console.log(err);
	});

const Search = sequelize.define(
	'search',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		restaurants: Sequelize.STRING,
		locations: Sequelize.STRING,
		cuisines: Sequelize.STRING
	},
	{
		freezeTableName: true,
		tableName: 'search',
		timestamps: false
	}
);

const Autocomplete = (q) => {
	const { or } = Sequelize.Op;

	return new Promise((resolve, reject) => {
		Search.findAll({
			where: {
				[or]: [
					{ restaurants: { [Sequelize.Op.substring]: q } },
					{ locations: { [Sequelize.Op.substring]: q } },
					{ cuisines: { [Sequelize.Op.substring]: q } }
				]
			}
		})
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

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

const Delete = (id) => {
	return new Promise((resolve, reject) => {
		Search.destroy({ where: { id } })
			.then(({ dataValues }) => resolve(dataValues))
			.catch(() => reject());
	});
};

module.exports = { Search, Insert, Update, Delete, Autocomplete };
