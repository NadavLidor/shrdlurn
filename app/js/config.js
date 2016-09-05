const configs = {};

if (process.env.NODE_ENV === "local") {
  configs.SEMPRE_URL = "http://localhost:8400";
} else {
  configs.SEMPRE_URL = "http://jonsson.stanford.edu:8407";
}


configs.structsServer = "http://jonsson.stanford.edu:8406";
configs.loggerServer = "http://jonsson.stanford.edu:8406";
configs.loggerOn = false;

configs.debugMode = false;

configs.defaultSessionId = "deadbeef";

configs.emptyStruct = [];
configs.defaultStruct = configs.emptyStruct;

//const temp = [["gym with nihil","","2015-11-10T19:00","2015-11-10T20:30",[false,false,false,false,false,false,false,false,false],[]],["project status","conference room","2015-11-12T09:00","2015-11-12T11:30",[false,false,false,false,false,false,false,false,false],[]],["lunch with sida","nexus","2015-11-05T12:00","2015-11-05T13:00",[false,false,false,false,false,false,false,false,false],[]],["meeting with will","office","2015-11-10T10:00","2015-11-10T11:00",[false,false,false,false,false,false,false,false,false],[]],["gym","main street","2015-11-05T19:30","2015-11-05T20:30",[false,false,false,false,false,false,false,false,false],[]],["burnch with parents","parents home","2015-11-14T10:30","2015-11-14T12:30",[false,false,false,false,false,false,false,false,false],[]],["lunch with new hire","","2015-11-12T12:30","2015-11-12T13:30",[false,false,false,false,false,false,false,false,false],[]],["lunch with jack","the usual","2015-11-04T12:00","2015-11-04T13:00",[false,false,false,false,false,false,false,false,false],[]],["group lunch","room 214","2015-11-06T12:00","2015-11-06T13:00",[false,false,false,false,false,false,false,false,false],[]],["team lunch","room 300","2015-11-09T12:00","2015-11-09T13:00",[false,false,false,false,false,false,false,false,false],[]],["basketball","","2015-11-08T18:00","2015-11-08T19:30",[false,false,false,false,false,false,false,false,false],[]],["ideas dinner","tressider","2015-11-12T17:30","2015-11-12T19:00",[false,false,false,false,false,false,false,false,false],[]],["take matthew to dentist","","2015-11-11T09:00","2015-11-11T11:00",[false,false,false,false,false,false,false,false,false],[]],["dinner with jan","home","2015-11-19T18:30","2015-11-19T19:30",[false,false,false,false,false,false,false,false,false],[]],["family dinner","home","2015-11-11T18:00","2015-11-11T19:00",[false,false,false,false,false,false,false,false,false],[]],["work on project","","2015-11-05T14:00","2015-11-05T16:30",[false,false,false,false,false,false,false,false,false],[]],["hike","tbd","2015-11-08T11:30","2015-11-08T15:30",[false,false,false,false,false,false,false,false,false],[]],["dinner with friends","main street","2015-11-04T18:30","2015-11-04T20:00",[false,false,false,false,false,false,false,false,false],[]],["dinner with family","italian cafe","2015-11-06T18:00","2015-11-06T20:30",[false,false,false,false,false,false,false,false,false],[]],["project sync","","2015-11-09T09:30","2015-11-09T11:00",[false,false,false,false,false,false,false,false,false],[]],["lunch with anthony","bytes maybe","2015-11-20T12:00","2015-11-20T13:00",[false,false,false,false,false,false,false,false,false],[]],["meeting chris","chris office","2015-11-16T11:30","2015-11-16T12:30",[false,false,false,false,false,false,false,false,false],[]],["hiking","park","2015-11-21T12:30","2015-11-21T16:30",[false,false,false,false,false,false,false,false,false],[]],["wash car","","2015-11-15T15:00","2015-11-15T15:30",[false,false,false,false,false,false,false,false,false],[]],["meeting bobby!","","2015-11-14T16:00","2015-11-14T17:30",[false,false,false,false,false,false,false,false,false],[]],["soccer","","2015-11-15T18:30","2015-11-15T20:30",[false,false,false,false,false,false,false,false,false],[]],["new team lunch","","2015-11-16T12:00","2015-11-16T13:30",[false,false,false,false,false,false,false,false,false],[]],["brunch","our place","2015-11-07T09:30","2015-11-07T12:00",[false,false,false,false,false,false,false,false,false],[]],["dinner with charlie","italian cafe","2015-11-17T18:00","2015-11-17T19:00",[false,false,false,false,false,false,false,false,false],[]],["meeting with sam","","2015-11-04T14:30","2015-11-04T16:00",[false,false,false,false,false,false,false,false,false],[]],["morning sync","office","2015-11-05T10:00","2015-11-05T11:00",[false,false,false,false,false,false,false,false,false],[]],["park with kids","","2015-11-07T13:00","2015-11-07T15:00",[false,false,false,false,false,false,false,false,false],[]],["work with katie","office","2015-11-13T15:00","2015-11-13T16:30",[false,false,false,false,false,false,false,false,false],[]],["dinner with dan","tbd","2015-11-09T18:00","2015-11-09T19:00",[false,false,false,false,false,false,false,false,false],[]],["meeting sam","office","2015-11-18T11:30","2015-11-18T13:45",[false,false,false,false,false,false,false,false,false],[]],["kids","home","2015-11-22T11:00","2015-11-22T15:30",[false,false,false,false,false,false,false,false,false],[]],["meeting with chris","chris office","2015-11-06T11:30","2015-11-06T12:00",[false,false,false,false,false,false,false,false,false],[]],["team lunch","","2015-11-13T12:00","2015-11-13T13:00",[false,false,false,false,false,false,false,false,false],[]],["pool with kids","","2015-11-15T11:30","2015-11-15T14:00",[false,false,false,false,false,false,false,false,false],[]],["anniversary","tbd","2015-11-13T18:30","2015-11-13T20:00",[false,false,false,false,false,false,false,false,false],[]]];
// const temp = [["gym with nihil","","2015-11-10T19:00","2015-11-10T20:30",[]],["project status","conference room","2015-11-12T09:00","2015-11-12T11:30",[]],["lunch with sida","nexus","2015-11-05T12:00","2015-11-05T13:00",[]],["burnch with parents","parents home","2015-11-14T10:30","2015-11-14T12:30",[]],["team lunch","room 300","2015-11-09T12:00","2015-11-09T13:00",[]],["basketball","","2015-11-08T18:00","2015-11-08T19:30",[]],["ideas dinner","tressider","2015-11-12T17:30","2015-11-12T19:00",[]],["take matthew to dentist","","2015-11-11T09:00","2015-11-11T11:00",[]],["dinner with jan","home","2015-11-19T18:30","2015-11-19T19:30",[]],["family dinner","home","2015-11-11T18:00","2015-11-11T19:00",[]],["work on project","","2015-11-05T14:00","2015-11-05T16:30",[]],["dinner with friends","main street","2015-11-04T18:30","2015-11-04T20:00",[]],["dinner with family","italian cafe","2015-11-06T18:00","2015-11-06T20:30",[]],["project sync","","2015-11-09T09:30","2015-11-09T11:00",[]],["lunch with anthony","bytes maybe","2015-11-20T12:00","2015-11-20T13:00",[]],["meeting chris","chris office","2015-11-16T11:30","2015-11-16T12:30",[]],["hiking","park","2015-11-21T12:30","2015-11-21T16:30",[]],["wash car","","2015-11-15T15:00","2015-11-15T15:30",[]],["brunch","our place","2015-11-07T09:30","2015-11-07T12:00",[]],["dinner with charlie","italian cafe","2015-11-17T18:00","2015-11-17T19:00",[]],["work with katie","office","2015-11-13T15:00","2015-11-13T16:30",[]],["dinner with dan","tbd","2015-11-09T18:00","2015-11-09T19:00",[]],["meeting sam","office","2015-11-18T11:30","2015-11-18T13:45",[]],["kids","home","2015-11-22T11:00","2015-11-22T15:30",[]],["team lunch","","2015-11-13T12:00","2015-11-13T13:00",[]],["pool with kids","","2015-11-15T11:30","2015-11-15T14:00",[]],["anniversary","tbd","2015-11-13T18:30","2015-11-13T20:00",[]]];
// const only_this_week = [["gym with nihil","","2015-11-10T19:00","2015-11-10T20:30",[]],["project status","conference room","2015-11-12T09:00","2015-11-12T11:30",[]],["burnch with parents","parents home","2015-11-14T10:30","2015-11-14T12:30",[]],["team lunch","room 300","2015-11-09T12:00","2015-11-09T13:00",[]],["ideas dinner","tressider","2015-11-12T17:30","2015-11-12T19:00",[]],["take matthew to dentist","","2015-11-11T09:00","2015-11-11T11:00",[]],["family dinner","home","2015-11-11T18:00","2015-11-11T19:00",[]],["project sync","","2015-11-09T09:30","2015-11-09T11:00",[]],["wash car","","2015-11-15T15:00","2015-11-15T15:30",[]],["work with katie","office","2015-11-13T15:00","2015-11-13T16:30",[]],["dinner with dan","tbd","2015-11-09T18:00","2015-11-09T19:00",[]],["team lunch","","2015-11-13T12:00","2015-11-13T13:00",[]],["pool with kids","","2015-11-15T11:30","2015-11-15T14:00",[]],["anniversary","tbd","2015-11-13T18:30","2015-11-13T20:00",[]]];
const only_this_week_unfixedtime = [["project sync","","2016-09-05T09:30","2016-09-05T11:00",[]],["team lunch","room 300","2016-09-05T12:00","2016-09-05T13:00",[]],["dinner with dan","tbd","2016-09-05T18:00","2016-09-05T19:00",[]],["meeting with will","office","2016-09-06T10:00","2016-09-06T11:00",[]],["gym with nihil","","2016-09-06T19:00","2016-09-06T20:30",[]],["take matthew to dentist","","2016-09-07T09:00","2016-09-07T11:00",[]],["family dinner","home","2016-09-07T18:00","2016-09-07T19:00",[]],["project status","conference room","2016-09-08T09:00","2016-09-08T11:30",[]],["lunch with new hire","","2016-09-08T12:30","2016-09-08T13:30",[]],["ideas dinner","tressider","2016-09-08T17:30","2016-09-08T19:00",[]],["team lunch","","2016-09-09T12:00","2016-09-09T13:00",[]],["work with katie","office","2016-09-09T15:00","2016-09-09T16:30",[]],["anniversary","tbd","2016-09-09T18:30","2016-09-09T20:00",[]],["burnch with parents","parents home","2016-09-10T10:30","2016-09-10T12:30",[]],["meeting bobby!","","2016-09-10T16:00","2016-09-10T17:30",[]],["pool with kids","","2016-09-11T11:30","2016-09-11T14:00",[]],["wash car","","2016-09-11T15:00","2016-09-11T15:30",[]],["soccer","","2016-09-11T18:30","2016-09-11T20:30",[]]];
configs.defaultStruct = only_this_week_unfixedtime.map((c, idx) => (
      {
        id: idx,
        title: c[0],
        location: c[1],
        start: moment.utc(c[2]),
        end: moment.utc(c[3]),
        // repeats: c[4], // CHANGE TO \5!!!
        names: c[4],
      }
    ));

configs.mainCanvas = "main_canvas";
configs.targetCanvas = "target_canvas";
configs.points = "points";
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
  welcome: "welcome",
};

configs.buttons = {
  edit_calendar: "edit_calendar",
  do: "dobutton",
  rephrase: "rephrase",
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
  start: "start_button",
  restartTutorial: "restart_tutorial",
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
