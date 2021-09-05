from os import environ as env
from flask import Flask, Response, request
from datetime import datetime

app = Flask(__name__)

@app.route('/', defaults={ 'path': '' })
@app.route('/<path:path>')
def home(path):
	return Response(f'''
	<!DOCTYPE html>
	<html>
		<head>
			<title>Dynamic App</title>
			<style>
			<!--
			body {{
				background-color: black;
				text-align: center;
				height: 100vh;
				width: 100vw;
				color: white;
				font-family: Verdana;
				display: grid;
				place-items: center;
			}}

			a, a:hover, a:visited, a:active {{
				color: yellow;
				text-decoration: underline;
			}}

			.right {{
				text-align: right;
				width: 100%;
			}}
			-->
			</style>
		</head>
		<body>
			<div>
				<h5 class='right'>
					<code>Route: {request.path}</code>
				</h5>
				<h1>Hello World!</h1>
				<h2>The time is {datetime.now()}.</h2>
				<p>
					Made with ❤ by <a href='https://www.paramsid.com' target='_blank'>Param</a>.
				</p>
			</div>
		</body>
	</html>
	''', mimetype='text/html')

if __name__ == '__main__':
	app.run(port=env.get('PORT', 8080))