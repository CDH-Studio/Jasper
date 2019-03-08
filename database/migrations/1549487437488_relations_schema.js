'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RelationsSchema extends Schema {
	up () {
		this.create('room_equipment', (table) => {
			table.string('roomname', 20).notNullable();
			table.integer('id').notNullable();
			table.primary('id', 'roomname');
			table.foreign('id').references('id').on('equipments').onDelete('cascade');
			table.foreign('roomname').references('name').on('rooms').onDelete('cascade');
		});
	}

	down () {
		this.drop('room_equipment');
	}
}

module.exports = RelationsSchema;
