import configs from "./config";
import { getHistoryElems, emojione, contains } from "./util";
/* eslint-disable new-cap */

export default class Setting {
  constructor() {
    // this.renderCanvas(configs.defaultStruct, []);
    this.renderCanvas(configs.defaultStruct);
  }

  renderTarget(state) {
    // pass
  }

  renderCanvas(state) {
    this.renderCalendar(state);
  }

  // renderCanvas(previousState, newState) {
  //   console.log("here");
  //   this.renderCalendar(previousState, newState);

  //   // this.renderGrid(this.iso);
  //   // this.renderBlocks(this.iso, state);
  // }



  renderUserCanvas(state, elemId) {
    const iso = new Isomer(document.getElementById(elemId));
    this.renderGrid(iso, 0.6, -1);
    this.renderBlocks(iso, state, 0.6, -1);
  }

  renderGrid(iso, scalingFactor = 1, translateFactor = 0) {
    iso.canvas.clear();
    const translateBy = translateFactor * this.basicUnit * scalingFactor;
    const color = new Color(150, 150, 150);
    const unit = this.basicUnit * scalingFactor;
    for (let x = 0; x < this.width + 1; x++) {
      iso.add(new Path([
      	new Point(x*unit, 0, 0),
      	new Point(x*unit, this.width*unit, 0),
      	new Point(x*unit, 0, 0)
      ])
      .rotateZ(this.centerPoint, this.rotation)
      .translate(translateBy, -translateBy, -4.5 * translateBy),
      color
      );

      const y = x;
      iso.add(new Path([
      	new Point(0, y*unit, 0),
      	new Point(this.width*unit, y*unit, 0),
      	new Point(0, y*unit, 0)
      ])
      .rotateZ(this.centerPoint, this.rotation)
      .translate(translateBy, -translateBy, -4.5 * translateBy),
      color
      );
    }

  }

  renderBoard(iso, scalingFactor = 1, translateFactor = 0) {
    iso.canvas.clear();
    const translateBy = translateFactor * this.basicUnit * scalingFactor;
    const color = new Color(144, 144, 144);
    for (let x = this.width - 1; x >= 0; x--) {
      for (let y = this.width - 1; y >= 0; y--) {
        iso.add(
          Shape.Prism(
            Point((x + (this.borderWidth * x)) * scalingFactor,
                  (y + (this.borderWidth * y)) * scalingFactor,
                  0
                 ),
            this.basicUnit * scalingFactor,
            this.basicUnit * scalingFactor,
            this.baseHeight * scalingFactor
          )
          .rotateZ(this.centerPoint, this.rotation)
          .translate(translateBy, -translateBy, -4.5 * translateBy),
          color
        );
      }
    }
  }

  // renderCalendar(previousState, newState) {
  renderCalendar(state) {

    // console.log("setting state");
    // console.log(state);

    // remove all events
    $('#mycalendar').fullCalendar('removeEvents');

    // add new events
    $('#mycalendar').fullCalendar('addEventSource', state.map((e) => (
      {
        id: e.id,
        title: e.title,
        start: e.start,
        end: e.end,
        location : e.location,
        // repeats : e.repeats,
        names : e.names,
        // borderColor : (contains.call(e.names, "S") && !contains.call(e.names, "N") ? "red" : ""),
        color : (contains.call(e.names, "N") ? "#00a0b0" : ""),
        // dow: [2],
      }
    )));

    $('#mycalendar').fullCalendar( 'render' )

    // // add new events
    // $('#mycalendar').fullCalendar('addEventSource', previousState.map((e) => (
    //   {
    //     id: e.id,
    //     title: e.title,
    //     start: e.start,
    //     end: e.end,
    //     location : e.location,
    //     repeats : e.repeats,
    //     names : e.names,
    //     borderColor : (contains.call(e.names, "S") ? "#000066" : ""),
    //     // dow: [2],
    //   }
    // )))

    // $('#mycalendar').fullCalendar('addEventSource', newState.map((e) => (
    //   {
    //     id: e.id,
    //     title: e.title,
    //     start: e.start,
    //     end: e.end,
    //     location : e.location,
    //     repeats : e.repeats,
    //     names : e.names,
    //     borderColor : (contains.call(e.names, "S") ? "#000066" : ""),
    //     backgroundColor: "rgba(58,135,173,0.5)",
    //     // dow: [2],
    //   }
    // )))

    // $('#mycalendar').fullCalendar( 'rerenderEvents' );

  }

