const configs = {};

if (process.env.NODE_ENV === "local") {
  configs.SEMPRE_URL = "http://localhost:8400";
} else {
  configs.SEMPRE_URL = "http://jonsson.stanford.edu:8401";
}


configs.structsServer = "http://jonsson.stanford.edu:8410";
configs.loggerServer = "http://jonsson.stanford.edu:8410";
configs.loggerOn = false;

configs.debugMode = false;

configs.defaultSessionId = "deadbeef";

configs.emptyStruct = [];
configs.defaultStruct = configs.emptyStruct;

configs.mainCanvas = "main_canvas";
configs.targetCanvas = "target_canvas";
configs.consoleElemId = "console";
configs.historyElemId = "command_history";
configs.statusElemId = "status";
configs.currentCmdElemId = "currentcmd";
configs.possStepsElemId = "possible_steps";
configs.maxStepsElemId = "max_steps";
configs.currStepsElemId = "curr_steps";
configs.reactionElemId = "reaction";
configs.defineElemId = "definetextarea";
configs.defineButton = "define_phrase_button";
configs.definePromptElemId = "show_define_status";
configs.randomElemId = "random";
configs.referenceElemId = "reference";

configs.elems = {
  helpMe: "helpme",
  keyboard: "keyboard_shortcuts",
  currSteps: "curr_steps",
  consoleGroup: "console_group",
  defineInterface: "define_interface",
  rephraseInterface: "rephrase_interface",
  console: "console",
  defineConsole: "definetextarea",
  defineStatus: "define_status",
  rephraseStatus: "rephrase_status",
  rephraseHeader: "rephrase_header",
  defineHeader: "define_header",
  definePrompt: "define_prompt",
  rephrasePrompt: "rephrase_prompt",
  structures: "structures",
  submitInterface: "submit_interface",
  submitConsole: "submittextarea",
};

configs.buttons = {
  do: "dobutton",
  accept: "flyingaccept",
  prev: "prevbutton",
  next: "nextbutton",
  clear: "clearbutton",
  paraphrase: "paraphrase",
  define: "define_phrase_button",
  define_instead: "define_instead",
  rephrase_instead: "rephrase_instead",
  skip: "skip_button",
  reset: "reset_all_progress",
  toggleDefine: "toggledefine",
  putBack: "putbackbutton",
  tryDefine: "try_define",
  rotateIcons: "rotate-icons",
  closeDefine: "close_define",
  closeRephrase: "close_rephrase",
  submitButton: "submitbutton",
  submitStructure: "confirm_submit_structure",
  closeSubmit: "close_submit",
};

configs.difficulty = 3;
configs.defaultSkips = 2;

