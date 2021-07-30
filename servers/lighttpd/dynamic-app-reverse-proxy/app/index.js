const express = require('express');
const datetime = require('node-datetime');
const PORT = process.env.PORT || 3000;

const app = express();

let count = 0;

app.route('/*')
.all((req, res) => {
	res.type('html').send(`\
<!DOCTYPE html>
<html>
	<head>
		<title>Dynamic App</title>
		<style>
		<!--
		body {
			background-color: black;
			text-align: center;
			height: 100vh;
			width: 100vw;
			color: white;
			font-family: Verdana;
			display: grid;
			place-items: center;
		}

		a, a:hover, a:visited, a:active {
			color: yellow;
			text-decoration: underline;
		}

		.right {
			text-align: right;
			width: 100%;
		}
		-->
		</style>
	</head>
	<body>
		<div>
			<h5 class='right'>
				<code>Route: ${req.path}</code>
			</h5>
			<h1>Hello World!</h1>
			<h2>The time is ${datetime.create(Date.now()).format('I:M:S p')}.</h2>
			<p>
				Made with ❤ by <a href='https://www.paramsid.com' target='_blank'>Param</a>.
			</p>
		</div>
	</body>
</html>
`);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));