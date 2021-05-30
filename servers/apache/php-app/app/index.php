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
				<code>Route: <?php echo $_SERVER['REQUEST_URI']; ?></code>
			</h5>
			<h1>Hello World!</h1>
			<h2>The time is <?php echo date('h:i:s a'); ?>.</h2>
			<p>
				Made with ❤ by <a href='https://www.paramsid.com' target='_blank'>Param</a>.
			</p>
		</div>
	</body>
</html>