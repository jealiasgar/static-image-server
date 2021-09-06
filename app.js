var express = require("express")
var app = express()
var fs = require("fs")
var sharp = require("sharp")

var imageData = require("./image-data")

app.get("*", function (req, res) {
	let urlArr = req.path.split("/").filter((e) => e !== "")
	let random = Math.floor(Math.random() * 6)
	if (urlArr.length === 0) {
		var s = fs.createReadStream(imageData[random])
		s.on("open", function () {
			res.set("Content-Type", "image/jpeg")
			s.pipe(res)
		})
		s.on("error", function () {
			res.set("Content-Type", "text/plain")
			res.status(404).end("Not found")
		})
	} else if (urlArr.length === 2 && !isNaN(Number(urlArr[0]))) {
		createFile(Number(urlArr[0]), Number(urlArr[1]))
	} else if (urlArr.length === 1 && !isNaN(Number(urlArr[0]))) {
		createFile(Number(urlArr[0]), Number(urlArr[0]))
	} else {
		res.status(404).end("Not Found")
	}

	function createFile(w, h) {
		// let w = Number(urlArr[0])
		// let h = Number(urlArr[1])
		let inputString = `./public/${random}_${w}_${h}.jpg`

		let inStream = fs.createReadStream(imageData[random])
		let outStream = fs.createWriteStream(inputString, { flags: "w" })
		outStream.on("error", function () {
			console.log("Error")
		})

		outStream.on("close", function () {
			console.log("Saved the output file.")
		})

		let transform = sharp()
			.resize({ width: w, height: h })
			// .pipelineColourspace("rgb16")
			.on("info", function () {
				res.set("Content-Type", "image/jpeg")
				inStream.pipe(transform).pipe(res)
			})

		inStream.pipe(transform).pipe(outStream)
	}
})

app.listen(3000, function () {
	console.log("Listening on http://localhost:3000/")
})
