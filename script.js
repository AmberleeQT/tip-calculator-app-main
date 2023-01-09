// TODO: Get Bill input
// TODO: Get gratuity values
// ?? Set active state on clicked
// ?? onClick, setGratuity value
// ?? cycle through each btn
// -> if value == gratuity, add active class
// -> else == remove active class
// -> if value !== gratuity
// TODO: Get split
// TODO: Validate bill, gratuity, and split
// TODO: Calculate gratuity per person
// TODO: Calculate total bill per person
// TODO: Handle RESET

// TODO: Debounce fxn to wait to do anything until user stops typing

// ** Query elements
const bill = document.getElementById('bill');
const gratuityBtns = document.querySelectorAll('.gratuity');
const customGratuity = document.getElementById('custom-gratuity');
const people = document.getElementById('people');
const splitTip = document.getElementById('split-tip');
const splitTotal = document.getElementById('split-total');
const resetBtn = document.getElementById('reset');

// ** Defaults

let billVal = null;
let gratuityVal = null; // IN DECIMAL
let split = null;

// ** Event Listeners
bill.addEventListener('input', getInitialBill);
gratuityBtns.forEach((btn) => btn.addEventListener('click', selectGratuity));
customGratuity.addEventListener('input', parseCustomGratuity);
people.addEventListener('input', getNumPeople);
resetBtn.addEventListener('click', resetCalculator);

document.addEventListener('load', resetCalculator);

// ** Functions
function debounce(func, delay = 500) {
	// Use to give user time to input info before calculating tip
	let timer;
	return (...args) => {
		if (!timer) {
			func.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = undefined;
		}, delay);
	};
}
function parseCustomGratuity() {
	gratuityBtns.forEach((btn) => {
		btn.classList.remove('active');
	});
	// !! debounce to wait for user to stop typing
	// 'this' keyword used because we want the value of the input where the event is fired from
	gratuityVal = parseFloat(this.value) / 100; // convert to decimal
	console.log('Gratuity (dec): ', gratuityVal);
}
function selectGratuity(e) {
	customGratuity.value = '';
	gratuityBtns.forEach((btn) => {
		if (e.target.innerHTML === btn.innerHTML) {
			btn.classList.add('active');
			gratuityVal = parseFloat(this.innerHTML) / 100; // parseFloat does not read '%'
		} else {
			btn.classList.remove('active');
		}
	});
	console.log(gratuityVal);
}
function getInitialBill() {
	// !! debounce to wait for user to stop typing
	// if (typeof this.value === 'number') {
	// 	billVal = this.value;
	// }
	billVal = parseFloat(this.value);
	console.log('Initial Bill: ', billVal);
	// error
}
function getNumPeople() {
	// !! debounce to wait for user to stop typing
	// if (typeof this.value === 'number') {
	// 	split = this.value;
	// }
	split = parseInt(this.value);
	console.log('Num People: ', split);
	// error
	console.log('Split type: ', typeof split);

	if (billVal && gratuityVal && split) {
		calculateSplitCosts();
	}
}
function calculateSplitCosts() {
	/*
    let billVal = null;
    let gratuityVal = null; // IN DECIMAL
    let split = null;
  */
	let splitTipVal;
	let splitTotalVal;
	const gratuityTotalSplit = ((billVal * gratuityVal) / split).toFixed(2);
	const billTotalSplit = ((billVal * (1 + gratuityVal)) / split).toFixed(2);

	splitTip.innerHTML = `$${gratuityTotalSplit}`;
	splitTotal.innerHTML = `$${billTotalSplit}`;

	resetBtn.removeAttribute('disabled');
}
function resetCalculator() {
	billVal = null;
	gratuityVal = null;
	split = null;

	bill.value = '';
	gratuityBtns.forEach((btn) => {
		btn.classList.remove('active');
	});
	customGratuity.value = '';
	people.value = '';

	splitTip.innerHTML = `$0.00`;
	splitTotal.innerHTML = `$0.00`;

	resetBtn.setAttribute('disabled', 'disabled');
}