  renderBlocks(iso, state, scalingFactor = 1, translateFactor = 0) {
    const blocks = this.sortBlocks(state.map((b) => {
      let x = b.x;
      let y = b.y;

      switch (this.rotational) {
        case -1:
          x = b.x;
          y = b.y;
          break;
        case -2:
          x = b.y;
          y = this.width - 1 - b.x;
          break;
        case 1:
          x = this.width - 1 - b.y;
          y = b.x;
          break;
        case 2:
          x = this.width - 1 - b.x;
          y = this.width - 1 - b.y;
          break;
        default:
      }

      return { ...b, x: x, y: y };
    }));

    const selected = blocks.filter((b) => b.names && b.names.includes("S"));
    for (const block of blocks) {
      const color = configs.colorMap[block.color];
      let blockColor = new Color();
      if (block.names && block.names.includes("_new")) {
        blockColor = new Color(color[0], color[1], color[2], 0.25);
      } else {
        blockColor = new Color(color[0], color[1], color[2], 0.88);
        if (selected.length > 0 && selected.includes(block)) {
	         blockColor = new Color(color[0], color[1], color[2], 0.25);
        }
      }
      if (block.color === "Anchor") {
        iso.add(this.makeBlock(block.x, block.y, -0.1, scalingFactor, translateFactor, 0.1), blockColor);
      } else {
        iso.add(this.makeBlock(block.x, block.y, block.z, scalingFactor, translateFactor), blockColor);
      }
    }
  }

  darken(color) {
    return new Color(this.darkenValue(color.r), this.darkenValue(color.g), this.darkenValue(color.b), color.a);
  }

  darkenValue(value, factor = 0.5) {
    const graystandard = 128;
    return factor*graystandard + (1-factor)*value;
  }

  makeBlock(x, y, z, scalingFactor = 1, translateFactor = 0, basicUnit = this.basicUnit) {
    const translateBy = translateFactor * this.basicUnit * scalingFactor;

    return Shape.Prism(
      Point((x + (x * this.borderWidth)) * scalingFactor,
            (y + (y * this.borderWidth)) * scalingFactor,
            (z + this.baseHeight + (this.borderWidth * z)) * scalingFactor
           ),
      this.basicUnit * scalingFactor, this.basicUnit * scalingFactor, basicUnit * scalingFactor
    )
    .rotateZ(this.centerPoint, this.rotation)
    .translate(translateBy, -translateBy, -4.5 * translateBy);
  }

  sortBlocks(blocks) {
    return blocks.sort((a, b) => {
      if (a.z > b.z) {
        return 1;
      } else if (a.z < b.z) {
        return -1;
      }

      if (a.x > b.x) {
        return -1;
      } else if (a.x < b.x) {
        return 1;
      }

      if (a.y > b.y) {
        return -1;
      } else if (a.y < b.y) {
        return 1;
      }

      return 0;
    });
  }

  sortEvents(events) {
    return events.sort((a, b) => {
      if (a.start.isAfter(b.start)) {
        return 1;
      } else if (a.start.isBefore(b.start)) {
        return -1;
      }

      if (a.end.isAfter(b.end)) {
        return -1;
      } else if (a.end.isBefore(b.end)) {
        return 1;
      }

      if (a.title.length > b.title.length) {
        return -1;
      } else if (a.title.length < b.title.length) {
        return 1;
      }

      return 0;
    });
  }

  stateIncludes(state, obj) {
    for (const c of state) {
      if (c.x === obj.x &&
          c.y === obj.y &&
          c.z === obj.z &&
          c.color === obj.color) {
        return true;
      }
    }
    return false;
  }

  computeDiff(state, newState) {
    const difference = newState.filter(c => !this.stateIncludes(state, c));
    const intersection = newState.filter(c => this.stateIncludes(state, c));

    return difference.map((c) => (Object.assign({}, c, { names: [...c.names, "_new"] })))
      .concat(intersection);
  }

  equalityCheck(struct1, struct2) {
    if (struct1 === struct2) return true;
    if (struct1 == null || struct2 == null) return false;
    if (struct1.length != struct2.length) return false;
    const a = this.sortEvents(struct1);
    const b = this.sortEvents(struct2);
    for (let i = 0; i < a.length; ++i) {
      if (a[i].title !== b[i].title ||
          b[i].location !== b[i].location ||
          !b[i].start.isSame(b[i].start) ||
          !b[i].end.isSame(b[i].end)) {
        return false;
      }
    }
    return true;
  }

  status(msg, query = "", prob = 0) {
    const status = document.getElementById(configs.statusElemId);
    const currentcmd = document.getElementById(configs.currentCmdElemId);
    status.innerHTML = msg;

    if (query.length > 0) {
      const stateinfo = `<b>↵: ${query}</b>`;
      // TODO: if Answer: stateinfo = "<b>↵: {query} (#{NBestInd}/{NBestlen})</b>"
      currentcmd.innerHTML = stateinfo;
    } else {
      currentcmd.innerHTML = "<b>enter a command</b>";
    }

    this.updateReaction(prob);
  }

