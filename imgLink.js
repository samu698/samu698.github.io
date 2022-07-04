document.addEventListener("DOMContentLoaded", loaded);

let loadBtn, scaleSlider, scaleTxt, img, imgDiv, fileChoose, codeTxtElem, outputTxt;
let imgLoaded = false;

function loaded() {
	const id = a => document.getElementById(a);
	loadBtn = id('loadBtn');
	scaleSlider = id('scaleSlider');
	scaleTxt = id('scaleTxt');
	img = id('img');
	fileChoose = id('fileChoose');
	codeTxtElem = id('codeTxt');
	outputTxt = id('outputTxt');
	imgDiv = id('imgDiv');

	img.style.display = 'none';

	loadBtn.addEventListener('click', loadClick);
	scaleSlider.addEventListener('input', sliderChange);
	fileChoose.addEventListener('change', gotFile);
	imgDiv.addEventListener('click', imgClick);
	imgDiv.addEventListener('contextmenu', imgRClick);
	imgDiv.addEventListener('mousemove', imgMove);

	sliderChange();
}

function loadClick(e) {
	fileChoose.click();
}

function sliderChange(e) {
	let scale = parseFloat(scaleSlider.value);
	scaleTxt.innerHTML = 'Scale: ' + scale.toFixed(2);

	imgDiv.style.width = scale * 100 + '%';
}

function gotFile(e) {
	const file = fileChoose.files[0];
	if (!file) return;

	imgLoaded = true;
	img.style.display = '';
	imgDiv.style.display = '';
	loadBtn.style.display = 'none';

	const reader = new FileReader();
	reader.addEventListener('loadend', e => img.setAttribute('src', e.target.result));
	reader.readAsDataURL(file);
}

class DivRect {
	constructor(x1, y1, x2, y2, img) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.img = img;

		this.div = document.createElement('div');
		this.div.className = 'showDiv';
		this.#styleDiv();
		imgDiv.appendChild(this.div);
	}

	#styleDiv = () => {
		this.div.style.left = this.x;
		this.div.style.top = this.y;
		this.div.style.width = this.w;
		this.div.style.height = this.h;
	}

	setP2(x2, y2) {
		this.x2 = x2;
		this.y2 = y2;

		this.#styleDiv();
	}

	#toPercent = (v, max) => (v / max * 100).toFixed(2) + '%';

	get x() {
		const minX = Math.min(this.x1, this.x2);
		return this.#toPercent(minX, img.width);
	}
	get y() {
		const minY = Math.min(this.y1, this.y2);
		return this.#toPercent(minY, img.height);
	}
	get w() {
		const maxX = Math.max(this.x1, this.x2);
		const minX = Math.min(this.x1, this.x2);
		const pixelWidth = maxX - minX;
		return this.#toPercent(pixelWidth, img.width);
	}
	get h() {
		const maxY = Math.max(this.y1, this.y2);
		const minY = Math.min(this.y1, this.y2);
		const pixelHeight = maxY - minY;
		return this.#toPercent(pixelHeight, img.height);
	}
}

let box;

function imgClick(e) {
	const rect = imgDiv.getBoundingClientRect();
	const x = e.x - rect.x;
	const y = e.y - rect.y;

	if (!box) {
		box = new DivRect(x, y, x, y);
		return;
	}

	let text = codeTxtElem.value;
	text = text.replaceAll('{L}', box.x);
	text = text.replaceAll('{T}', box.y);
	text = text.replaceAll('{W}', box.w);
	text = text.replaceAll('{H}', box.h);
	outputTxt.textContent += text + '\n';
	
	box = null;
}
function imgRClick(e) {
	if (!box) return;
	imgDiv.removeChild(box.div);
	box = null;

	e.preventDefault();
}
function imgMove(e) {
	const rect = imgDiv.getBoundingClientRect();
	const x = e.x - rect.x;
	const y = e.y - rect.y;

	if (box) box.setP2(x, y);
}
