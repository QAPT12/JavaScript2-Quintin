"use strict";

// export the calcFutureValue function as a CommonJS module
exports.calcFutureValue = (investment, rate, year) => {
	let futureValue = investment;
	for (let i=1; i <= years; i++) {
		futureValue += futureValue * rate / 100;
	}
	return futureValue;
}