  updateReaction(prob) {
    const reaction = document.getElementById(configs.reactionElemId);
    if (prob === 0) {
      reaction.innerHTML = emojione(3);
    } else {
      let cc = prob;
      if (!cc) { cc = 0; }
      const cutoffs = [0.5, 0.1, 0.05, 0.01, 0.001, 0.00001, -1];
      reaction.innerHTML = emojione(cutoffs.findIndex((val) => cc >= val));
    }
  }

  renderHistory(history) {
    const historyElem = document.getElementById(configs.historyElemId);
    historyElem.innerHTML = "";

    for (let i = history.length - 1; i >= 0; i--) {
      const elem = document.createElement("div");
      elem.setAttribute("data-type", history[i].type);
      elem.setAttribute("data-stepN", history[i].stepN);
      if (history[i].type === "accept") {
        elem.innerHTML = `${history[i].stepN}. ${history[i].query}`;
      } else {
        elem.innerHTML = history[i].query;
      }
      historyElem.appendChild(elem);
    }
  }

  setSteps(poss, max) {
    const possSteps = document.querySelectorAll(`.${configs.possStepsElemId}`);
    for (const possStep of possSteps) {
      possStep.innerHTML = poss;
    }

    const maxSteps = document.querySelectorAll(`.${configs.maxStepsElemId}`);
    for (const maxStep of maxSteps) {
      maxStep.innerHTML = max;
    }
  }

  updateSteps(steps) {
    const currSteps = document.querySelectorAll(`.${configs.elems.currSteps}`);
    for (const currStep of currSteps) {
      currStep.innerHTML = steps;
    }
  }

  unmarkNewEvents(Game) {
    // remove New marks
    for (var i = 0; i < Game.currentState.length; i++) {
      if (Game.currentState[i].names.length > 0) {
        if (contains.call(Game.currentState[i].names, "S")) {
          Game.currentState[i].names = ["S"];
        } else {
          Game.currentState[i].names = [];
        }
      }
    }
  }

  cursorLoading() {
    $("body").css("cursor", "progress");
  }

  cursorNotLoading() {
    $("body").css("cursor", "default");
  }

  openDefineInterface(query, canAnswer, coverage, game) {
    
    if (query.length === 0) {
      this.status("nothing to define");
      return false;
    }

    game.currentStateEditable = true;
    $('#eventDialog')[0].classList.remove('hidden');
    game.responses = [];
    game.update();
    game.savedState = game.currentState.slice();

    document.getElementById("eventTitle").value = null;
    document.getElementById("eventLocation").value = null;
    document.getElementById("eventStart").value = null;
    document.getElementById("eventEnd").value = null;
    // document.getElementById("eventRepeats").value = null;
    document.getElementById("eventNames").value = null;

    const defineInterface = document.getElementById(configs.elems.defineInterface);
    defineInterface.classList.add("active");

    const defineStatus = document.getElementById(configs.elems.defineStatus);
    defineStatus.innerHTML = `Show SCHEDLURN what ${query} means.`;

    const toggleButton = document.getElementById(configs.buttons.toggleDefine);
    toggleButton.innerHTML = "Return";

    this.removePromptDefine();
    if (game.rephraseOption) {this.removePromptRephrase();}

    this.tryDefine(query, false, canAnswer, coverage);

    document.getElementById(configs.elems.defineConsole).focus();
    return true;
  }

  closeDefineInterface(game) {
    
    $('#eventDialog')[0].classList.add('hidden');

    const defineInterface = document.getElementById(configs.elems.defineInterface);
    defineInterface.classList.remove("active");

    const toggleButton = document.getElementById(configs.buttons.toggleDefine);
    toggleButton.innerHTML = "Define";

    document.querySelector('#define_interface .input-group').classList.remove("accepting");

    this.removePromptDefine();

    const consoleElem = document.getElementById(configs.elems.console);
    consoleElem.focus();

    game.resetResponses();
    document.getElementById(configs.elems.console).value = "";

    // revert changes to current state
    game.currentStateEditable = false;

    this.removeAccept();


  }

