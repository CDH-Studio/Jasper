'use strict';
const axios = require('axios');
const Env = use('Env');
const moment = require('moment');
const recur = require('moment-recur');
const Outlook = new (use('App/Outlook'))();

class RecurController {
	async renderRecurring ({ view }) {
		return view.render('userPages.recurringBooking');
	}

	async searchRecurring2 ({ request }) {
		const options = request.all();
		console.log(options);

		// start date
		const start = moment(options.start).dateOnly();

		// end date
		const end = moment(options.end).dateOnly();

		// moment-recur object
		let recur = moment().recur({
			start,
			end
		});

		// types of recurring
		if (options.type === 'weekly') {
			recur = recur
				.daysOfWeek(options.daysOfWeek);

			let dates = recur.all();
			console.log(dates);

			const firstWeek = dates[0].week();
			dates = dates
				.filter((date) => {
					return (date.week() - firstWeek) % options.weeklyInterval === 0;
				})
				.map((date) => {
					return {from}
				});
			console.log(dates);
			return recur;
		}
	}

	async searchRecurring ({ request }) {
		// console.log(Env.get('EXCHANGE_AGENT_SERVER', 'http://172.17.75.10:3000'));
		const options = request.all();
		console.log(options);

		return { recurType: options.type, start: options.start, end: options.end, from: options.from, to: options.to };
	}

	async test () {
		console.log(recur);
	}
}

module.exports = RecurController;
