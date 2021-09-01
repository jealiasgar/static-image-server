let conf = {
	local: {
		example: {
			primary: true,
			dbms: "mongodb",
			host: "localhost:27017",
			dbName: "example",
			un: "",
			pw: false,
		},
		/* postgres db config
			example: {
				primary: true,
				dbms: "postgres",
				host: "localhost:5432",
				dbName: "example",
				un: "example",
				pw: "supersecretpassword",
			},
		*/
	},
	l2p: {
		example: {
			primary: true,
			dbms: "mongodb",
			host: "localhost:27017",
			dbName: "example",
			un: "",
			pw: false,
		},
	},
}

module.exports = conf