// configs.targets = [
//   [7, "[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[0,0,0,0,0,2],[9,9,9,9,9,2],[9,9,9,9,9,2],[0,0,0,0,0,2,2,2,2,2,2],[],[],[],[],[9,9,9,9,9,2],[9,9,9,9,9,2],[9,9,9,9,9,2],[9,9,9,9,9,2,2,2,2,2,2],[],[],[],[],[9,9,9,9,9,2],[9,9,9,9,9,2],[9,9,9,9,9,2],[9,9,9,9,9,2,2,2,2,2,2],[],[],[],[],[0,0,0,0,0,2],[9,9,9,9,9,2],[9,9,9,9,9,2],[0,0,0,0,0,2,2,2,2,2,2],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]"],
//   [5, "[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[0,0],[9,0,0],[9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[2],[9],[9,9,2],[9,9,9],[9,9,9,2],[9,9,9],[9,9,9,2],[9,9,9],[2],[9],[9,9,2],[9,9,9],[9,9,9,2],[9,9,9],[9,9,9,2],[9,9,9],[0,0],[9,0,0],[9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[9,9,9,0,0],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]"],
//   [5, "[[],[],[],[],[],[],[],[],[],[],[],[0,0,0,2],[],[],[],[],[],[],[],[9,9,9,2,6],[],[],[],[],[],[],[],[9,9,9,2,6,6,10],[],[],[],[],[],[],[],[9,9,9,2,6],[],[],[],[],[],[],[],[0,0,0,2],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]"],
//   [3, "[[2],[],[],[4],[],[],[1],[],[2,2],[],[],[4,4],[],[],[1,1],[],[2,2,2],[],[],[4,4,4],[],[],[1,1,1],[],[2,2,2,2],[],[],[4,4,4,4],[],[],[1,1,1,1],[],[2,2,2,2],[],[],[4,4,4,4],[],[],[1,1,1,1],[],[2,2,2],[],[],[4,4,4],[],[],[1,1,1],[],[2,2],[],[],[4,4],[],[],[1,1],[],[2],[],[],[4],[],[],[1],[]]"],
//   [4, "[[3],[2],[0],[],[],[0],[2],[3],[2],[3],[2],[0],[0],[2],[3],[2],[0],[2],[3],[2],[2],[3],[2],[0],[],[0],[2],[3],[3],[2],[0],[],[],[0],[2],[3],[3],[2],[0],[],[0],[2],[3],[2],[2],[3],[2],[0],[2],[3],[2],[0],[0],[2],[3],[2],[3],[2],[0],[],[],[0],[2],[3]]"],
//   [5, "[[],[],[],[4,1,3,3,3,3,3,3,3],[],[],[],[],[],[],[],[2,2,0,3,3,3,3,3,3],[],[],[],[],[],[],[],[4,4,4,1,3,3,3,3,3],[],[],[],[],[],[],[],[2,2,2,2,0,3,3,3,3],[],[],[],[],[],[],[],[4,4,4,4,4,1,3,3,3],[],[],[],[],[],[],[],[2,2,2,2,2,2,0,3,3],[],[],[],[],[],[],[],[4,4,4,4,4,4,4,1,3],[],[],[],[],[],[],[],[2,2,2,2,2,2,2,2,0],[],[],[],[]]"],
//   [3, "[[0,0,0,0],[],[],[],[],[],[],[0,0,0,0],[1,1,1,1,4,4],[],[],[],[],[],[],[1,1,1,1,4,4],[0,0,0,0],[],[],[],[],[],[],[0,0,0,0],[],[],[],[],[],[],[],[],[],[],[],[],[0,0,0,0],[],[],[],[],[],[],[],[1,1,1,1,4,4],[],[],[],[],[],[],[],[0,0,0,0],[],[],[],[],[],[],[],[],[],[],[]]"],
//   [4, "[[],[],[],[1],[1],[],[],[],[4],[4],[4],[4,1],[4,1],[4],[4],[4],[4,2],[4,2],[4,2],[4,2,1],[4,2,1],[4,2],[4,2],[4,2],[4,2,0],[4,2,0],[4,2,0],[4,2,0,1],[4,2,0,1],[4,2,0],[4,2,0],[4,2,0],[4,2,0],[4,2,0],[4,2,0],[4,2,0,1],[4,2,0,1],[4,2,0],[4,2,0],[4,2,0],[4,2],[4,2],[4,2],[4,2,1],[4,2,1],[4,2],[4,2],[4,2],[4],[4],[4],[4,1],[4,1],[4],[4],[4],[],[],[],[1],[1],[],[],[]]"],
//   [4, "[[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2],[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2],[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2],[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2],[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2],[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2],[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2],[2],[2,0],[2,0,4],[2,0,4,3],[2,0,4,3],[2,0,4],[2,0],[2]]"],
//   [2, "[[0],[0],[0],[2,0],[2,2,0],[2,2,2,0],[2,2,2,2,0],[2,2,2,2,2,0],[],[],[],[2],[2,2],[2,2,2],[2,2,2,2],[2,2,2,2,2],[0],[0],[0],[2,0],[2,2,0],[2,2,2,0],[2,2,2,2,0],[2,2,2,2,2,0],[],[],[],[2],[2,2],[2,2,2],[2,2,2,2],[2,2,2,2,2],[0],[0],[0],[2,0],[2,2,0],[2,2,2,0],[2,2,2,2,0],[2,2,2,2,2,0],[],[],[],[2],[2,2],[2,2,2],[2,2,2,2],[2,2,2,2,2],[0],[0],[0],[2,0],[2,2,0],[2,2,2,0],[2,2,2,2,0],[2,2,2,2,2,0],[],[],[],[2],[2,2],[2,2,2],[2,2,2,2],[2,2,2,2,2]]"],
//   [2, "[[2,2,2],[],[],[],[2,2,2],[],[],[],[2,2,2,0],[],[],[],[2,2,2,0],[],[],[],[2,2,2],[],[],[],[2,2,2],[],[],[],[2,2,2,0],[],[],[],[2,2,2,0],[],[],[],[2,2,2],[],[],[],[2,2,2],[],[],[],[2,2,2,0],[],[],[],[2,2,2,0],[],[],[],[2,2,2],[],[],[],[2,2,2],[],[],[],[2,2,2,0],[],[],[],[2,2,2,0],[],[],[]]"],
//   [3, "[[4],[4],[4],[4],[4],[4],[4],[4],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[2],[0],[4],[4],[4],[4],[4],[4],[4],[4]]"],
//   [5, "[[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[],[],[],[],[],[],[],[],[1,1,1],[1,1,1,0],[1,1,1],[1,1,1,0],[1,1,1],[1,1,1,0],[1,1,1],[1,1,1,0],[],[],[],[],[],[],[],[],[4,4,4],[4,4,4,0],[4,4,4],[4,4,4,0],[4,4,4],[4,4,4,0],[4,4,4],[4,4,4,0],[],[],[],[],[],[],[],[],[3,3,3],[3,3,3,0],[3,3,3],[3,3,3,0],[3,3,3],[3,3,3,0],[3,3,3],[3,3,3,0],[],[],[],[],[],[],[],[]]"],
//   [5, "[[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[4,4,4],[1],[1],[1],[1],[1],[1],[1,3],[4,4,4],[1],[1],[1],[1],[1],[1],[1,3],[4,4,4],[1],[1],[1],[1],[1],[1],[1,3],[4,4,4],[1],[1],[1],[1],[1],[1],[1,3],[4,4,4],[1],[1],[1],[1],[1],[1],[1,3],[4,4,4],[1],[1],[1],[1],[1],[1],[1,3],[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0],[2,2,2],[2,2,2,0]]"],
//   [4, "[[4],[4],[4],[4],[4],[4],[4],[4],[4],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4],[4],[4,3],[4,3,2],[4,3,2],[4,3,2],[4,3,2],[4,3],[4],[4],[4,3],[4,3,2],[4,3,2,0],[4,3,2,0],[4,3,2],[4,3],[4],[4],[4,3],[4,3,2],[4,3,2,0],[4,3,2,0],[4,3,2],[4,3],[4],[4],[4,3],[4,3,2],[4,3,2],[4,3,2],[4,3,2],[4,3],[4],[4],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4],[4],[4],[4],[4],[4],[4],[4],[4]]"],
//    [4, "[[1,1],[1,1],[],[],[],[],[1,1],[1,1],[1,1],[1,1],[2,2,4],[2,2,4,0],[2,2,4,0],[2,2,4],[1,1],[1,1],[],[],[2,2,4],[2,2,4,0],[2,2,4,0],[2,2,4],[],[],[],[],[2,2,4],[2,2,4,0],[2,2,4,0],[2,2,4],[],[],[],[],[2,2,4],[2,2,4,0],[2,2,4,0],[2,2,4],[],[],[],[],[2,2,4],[2,2,4,0],[2,2,4,0],[2,2,4],[],[],[1,1],[1,1],[2,2,4],[2,2,4,0],[2,2,4,0],[2,2,4],[1,1],[1,1],[1,1],[1,1],[],[],[],[],[1,1],[1,1]]"],
//   [2, "[[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2],[2,2,2,2],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[4],[4],[4],[4],[4],[4],[4],[4],[3],[3],[3],[3],[3],[3],[3],[3],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]"],
//   [4, "[[2,2],[2,2],[],[],[],[],[1,1],[1,1],[2,2],[2,2],[],[],[],[],[1,1],[1,1],[],[],[2,2],[2,2],[1,1],[1,1],[],[],[],[],[2,2],[2,2],[1,1],[1,1],[],[],[],[],[1,1],[1,1],[2,2],[2,2],[],[],[],[],[1,1],[1,1],[2,2],[2,2],[],[],[1,1],[1,1],[],[],[],[],[2,2],[2,2],[1,1],[1,1],[],[],[],[],[2,2],[2,2]]"],
//     [4, "[[2],[2],[2],[2],[2],[2],[2],[2],[2],[3],[3],[3],[3],[3],[3],[2],[2],[3],[0],[0],[0],[0],[3],[2],[2],[3],[0],[4],[4],[0],[3],[2],[2],[3],[0],[4],[4],[0],[3],[2],[2],[3],[0],[0],[0],[0],[3],[2],[2],[3],[3],[3],[3],[3],[3],[2],[2],[2],[2],[2],[2],[2],[2],[2]]"],
//   [6, "[[0],[4],[],[],[],[],[],[],[3],[0,2],[4],[],[],[],[0,2],[],[],[3],[0],[4],[],[],[],[],[],[],[3],[0,2],[4],[],[],[],[],[],[],[3],[0],[4],[],[],[],[],[],[],[3],[0,2],[4],[],[],[0,2],[],[],[],[3],[0],[4],[],[],[],[],[],[],[3],[0]]"],
//   [6, "[[1,2],[1,2],[1,2],[1,2],[0,2],[],[],[4,2],[4,2],[],[],[],[0,2],[],[],[4,2],[4,2],[],[],[],[0,2],[],[],[4,2],[4,2],[],[],[],[0,2],[],[],[4,2],[4,2],[],[],[],[0,2],[],[],[4,2],[4,2],[],[],[],[0,2],[],[],[4,2],[4,2],[],[],[],[0,2],[],[],[4,2],[4,2],[],[],[],[3,2],[3,2],[3,2],[4,2]]"],
//   [8, "[[1,1,1],[],[],[],[],[],[],[1,1,1],[],[2],[],[],[],[],[2],[],[],[],[2],[],[],[2],[],[],[],[],[],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[],[],[],[],[],[],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[],[],[],[],[],[2],[],[],[2],[],[],[],[2],[],[],[],[],[2],[],[1,1,1],[],[],[],[],[],[],[1,1,1]]"],
// ];

