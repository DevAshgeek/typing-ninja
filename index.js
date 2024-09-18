const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
// console.log(words);
const game = document.querySelector("#game");
const testingtxt = document.querySelector("#words");
const cursor = document.querySelector("#cursor");
const gameTime = 60;

window.timer = null;
window.gameStart = null;

const wordlen = words.length;
let corLtcount = 0, corWdcount = 0, ttlcCorLet = 0;
let incLtcount = 0, incWdcount = 0, ttlIncLet = 0;
let letterAccu, wordAccu;

function randomWord() {
    const randomIndex = Math.floor(Math.random() * wordlen);
    return words[randomIndex];
}

function getletters(wrd) {
    let genelm = '';
    for (let i = 0; i < wrd.length; i++) {
        let letter = wrd.charAt(i);
        genelm += `<span class ="letter">${letter}</span>`
    }
    let genword = `<span class="word">${genelm}</span>`;
    return genword;
}

function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}



function newGame() {
    // Reset the game state

    window.timer = null;
    window.gameStart = null;

    corLtcount = 0;
    corWdcount = 0;
    ttlcCorLet = 0;
    incLtcount = 0;
    incWdcount = 0;
    ttlIncLet = 0;
    letterAccu = 0;
    wordAccu = 0;

    // Reset UI elements
    document.querySelector("#corword .la").innerHTML = 0;
    document.querySelector("#corword .wa").innerHTML = 0;
    document.querySelector("#info").innerHTML = `${gameTime} sec`; // reset timer display


    // Reset the game area
    testingtxt.innerHTML = '';
    let tstpara = document.createElement("p");
    tstpara.innerHTML = "";
    tstpara.classList.add("wordspara");

    for (let i = 0; i < 100; i++) {
        if (i < 99) tstpara.innerHTML += getletters(randomWord()) + `<span class="letter blank"> </span>`;
        else tstpara.innerHTML += getletters(randomWord());
    }

    testingtxt.appendChild(tstpara);
    addClass(document.querySelector(".word"), "current");
    addClass(document.querySelector(".letter"), "current");

    // Reset timer and other game variables

    removeClass(document.getElementById("game"), "over");

    // Focus hidden input for mobile on game start
    hiddenInput.focus();
}

function getWpm() {
    let ttlwords = corWdcount + incWdcount;
    console.log(ttlwords);
    return ttlwords;
}

function gameOver() {
    clearInterval(window.timer);
    addClass(document.getElementById("game"), "over");
    document.querySelector("#info").innerHTML = `WPM: ${getWpm()}`;

    hiddenInput.blur();
}

const handleEvent = evt => {
    const key = evt.key;
    const currentLetter = document.querySelector(".letter.current");
    const currentWord = document.querySelector(".word.current");
    const expected = currentLetter.innerHTML;

    if (!currentLetter) return;

    if (document.querySelector("#game.over")) {
        return;
    }
    const isLetter = key.length === 1;

    if (!window.timer && isLetter) {
        window.timer = setInterval(() => {
            if (!window.gameStart) {
                window.gameStart = (new Date()).getTime();
                // console.log(window.gameStart)
            }

            const currentTime = (new Date()).getTime();

            const spassed = Math.round((currentTime - window.gameStart) / 1000);
            const spareTime = gameTime - spassed;
            // console.log(spareTime)
            document.getElementById("info").innerHTML = `${spareTime} sec`;
            if (spareTime <= 0) {
                gameOver();
            }

        }, 1000)
    }

    if (expected !== " ") {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? "correct" : "incorrect");
            removeClass(currentLetter, "current");

            if (currentLetter.classList.contains("correct")) {
                corLtcount++;
                ttlcCorLet = ttlcCorLet + 1;
            }

            if (currentLetter.classList.contains("incorrect")) {
                incLtcount++;
                ttlIncLet = ttlIncLet + 1;
            }

            letterAccu = Math.round(((ttlcCorLet / (ttlcCorLet + ttlIncLet)) * 100));
            document.querySelector("#corword .la").innerHTML = ttlcCorLet;


            if (currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling, "current");
            }
            else {
                if (currentWord.children.length === corLtcount) corWdcount++;
                if (currentWord.children.length !== corLtcount) incWdcount++;

                corLtcount = 0;
                incLtcount = 0;
                wordAccu = Math.round(((corWdcount / (corWdcount + incWdcount)) * 100));
                document.querySelector("#corword .wa").innerHTML = corWdcount;
                const nextWordFirstLetter = currentLetter.parentElement.nextSibling;
                addClass(nextWordFirstLetter, "current");
                removeClass(currentWord, "current");
                const nextwrd = nextWordFirstLetter.nextSibling;
                addClass(nextwrd, "current");

                // console.log(nextwrd);
            }
        }

    }
    else if (expected === " ") {
        // console.log(currentLetter);
        if (currentLetter) {
            addClass(currentLetter, key === expected ? "correct" : "incorrect");
            removeClass(currentLetter, "current");

            if (currentLetter.classList.contains("correct")) {
                corLtcount++;
                ttlcCorLet = ttlcCorLet + 1;
                corLtcount = 0;
                document.querySelector("#corword .la").innerHTML = ttlcCorLet;
            }

            const nextWord = currentLetter.nextSibling;
            removeClass(currentWord, "current");
            addClass(nextWord, "current");
            addClass(nextWord.firstChild, "current");
            // console.log(nextWord);

        }
    }

}

// Handle key events
document.getElementById("game").addEventListener('keyup', handleEvent);

// Hidden input field for mobile devices
const hiddenInput = document.createElement('input');
hiddenInput.type = 'text';
hiddenInput.style.position = 'absolute';
hiddenInput.style.opacity = 0;
hiddenInput.style.height = 0;
hiddenInput.style.width = 0;
hiddenInput.style.zIndex = -1;
document.getElementById("game").appendChild(hiddenInput);

let lastTouchTime = 0;

// Handle keyboard focus and keep it open
function focusKeyboard() {
    const now = Date.now();
    if (now - lastTouchTime > 300) {
        hiddenInput.focus();
        setTimeout(() => hiddenInput.focus(), 100);
    }
    lastTouchTime = now;
}

// Ensure game is not over before focusing on hidden input
document.getElementById("game").addEventListener('touchstart', (e) => {
    e.preventDefault();
    focusKeyboard();
     handleEvent({ key: ' ' });  
    if (!document.querySelector("#game.over")) {
        focusKeyboard();
    }
});


// Make sure hidden input is focused when new game starts
document.getElementById("newgamebtn").addEventListener('click', () => {
    gameOver();
    newGame();
    focusKeyboard();
});
newGame();
