document.addEventListener("DOMContentLoaded", loaded);

let regexTxt, run, outputDiv, toTranslateTxt;

function loaded() {
	const id = a => document.getElementById(a);
	regexTxt = id('regex');
	run = id('run');
	outputDiv = id('output');
	toTranslateTxt = id('toTranslateTxt');

	run.addEventListener('click', onRun)
}

let languageMap;
function onRun() {
	let matches = regexMatch();
	getData(matches.map(a => a[0]));
}

function regexMatch() {
	const regex = new RegExp(regexTxt.value, 'g');
	const input = toTranslateTxt.value;

	return [...input.matchAll(regex)];
}

function regexReplace(data) {
	const regex = new RegExp(regexTxt.value, 'g');
	const input = toTranslateTxt.value;

	while (outputDiv.lastChild) outputDiv.removeChild(outputDiv.lastChild);

	for (lang of data.keys()) {
		let output = input;
		for (page of data.get(lang))
			output = output.replaceAll(page[0], page[1]);

		let p = document.createElement('p');
		let textarea = document.createElement('textarea');

		p.innerHTML = lang;
		textarea.innerHTML = output;
		textarea.setAttribute('rows', 10);

		outputDiv.appendChild(p);
		outputDiv.appendChild(textarea);
		outputDiv.appendChild(document.createElement('hr'));
	}
}

async function getData(pages) {
	const api = 'https://stardewvalleywiki.com/mediawiki/api.php?action=query&prop=langlinks&origin=*&redirects=&format=json&lllimit=500&titles=';

	let result;
	if (pages.length != 0) {
		let data = await fetch(api + pages.reduce((a, b) => a + '|' + b));
		result = await data.json();
	}

	const data = parseData(result);

	regexReplace(data);
}

// { lang => { pagetitle => langtitle, ... }, ... }

function parseData(data) {
	let out = new Map();
	const pages = data?.query?.pages;
	if (!pages) return out;

	for (page in pages) {
		for (lang of pages[page].langlinks) {
			if (!out.has(lang.lang)) out.set(lang.lang, new Map());
			out.get(lang.lang).set(pages[page].title, lang['*']);
		}
	}

	return out;
}
