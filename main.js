let board_block = document.getElementById('virtual-board-block');
let resWord = document.getElementById("result-word");
let capsInt = 0, altInt = 0;

let latin_base = [
	"`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
	"Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|",
	"CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", 
	"Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift2",
	"Ctrl", "Alt", "Space", "Alt"
];
let cyrillic_base = [
	"ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
	"Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "|",
	"CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", 
	"Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift2",
	"Ctrl", "Alt", "Space", "Alt"
];

(function () {EnRuLang(latin_base);})();

function EnRuLang(base_x) {
	base_x.forEach(function(item, index) {
		let btn = document.createElement('button');
		let br = document.createElement('br');
		
		if (index == 52) btn.innerHTML = "Shift";
		else btn.innerHTML = item;
		btn.setAttribute("class", "btn-board");

		board_block.append(btn);
		if (item == "|") btn.after(br);
		else if (item == "Enter") btn.after(br);
		else if (item == "Shift2") btn.after(br);
	});
}

function unDrawBtn(item, trnsform, bgColor, txtColor, boxShadow, x) {
	item.style.transform = `translateY(${trnsform})`;
	item.style.backgroundColor = bgColor;
	item.style.color = txtColor;
	item.style.boxShadow = boxShadow;
	if (x == 1) item.removeAttribute("style");
	else return;
}

function UpperLowerFunc(x) {
	document.querySelectorAll('#virtual-board-block button').forEach((item) => {
		if (item.innerHTML == "Backspace") return;
		else if (item.innerHTML == "Tab") return;
		else if (item.innerHTML == "CapsLock") return;
		else if (item.innerHTML == "Enter") return;
		else if (item.innerHTML == "Shift") return;
		else if (item.innerHTML == "Ctrl") return;
		else if (item.innerHTML == "Space") return;
		else if (item.innerHTML == "Alt") return;
		else {
			if (x == 1) item.innerHTML = item.innerHTML.toUpperCase();
			else item.innerHTML = item.innerHTML.toLowerCase();
		}
	});
}

function altIntFunc() {
	if (altInt % 2 == 0) {
		board_block.innerHTML = "";
		EnRuLang(cyrillic_base);
	} else {
		board_block.innerHTML = "";
		EnRuLang(latin_base);
	}
	altInt++;
}

window.addEventListener("keydown", function(e) {
	if (e.keyCode == 18) altIntFunc();
	if (e.keyCode == 32) resWord.innerHTML += " ";
	
	document.querySelectorAll('#virtual-board-block button').forEach(function(item) {
		if (item.innerHTML == e.key) {

			if (item.innerHTML == "Backspace") resWord.innerHTML = resWord.innerHTML.split("").slice(0,-1).join("");
			else if (item.innerHTML == "Tab") resWord.innerHTML = resWord.innerHTML;
			else if (item.innerHTML == "CapsLock") resWord.innerHTML = resWord.innerHTML;
			else if (item.innerHTML == "Enter") resWord.innerHTML = resWord.innerHTML;
			else if (item.innerHTML == "Shift") resWord.innerHTML = resWord.innerHTML;
			else if (item.innerHTML == "Alt") resWord.innerHTML = resWord.innerHTML;
			else resWord.innerHTML += item.innerHTML;
				
			unDrawBtn(item, "8px", "maroon", "white", "0px 0px 0px #333333", 0);
		}
		else if (item.innerHTML == "Ctrl" && e.key == "Control") unDrawBtn(item, "8px", "maroon", "white", "0px 0px 0px #333333", 0);
		else if (item.innerHTML == "Space" && e.keyCode == 32) unDrawBtn(item, "8px", "maroon", "white", "0px 0px 0px #333333", 0);

		if (item.innerHTML == "CapsLock" && e.keyCode == 20) {
			if (capsInt % 2 == 0) UpperLowerFunc(1);
			else UpperLowerFunc(2);
		}
		capsInt++;
	});
});

window.addEventListener("keyup", function(e) {
	document.querySelectorAll('#virtual-board-block button').forEach(function(item) {
		if (item.innerHTML == e.key) unDrawBtn(item, "0px", "yellow", "black", "1px 8px 3px #333333", 1);
		else if (item.innerHTML == "Ctrl" && e.key == "Control") unDrawBtn(item, "0px", "yellow", "black", "1px 8px 3px #333333", 1);
		else if (item.innerHTML == "Space" && e.keyCode == 32) unDrawBtn(item, "0px", "yellow", "black", "1px 8px 3px #333333", 1);	
	});
});

function btn_onclick() {
	document.querySelectorAll(".btn-board").forEach(function(item) {
		item.addEventListener("click", (e) => {
			if (item.innerHTML == "Backspace") resWord.innerHTML = resWord.innerHTML.split("").slice(0,-1).join("");
			else if (item.innerHTML == "Space") resWord.innerHTML += " ";
			else if (item.innerHTML == "Tab") resWord.innerHTML = resWord.innerHTML;
			else if (item.innerHTML == "CapsLock") {
				if (capsInt % 2 == 0) UpperLowerFunc(1);
				else UpperLowerFunc(2);
				capsInt++;
			}
			else if (item.innerHTML == "Enter") resWord.innerHTML = resWord.innerHTML;
			else if (item.innerHTML == "Shift") resWord.innerHTML = resWord.innerHTML;
			else if (item.innerHTML == "Alt") {
				altIntFunc();
				if (item.innerHTML == "Alt") resWord.innerHTML = resWord.innerHTML;
				else resWord.innerHTML += item.innerHTML;
				btn_onclick();
			}
			else if (item.innerHTML == "Ctrl") resWord.innerHTML = resWord.innerHTML;
			else resWord.innerHTML += item.innerHTML;
		});
	});
}
btn_onclick();

