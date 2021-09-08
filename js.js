//////////////////////////////////////
// CONSTANTS
//////////////////////////////////////
const CHARACTER_SHEET_ID = "character-path";
const INPUT_NAME = "input-name";
const LABEL_ENDURANCE = "lbl-endurance";
const LABEL_MIND = "lbl-mind";
const LABEL_STRENGTH = "lbl-strength";
const LABEL_AGILITY = "lbl-agility";
const LABEL_WILL = "lbl-will";
const LABEL_AC = "lbl-ac";
const LABEL_PAC = "lbl-pac";
const BTN_DECREASE = "btn-decrease-";
const HEAD_VALUE = "head-value";
const RIGHT_ARM_VALUE = "rarm-value";
const LEFT_ARM_VALUE = "larm-value";
const SPIRIT_VALUE = "spirit-value";
const HEART_VALUE = "heart-value";
const RIGHT_LEG_VALUE = "rleg-value";
const LEFT_LEG_VALUE = "lleg-value";

//////////////////////////////////////
// GLOBAL VARIABLES
//////////////////////////////////////

//With every new character attributes, you must add it here so it doesn't crash when sending updates
const initCharacterBaseStat = {
    "name": "",
    "headValue": 0,
    "spiritValue": 0,
    "heartValue": 0,
    "rightArmValue": 0,
    "leftArmValue": 0,
    "rightLegValue": 0,
    "leftLegValue": 0,
    "enduranceValue": 0,
    "Ac": 0,
    "Pac": 0,
    "mindValue": 0,
    "strengthValue": 0,
    "agilityValue": 0,
    "willValue": 0,
}

let character = initCharacterBaseStat;
character = Object.assign(initCharacterBaseStat, initCharacter);

//////////////////////////////////////
// GENERAL FUNCTIONS
//////////////////////////////////////

function initPage() {
    loadCharacter();
}

function getItemById(id) {
    return document.getElementById(id);
}

//////////////////////////////////////
// CHARACTER SPECIFIC
//////////////////////////////////////

function loadCharacter() {
    //Object.assign(initCharacterBaseStat, initCharacter)
    loadInfo();
    loadAttributes();
    calculateStats()
    loadStats();
    loadTitles();
}

function loadInfo() {
    getItemById(INPUT_NAME).value = character.name;
}

function loadStats() {
    getItemById(LABEL_MIND).innerHTML = character.mindValue;
    getItemById(LABEL_STRENGTH).innerHTML = character.strengthValue;
    getItemById(LABEL_AGILITY).innerHTML = character.agilityValue;
    getItemById(LABEL_WILL).innerHTML = character.willValue;
}

function saveName(name) {
    character.name = name;
}

function loadAttributes() {
    getItemById(HEAD_VALUE).innerHTML = character.headValue;
    checkIfBtnDisable(HEAD_VALUE);
    getItemById(SPIRIT_VALUE).innerHTML = character.spiritValue;
    checkIfBtnDisable(SPIRIT_VALUE);
    getItemById(HEART_VALUE).innerHTML = character.heartValue;
    checkIfBtnDisable(HEART_VALUE);
    getItemById(RIGHT_ARM_VALUE).innerHTML = character.rightArmValue;
    checkIfBtnDisable(RIGHT_ARM_VALUE);
    getItemById(LEFT_ARM_VALUE).innerHTML = character.leftArmValue;
    checkIfBtnDisable(LEFT_ARM_VALUE);
    getItemById(RIGHT_LEG_VALUE).innerHTML = character.rightLegValue;
    checkIfBtnDisable(RIGHT_LEG_VALUE);
    getItemById(LEFT_LEG_VALUE).innerHTML = character.leftLegValue;
    checkIfBtnDisable(LEFT_LEG_VALUE);
    getItemById(LABEL_ENDURANCE).innerHTML = Math.ceil(character.enduranceValue);
}

function calculateStats() {
    let enduranceValue = 0;

    enduranceValue += character.spiritValue = parseInt(getItemById(SPIRIT_VALUE).innerHTML);
    enduranceValue += character.heartValue = parseInt(getItemById(HEART_VALUE).innerHTML);
    character.willValue = character.spiritValue + character.heartValue

    character.headValue = parseInt(getItemById(HEAD_VALUE).innerHTML);
    enduranceValue += Math.ceil(.5 * character.headValue);
    character.mindValue = character.headValue;

    character.rightArmValue = parseInt(getItemById(RIGHT_ARM_VALUE).innerHTML);
    enduranceValue += .5 * character.rightArmValue;
    character.leftArmValue = parseInt(getItemById(LEFT_ARM_VALUE).innerHTML);
    enduranceValue += .5 * character.leftArmValue;
    character.strengthValue = character.rightArmValue + character.leftArmValue;

    character.rightLegValue = parseInt(getItemById(RIGHT_LEG_VALUE).innerHTML);
    enduranceValue += .5 * character.rightLegValue;
    character.leftLegValue = parseInt(getItemById(LEFT_LEG_VALUE).innerHTML);
    enduranceValue += .5 * character.leftLegValue;
    character.agilityValue = character.rightLegValue + character.leftLegValue;

    character.enduranceValue = Math.floor(enduranceValue);
    getItemById(LABEL_ENDURANCE).innerHTML = Math.floor(enduranceValue);
}

//////////////////////////////////////
// FUNCTIONALITY FUNCTIONS
//////////////////////////////////////

function checkIfBtnDisable(id) {
    let lblValue = parseInt(getItemById(id).innerHTML);

    if (lblValue <= 0) {
        getItemById(BTN_DECREASE + id).disabled = true;
        return;
    }
    getItemById(BTN_DECREASE + id).disabled = false;
}

function increaseInput(label) {
    let lblValue = parseInt(getItemById(label).innerHTML);
    getItemById(label).innerHTML = lblValue + 1;
    checkIfBtnDisable(label);
    calculateStats();
    loadStats();
}

function decreaseInput(label) {
    let lblValue = parseInt(getItemById(label).innerHTML);
    getItemById(label).innerHTML = lblValue - 1;
    checkIfBtnDisable(label);
    calculateStats();
    loadStats();
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function downloadCharacter() {
    download("statSheet.js", "let initCharacter = " + JSON.stringify(character, null, "\t"));
}

function loadTitles() {
    getItemById(LABEL_MIND).title = "Head: (" + character.headValue + ")";
    getItemById(LABEL_STRENGTH).title = "R.Arm: (" + character.rightArmValue + ") + L.Arm; (" + character.leftArmValue + ")";
    getItemById(LABEL_AGILITY).title = "R.Leg: (" + character.rightLegValue + ") + L.Leg; (" + character.leftLegValue + ")";
    getItemById(LABEL_WILL).title = "Spirit: (" + character.spiritValue + ") + Heart: (" + character.heartValue + ")";

    getItemById(LABEL_ENDURANCE).title = "Spirit: (" + character.spiritValue + ") + Heart: (" + character.heartValue + ") + ( Mind: (" + character.mindValue + "*) + Strength: (" + character.strengthValue + ") + Agility: (" + character.agilityValue + ") ) /2 *Mind is rounded up";
}