  openRephraseInterface(query, canAnswer, coverage, game) {
    
    game.prevReponses = game.responses;
    game.responses = [];
    game.update();
    game.savedState = game.currentState.slice();

    if (query.length === 0) {
      this.status("nothing to rephrase");
      return false;
    }

    const rephraseInterface = document.getElementById(configs.elems.rephraseInterface);
    rephraseInterface.classList.add("active");

    const rephraseStatus = document.getElementById(configs.elems.rephraseStatus);
    rephraseStatus.innerHTML = `Show SCHEDLURN what ${query} means.`;

    const toggleButton = document.getElementById(configs.buttons.toggleDefine);
    toggleButton.innerHTML = "Return";

    this.removePromptDefine();
    this.removePromptRephrase();

    this.tryRephrase(query, false, canAnswer, coverage);

    document.getElementById(configs.elems.defineConsole).focus();
    return true;
  }

  closeRephraseInterface(game) {

    // $('#eventDialog')[0].classList.add('hidden'); // not needed

    const rephraseInterface = document.getElementById(configs.elems.rephraseInterface);
    rephraseInterface.classList.remove("active");

    const toggleButton = document.getElementById(configs.buttons.toggleDefine);
    toggleButton.innerHTML = "Define";

    document.querySelector('#rephrase_interface .input-group').classList.remove("accepting");

    const consoleElem = document.getElementById(configs.elems.console);
    consoleElem.focus();

    game.resetResponses();
    document.getElementById(configs.elems.console).value = "";

    this.status("type one!");

    // revert changes to current state
    // game.currentStateEditable = false; // not needed

  }

  tryDefine(query, refineDefine, canAnswer, coverage = [], commandResponse = [], oldQuery = "") {
    const defineHeader = document.getElementById(configs.elems.defineHeader);
    document.getElementById(configs.elems.definePrompt).classList.add("hidden");
    document.querySelector('#define_interface .input-group').classList.remove("accepting");


    defineHeader.innerHTML = `Please teach SCHEDLURN the meaning of "${this.intelHighlight(coverage)}" by changing the calendar. Click Submit when done.`;

    // if (!refineDefine) {
    //   if (canAnswer) {
    //     defineHeader.innerHTML = `Already understand ${query}, teach another meaning?`;
    //   } else {
    //     defineHeader.innerHTML = `Didn't understand "${this.intelHighlight(coverage)}". Please teach SCHEDLURN by changing the calendar.`;
    //   }
    // } else {
    //   if (canAnswer) {
    //     defineHeader.innerHTML = `SHRDLURN understands the definition, "${query}". If this is correct, click "define" to submit the definition.`;
    //     document.querySelector('#define_interface .input-group').classList.add("accepting");
    //   } else {
    //     defineHeader.innerHTML = `Still don't understand "${this.intelHighlight(coverage)}". Please rephrase:`;
    //   }

      // // Special Statuses
      // if (commandResponse.length > 0) {
      //   const defCore = commandResponse.indexOf("Core") !== -1;
      //   const defNoCover = commandResponse.indexOf("NoCover") !== -1;
      //   if (defCore) {
      //     // updateStatus("cannot redefine the core language!");
      //     defineHeader.innerHTML = `"${oldQuery}" is precisely understood, and cannot be redefined by "${this.intelHighlight(coverage)}".`;
      //   } else if (defNoCover) {
      //     // updateStatus("SHRDLRUN cannot learn from this definition");
      //     defineHeader.innerHTML = `Nothing (colors, numbers, etc) in "${this.intelHighlight(coverage)}" matches "${oldQuery}", so SHRDLURN cannot learn from this.`;
      //   }
      // }
    // }
  }

  tryRephrase(query, refineDefine, canAnswer, coverage = [], commandResponse = [], oldQuery = "") {
    const rephraseHeader = document.getElementById(configs.elems.rephraseHeader);
    document.getElementById(configs.elems.definePrompt).classList.add("hidden");
    document.querySelector('#define_interface .input-group').classList.remove("accepting");
    // rephraseHeader.innerHTML = `Already understand ${query}, teach another meaning TODO?`;

    rephraseHeader.innerHTML = `Please teach the meaning of "${this.intelHighlight(coverage)}" by rephrasing your statement. Click Rephrase when done.`;
    // defineHeader.innerHTML = `Didn't understand "${this.intelHighlight(coverage)}". Please teach SCHEDLURN by changing the calendar.`;

    // if (!refineDefine) {
    //   if (canAnswer) {
    //     rephraseHeader.innerHTML = `Already understand ${query}, teach another meaning TODO?`;
    //   } else {
    //     rephraseHeader.innerHTML = `Didn't understand "${this.intelHighlight(coverage)}". Try to say the same thing differently:`;
    //   }
    // } else { 
    //   if (canAnswer) {
    //     rephraseHeader.innerHTML = `SHRDLURN understands the definition, "${query}". If this is correct, click "define" to submit the definition.`;
    //     document.querySelector('#define_interface .input-group').classList.add("accepting");
    //   } else {
    //     rephraseHeader.innerHTML = `Still don't understand "${this.intelHighlight(coverage)}". Please rephrase:`;
    //   }

      // // Special Statuses
      // if (commandResponse.length > 0) {
      //   const defCore = commandResponse.indexOf("Core") !== -1;
      //   const defNoCover = commandResponse.indexOf("NoCover") !== -1;
      //   if (defCore) {
      //     // updateStatus("cannot redefine the core language!");
      //     rephraseHeader.innerHTML = `"${oldQuery}" is precisely understood, and cannot be redefined by "${this.intelHighlight(coverage)}".`;
      //   } else if (defNoCover) {
      //     // updateStatus("SHRDLRUN cannot learn from this definition");
      //     rephraseHeader.innerHTML = `Nothing (colors, numbers, etc) in "${this.intelHighlight(coverage)}" matches "${oldQuery}", so SHRDLURN cannot learn from this.`;
      //   }
      // }
    // }
  }

