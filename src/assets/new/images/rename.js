const fs = require("fs");
const path = require("path");
const dir = path.dirname(__filename);

// log list of files in directory
fs.readdir(dir, (err, files) => {
	if (err) throw err;

	files.forEach(file => {
		const oldFileName = path.join(dir, file);
		fs.rename(oldFileName, oldFileName.replace("product", "category"), err =>
			console.log({ err }),
		);
	});
});
