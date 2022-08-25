const fs = require("fs");
const path = require("path");
const { parse } = require("fast-csv");

const readCsv = () => {
	return new Promise((resolve, reject) => {
		let data = [];
		fs.createReadStream(path.resolve(__dirname, "data.csv"))
			.pipe(parse({ headers: true }))
			.on("error", (error) => reject(error))
			.on("data", (row) => {
				data.push(row);
			})
			.on("end", (_rowCount) => {
				resolve(data);
			});
	});
};

module.exports = readCsv;
