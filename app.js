var express = require("express")
var app = express()
var fs = require("fs")
var sharp = require("sharp")

var imageData = require("./image-data")

app.get("*", function (req, res) {
	if (req.query.blur && Number(req.query.blur) > 20) {
		res.status(400).end("Blur cannot be more than 20")
	}
	let filters = Object.keys(req.query)
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
		createFile({
			w: Number(urlArr[0]),
			h: Number(urlArr[1]),
			isGrayscale: filters.includes("grayscale"),
			// prettier-ignore
			blur: req.query.blur
				? Number(req.query.blur)
				: filters.includes("blur")
					? 5
					: 0.3,
		})
	} else if (urlArr.length === 1 && !isNaN(Number(urlArr[0]))) {
		createFile({
			w: Number(urlArr[0]),
			h: Number(urlArr[0]),
			isGrayscale: filters.includes("grayscale"),
			// prettier-ignore
			blur: req.query.blur
				? Number(req.query.blur)
				: filters.includes("blur")
					? 5
					: 0.3,
		})
	} else {
		res.status(404).end("Not Found")
	}

	function createFile({ w, h, isGrayscale = false, blur }) {
		let inputString = `./public/${random}_${w}_${h}.jpg`

		let inStream = fs.createReadStream(imageData[random])
		let outStream = fs.createWriteStream(inputString, { flags: "w" })
		outStream.on("error", function () {
			console.log("Error")
		})

		let transform = sharp()
			.resize({ width: w, height: h })
			.grayscale(isGrayscale)
			.blur(blur)
			.on("info", function () {
				res.set("Content-Type", "image/jpeg")
				inStream.pipe(transform).pipe(res)
			})

		inStream.pipe(transform).pipe(outStream)

		outStream.on("close", function () {
			fs.unlinkSync(inputString)
			console.log("Saved the output file.")
		})
	}
})

app.listen(3000, function () {
	console.log("Listening on http://localhost:3000/")
})
