import React, { useState, useEffect } from 'react';

import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
	const [html, setHtml] = useLocalStorage('html', '');
	const [js, setJs] = useLocalStorage('js', '');
	const [css, setCss] = useLocalStorage('css', '');
	const [srcDoc, setSrcDoc] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
				<html>
					<body>${html}</body>
					<script>${js}</script>
					<style>${css}</style>
				</html>
		`);
		}, 250);
		return () => clearTimeout(timeout);
	}, [html, js, css]);

	return (
		<>
			<div className="pane top-pane">
				<Editor
					language="xml"
					displayName="HTML"
					value={html}
					onChange={setHtml}
				/>
				<Editor
					language="javascript"
					displayName="JS"
					value={js}
					onChange={setJs}
				/>
				<Editor
					language="css"
					displayName="CSS"
					value={css}
					onChange={setCss}
				/>
			</div>
			<div className="pane">
				<iframe
					srcDoc={srcDoc}
					title="output"
					sandbox="allow-scripts"
					frameBorder="0"
					width="100%"
					height="100%"
				></iframe>
			</div>
		</>
	);
}

export default App;
