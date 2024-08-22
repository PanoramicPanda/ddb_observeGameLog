var isObservingGameLog = false;
var gameLogObserver = null;

function observeGameLog() {
    if (isObservingGameLog) return;

    gameLogObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const addedLi = mutation.addedNodes[0];
                if (addedLi.tagName === 'LI') {
                    const diceMessageElement = addedLi.querySelector('[class*="-Pending-ref"]');
                    if (!diceMessageElement) {
                        const roll = extractDataFromLi(addedLi);
                        const rollTarget = roll.rollTarget.toLowerCase();

                        if (!(rollTarget === 'to: self') && !(rollTarget === 'to: dm') && !(roll.diceRoll === '')) {
                            let diceRoll = roll.diceRoll;
                            let color = "<color=\"white\">";

                            let firstNumber, secondNumber, selectedNumber;
                            if (diceRoll.includes('d20')) { // determine if it crit or crit failed
                                let diceResultExpression = roll.diceResultMath;

                                if (diceRoll.includes('kh1') || diceRoll.includes('kl1')) { // Check if diceRoll is using Adv or DisAdv
                                    const numbersInParentheses = diceResultExpression.match(/\((\d+),\s*(\d+)\)/);
                                    if (numbersInParentheses) { //Get both numbers
                                        firstNumber = parseInt(numbersInParentheses[1], 10);
                                        secondNumber = parseInt(numbersInParentheses[2], 10);

                                        if (diceRoll.includes('kh1')) { //determine which to keep
                                            selectedNumber = Math.max(firstNumber, secondNumber);
                                        } else {
                                            selectedNumber = Math.min(firstNumber, secondNumber);
                                        }
                                    }

                                } else {
                                    let firstNumberString = diceResultExpression.split(' ')[0]; // Split the string by space and take the first element
                                    selectedNumber = parseInt(firstNumberString, 10); // Convert the string to a number
                                }


                                if (selectedNumber === 20) {
                                    color = "<color=\"green\">"; // Sets color to Green if a natural 20 is rolled
                                } else if (selectedNumber === 1) {
                                    color = "<color=\"red\">"; // Sets color to Red if a natural 1 is rolled
                                }
                            }

                            TS.symbiote.sendNotification(roll.character, "<align=\"center\">" + roll.rollAction + " " + roll.rollType +
                                "\n<size=200%>" + color + roll.diceResultTotal + "</color>\n<size=90%>" + roll.diceRoll + "  (" + roll.diceResultMath + ")");
                            console.log(roll);
                        }
                    }
                }
            }
        });
    });

    const gameLogElement = document.querySelector('[class*="GameLogEntries"]');
    if (gameLogElement) {
        gameLogObserver.observe(gameLogElement, {childList: true});
        isObservingGameLog = true;
    } else {
        console.error('GameLogEntries not found');
    }
}

function stopObservingGameLog() {
    if (gameLogObserver) {
        gameLogObserver.disconnect();
        isObservingGameLog = false;
    }
}

function checkAndObserveGameLog() {
    const gameLogElement = document.querySelector('[class*="GameLogEntries"]');
    if (gameLogElement) {
        observeGameLog();
    } else {
        stopObservingGameLog();
    }
}

function capitalizeWords(str) {
    return str.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function extractDataFromLi(liElement) {
    // Dice Roll
    const diceRollElement = liElement.querySelector('[class*="Line-Notation"] span');
    const diceRoll = diceRollElement ? diceRollElement.textContent : '';

    // Dice Result Math
    const diceResultMathElement = liElement.querySelector('[class*="Line-Breakdown"] span');
    const diceResultMath = diceResultMathElement ? diceResultMathElement.textContent : '';

    // Dice Result Total
    const diceResultTotalElement = liElement.querySelector('[class*="TotalContainer"] span');
    const diceResultTotal = diceResultTotalElement ? diceResultTotalElement.textContent : '';

    // Character
    const characterElement = liElement.querySelector('[class*="-Sender"]');
    const character = characterElement ? characterElement.textContent : '';

    // Roll Action
    const rollActionElement = liElement.querySelector('[class*="-Action"]');
    const rollAction = rollActionElement ? rollActionElement.textContent : '';

    // Roll Type
    const rollTypeElement = liElement.querySelector('[class*="-RollType"]');
    const rollType = rollTypeElement ? capitalizeWords(rollTypeElement.textContent) : '';

    // Roll Target
    const rollTargetElement = liElement.querySelector('[class*="-Target-ref"]');
    const rollTarget = rollTargetElement ? capitalizeWords(rollTargetElement.textContent) : '';

    return {
        diceRoll,
        diceResultMath,
        diceResultTotal,
        character,
        rollAction,
        rollType,
        rollTarget
    };
}

// Call checkAndObserveGameLog every 5 seconds
setInterval(checkAndObserveGameLog, 5000);