/* eslint-disable */
configs.targets = [
  [10, [{ x: 0, y: 0, z: 0, color: "Red" }]],
  [1, [{"x":1,"y":1,"z":0,"color":"Red","names":[]},{"x":2,"y":2,"z":1,"color":"Orange","names":[]},{"x":2,"y":2,"z":0,"color":"Orange","names":[]},{"x":3,"y":3,"z":0,"color":"Yellow","names":[]},{"x":1,"y":3,"z":0,"color":"Green","names":[]},{"x":3,"y":1,"z":0,"color":"Blue","names":[]}]],
];

configs.store = sessionStorage;

/* http://www.colourlovers.com/palette/1473/Ocean_Five */
// configs.colorMap = {
//   Red: [204, 51, 63], /* Red */
//   Orange: [235, 104, 65], /* Orange */
//   Yellow: [237, 201, 81], /* Yellow */
//   Cyan: [0, 160, 176], /* Cyan */
//   Brown: [106, 74, 60], /* Brown */
// };

/* http://colrd.com/palette/23813/?download=css */
configs.colorMap = {
  Red: [209, 0, 0],
  Orange: [255, 102, 34],
  Yellow: [255, 218, 33],
  Green: [51, 221, 0],
  Blue: [17, 51, 204],
  Black: [10, 10, 10],
  White: [255, 255, 240],
  Pink: [255, 20, 147],
  Brown: [139, 69, 19],
  Anchor: [0, 160, 176],
  Gray: [144, 144, 144],
};

export default configs;
