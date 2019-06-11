'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
	up () {
		// Users - Information about users
		this.create('users', (table) => {
			table.increments();
			table.string('firstname', 80).notNullable();
			table.string('lastname', 80).notNullable();
			table.string('email', 254).notNullable().unique();
			table.string('password', 60).notNullable();
			table.integer('floor_id').unsigned().references('id').inTable('floors');
			table.integer('tower_id').unsigned().references('id').inTable('towers');
			table.integer('building_id').unsigned().references('id').inTable('buildings');
			table.integer('role_id').notNullable().references('id').inTable('user_roles');
			table.bool('verified').notNullable();
			table.timestamps();
		});

		// Accont requests - Requests such as registration and password reset
		this.create('account_requests', (table) => {
			table.increments();
			table.string('email', 254).notNullable();
			table.string('hash', 254).notNullable().unique();
			table.integer('type').notNullable();
			table.timestamps();
		});
	}

	down () {
		this.drop('users');
		this.drop('account_requests');
	}
}

module.exports = UserSchema;