  intelHighlight(coverage) {
    let coloredQuery = "";
    for (let i = 0; i < coverage.length; i++) {
      const type = coverage[i][0];
      switch (type) {
        case "$ActionSeq":
          coloredQuery += "<span class='color-good'>";
          break;
        case "$Action":
          coloredQuery += "<span class='color-good'>";
          break;
        case "$CondSeq":
          coloredQuery += "<span class='color-good'>";
          break;
        case "$Cond":
          coloredQuery += "<span class='color-good'>";
          break;
        case "$NumberSeq":
          coloredQuery += "<span class='color-good'>";
          break;
        case "$Number":
          coloredQuery += "<span class='color-good'>";
          break;
        case "$Color":
          coloredQuery += "<span style='color:blue;'>";
          break;
        case "$Keyword":
          coloredQuery += "<span style='color:blue;'>";
          break;
        case "$UNK":
          coloredQuery += "<span style='color:red;'>";
          break;
        default:
          coloredQuery += "<span style='color:red;'>";
      }
      for (let j = 1; j < coverage[i].length; j++) {
        coloredQuery += `${coverage[i][j]} `;
      }
      coloredQuery += "</span>";
    }
    return coloredQuery;
  }

  revertHistory(index, game) {
    const newGame = game;

    const historyElems = getHistoryElems();
    const state = newGame.history.find((h) => h.stepN === parseInt(historyElems[index].getAttribute("data-stepN"), 10));
    newGame.currentState = state.state;
    newGame.update();

    const newHistoryElems = getHistoryElems();
    newHistoryElems[index].classList.add("active");

    return newGame;
  }

  promptDefine() {
    document.getElementById(configs.elems.definePrompt).classList.remove("hidden");
  }

  removePromptDefine() {
    document.getElementById(configs.elems.definePrompt).classList.add("hidden");
  }

  promptRephrase() {
    document.getElementById(configs.buttons.rephrase_instead).classList.remove("hidden");
  }

  removePromptRephrase() {
    document.getElementById(configs.buttons.rephrase_instead).classList.add("hidden");
  }

  setSkips(skipsLeft) {
    const skipsLeftElem = document.getElementById("skips_left");
    if (skipsLeft !== 0) {
      skipsLeftElem.innerHTML = skipsLeft;
    } else {
      document.getElementById("skip_button").classList.add("hidden");
    }
  }

  promptAccept() {
    document.getElementById(configs.elems.consoleGroup).classList.add("accepting");
    $("#edit_calendar").css("backgroundColor", "#00a0b0");
    $("#edit_calendar").css("cursor", "pointer");
    $("#dobutton").css("backgroundColor", "#969696");
  }

  promptSubtleAccept() {
    document.getElementById(configs.elems.consoleGroup).classList.add("accepting");
    $("#edit_calendar").css("backgroundColor", "#00a0b0");
    $("#edit_calendar").css("cursor", "pointer");
    $("#flyingaccept").css("backgroundColor", "#969696");
  }

  removeAccept() {
    document.getElementById(configs.elems.consoleGroup).classList.remove("accepting");
    $("#edit_calendar").css("backgroundColor", "#969696");
    $("#edit_calendar").css("cursor", "not-allowed");
    $("#dobutton").css("backgroundColor", "#00a0b0");
  }

  promptTryDefine() {
    document.getElementById(configs.buttons.tryDefine).classList.add("active");
  }

  toggleDefineButton() {
    document.getElementById(configs.buttons.define).classList.add("active");
  }

  rotate(rotation) {
    this.rotational = parseInt(rotation, 10);
  }
}

