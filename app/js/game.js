import configs from "./config";
import Logger from "./logger";
import { getStore, setStore, getParameterByName, contains, coinFlip, getRandomInt } from "./util";
import { getTurkId, getTurkCode, getTurkHit } from "./turk";

export default class Game {
  constructor(setting, sempreClient) {
    this.sessionId = configs.defaultSessionId;
    this.currentStateEditable = false;
    this.currentState = configs.defaultStruct;
    this.savedState = configs.defaultStruct;
    this.responses = [];
    this.prevReponses = [];
    this.selectedResp = -1;
    this.query = "";
    this.history = this.initialHistory();
    this.taggedCover = "";
    this.defineSuccess = "";
    this.rephraseOption = false;
    this.lead = 0;
    this.points = 0;

    // this.targetStruct = configs.defaultStruct;
    // this.targetIdx = -1;
    // this.maxTargetSteps = 0;
    this.skipsLeft = configs.defaultSkips;

    this.Sempre = sempreClient;

    this.Setting = setting;
    this.Setting.renderHistory(this.history);
    
    /* For turking purposes */
    if (process.env.NODE_ENV === "turk" || process.env.NODE_ENV === "turkproduction") {
      this.sessionId = getTurkId();
      this.Logger = new Logger(this.sessionId);
      const targetIdx = getTurkHit();
      this.Logger.log({ type: "start", msg: { taskid: getParameterByName("mtaskid"), startingState: this.currentState } });
    } else {
      this.Logger = new Logger(this.sessionId);
      this.Logger.log({ type: "start", msg: { taskid: "localtest", startingState: this.currentState } });
    }
  }

  // setTarget(targetStruct) {
  //   this.targetIdx = targetStruct[0];
  //   this.targetStruct = targetStruct[2];
  //   this.maxTargetSteps = targetStruct[1] * configs.difficulty;

  //   this.Setting.renderTarget(this.targetStruct);
  //   this.Setting.setSteps(targetStruct[1], this.maxTargetSteps);

  //   this.Logger.log({ type: "setTarget", msg: { target: this.targetStruct, targetIdx: this.targetIdx } });
  // }

  // updateTarget() {
  //   this.Setting.renderTarget(this.targetStruct);
  // }

  rephrase(query) {
    if (query.length === 0) {
      this.Setting.status("try rephrasing or esc");
      return;
    }
    this.rephraseSempre(query);
  }

  rephraseSempre(querystr) {
    const query = this.Sempre.formatQuery(querystr);
    var contextCommand = "(context)";
    if (this.currentState) {
      const currentState = JSON.stringify(JSON.stringify(this.currentState.map(c => ([
        c.title, 
        c.location,
        c.start.format('YYYY-MM-DDTHH:mm'), 
        c.end.format('YYYY-MM-DDTHH:mm'), 
        // c.repeats,
        c.names
        ]))));
      contextCommand = `(context (graph NaiveKnowledgeGraph ((string ${currentState}) (name b) (name c))))`;
    }

    const contextCmds = { q: contextCommand, sessionId: this.sessionId };

    this.Sempre.query(contextCmds, () => {
      const cmds = { q: query, sessionId: this.sessionId };
      this.Sempre.query(cmds, (response) => {
        this.taggedCover = response.taggedcover;

        const formval = this.Sempre.parseSEMPRE(response.candidates);
        if (formval === null || formval === undefined) {
          console.log("no answer from sempre");
          this.resetResponses();
          this.query = query;
          this.Setting.status("SCHEDLURN did not understand", query);
          // this.Setting.promptDefine();
          if (this.rephraseOption) {this.Setting.promptRephrase();}
          this.Logger.log({ type: "queryUnknown", msg: { query: query } });
          // this.Setting.promptAccept();
          this.Setting.promptSubtleAccept();
        } else {
          this.Setting.removePromptDefine();
          this.responses = formval;
          this.selectedResp = 0;
          this.query = query;
          this.Setting.status(`got ${this.responses.length} options, use &darr; and &uarr; to scroll, and accept to confirm.`, `${query} (#1/${this.responses.length})`, this.responses[0].maxprop | -1);
          this.Logger.log({ type: "query", msg: { query: query } });
          this.Setting.promptAccept();
        }

        if (configs.debugMode) {
          console.log(response);
        }

        this.update();
      });
    });
  }

  maybePermute() {
    this.lead = 0;
    if (coinFlip.call()) {
      this.lead = getRandomInt(0, this.responses.length - 1);
      console.log("P_" + this.lead + "_F");
      // console.log("Before permute: ");
      // for (var i = 0; i < this.responses.length; i++) {
      //   console.log(this.responses[i]);
      // }

      const moveUp = this.responses[this.lead];

      this.responses.splice(this.lead, 1);
      this.responses.unshift(moveUp);
      // console.log("After permute: ");
      // for (var i = 0; i < this.responses.length; i++) {
      //   console.log(this.responses[i]);
      // }
    }
    else {
      console.log("NP");
    }
    
  }

  enter(query) {
    if (query.length === 0) {
      this.Setting.status("");
      return;
    }
    this.querySempre(query);
  }

  querySempre(querystr) {
    const query = this.Sempre.formatQuery(querystr);
    var contextCommand = "(context)";
    if (this.currentState) {
      // const currentState = JSON.stringify(JSON.stringify(this.currentState.map(c => ([c.x, c.y, c.z, c.color, c.names]))));
      const currentState = JSON.stringify(JSON.stringify(this.currentState.map(c => ([
        c.title, 
        c.location,
        c.start.format('YYYY-MM-DDTHH:mm'), 
        c.end.format('YYYY-MM-DDTHH:mm'), 
        // c.repeats,
        c.names
        ]))));
      contextCommand = `(context (graph NaiveKnowledgeGraph ((string ${currentState}) (name b) (name c))))`;
    }

    const contextCmds = { q: contextCommand, sessionId: this.sessionId };

    this.Setting.cursorLoading();
    this.Sempre.query(contextCmds, () => {
      const cmds = { q: query, sessionId: this.sessionId };
      this.Sempre.query(cmds, (response) => {
        this.Setting.cursorNotLoading();
        this.taggedCover = response.taggedcover;

        const formval = this.Sempre.parseSEMPRE(response.candidates);
        if (formval === null || formval === undefined) {
          console.log("no answer from sempre");
          this.resetResponses();
          this.query = query;
          this.Setting.status("SCHEDLURN did not understand", query);
          // this.Setting.promptDefine();
          if (this.rephraseOption) {this.Setting.promptRephrase();}
          this.Logger.log({ type: "queryUnknown", msg: { query: query } });
          // this.Setting.promptAccept();
          this.Setting.promptSubtleAccept();
        } else {
          this.Setting.removePromptDefine();
          this.responses = formval;
          this.selectedResp = 0;
          this.maybePermute();
          this.query = query;
          this.Setting.status(`got ${this.responses.length} options, use &darr; and &uarr; to scroll, and accept to confirm.`, `${query} (#1/${this.responses.length})`, this.responses[0].maxprop | -1);
          this.Logger.log({ type: "query", msg: { query: query } });
          this.Setting.promptAccept();
        }

        if (configs.debugMode) {
          console.log(response);
        }

        this.update();
      });
    });
  }

  submitAnswerSempre() {
    // const query = this.Sempre.formatQuery(querystr);
    var contextCommand = "(answer)";
    if (this.currentState) {
      const currentState = JSON.stringify(JSON.stringify(this.currentState.map(c => ([
        c.title, 
        c.location,
        c.start.format('YYYY-MM-DDTHH:mm'), 
        c.end.format('YYYY-MM-DDTHH:mm'), 
        // c.repeats,
        c.names
        ]))));
      contextCommand = `(answer (string ${currentState}))`;
      // console.log("currentState submitted: " + currentState);
    }
    
    const contextCmds = { q: contextCommand, sessionId: this.sessionId };

    this.Sempre.query(contextCmds, () => {});
  }

  accept(tutorial) {
    if (this.responses.length > 0) {
      if (!tutorial) {
        console.log("sempre sent")
        this.Sempre.query({ q: this.query, accept: this.responses[this.selectedResp].rank, sessionId: this.sessionId }, () => {}); 
      }
      else {
        console.log("sempre not sent")
      }
      this.savedState = this.currentState;
      this.currentState = this.responses[this.selectedResp].value;
      this.Setting.unmarkNewEvents(this);
      this.Setting.status(`✓: accepted, enter another command`);
      this.Logger.log({ type: "accept", msg: { lead: this.lead, pick: this.selectedResp, query: this.query, state: this.currentState, formula: this.responses[this.selectedResp].formula} });
      if (!tutorial && !this.updatePoints()) {return;}
      if (tutorial) {this.history.push({ query: this.query, type: "accept tutorial", state: this.currentState, stepN: this.getSteps() + 1, formula: this.responses[this.selectedResp].formula });}
      else {this.history.push({ query: this.query, type: "accept", state: this.currentState, stepN: this.getSteps() + 1, formula: this.responses[this.selectedResp].formula });}
      this.resetResponses();
      this.update();
      this.Setting.removePromptDefine();
      this.Setting.removeAccept();
      this.currentStateEditable = false;
    } else {
      this.Setting.status("✓: can't accept nothing, say something first");
    }
  }

  updatePoints(){
    if (this.query !== this.history[this.history.length - 1].query && !this.Setting.equalityCheck(this.currentState, this.savedState)) {
      this.points += 1;
      const points = document.getElementById(configs.points);
      points.innerHTML = "Points: " + this.points;
      if (this.points === 10) {
        this.win();
        return false;
      }
    }
    return true;
  }

  win() {
    // const usedTargets = getStore("usedTargetsv1", []);
    // usedTargets.push(this.targetIdx);
    // setStore("usedTargetsv1", usedTargets);
    this.Logger.log({ type: "win", msg: { nSteps: this.getSteps(), history: this.history.map(h => ([h.query, h.formula])) } });

    if (process.env.NODE_ENV === "turk" || process.env.NODE_ENV === "turkproduction") {
      const turkcode = getTurkCode(this.points);
      document.getElementById("finalturkcode").innerHTML = turkcode;
      document.getElementById("turkcode").classList.add("active");
    } else {
      alert("You've did it! Congratulations!");
    }

    this.clear();
  }

  resetResponses() {
    this.selectedResp = -1;
    this.responses = [];
    this.query = "";
  }

  update() {

    /* Update the canvas */
    let state = this.currentState;
    // let previousState = this.currentState;
    // let newState = [];
    if (this.responses.length > 0) {
      // newState = this.responses[this.selectedResp].value;
      state = this.responses[this.selectedResp].value;
      console.log("game.update formula: " + this.responses[this.selectedResp].formula);
    }
    // this.Setting.renderCanvas(previousState, newState);
    this.Setting.renderCanvas(state);

    /* Update the history */
    this.Setting.renderHistory(this.history);
    this.Setting.updateSteps(this.getSteps());
  }

  submitCalendar() {

    this.updatePoints();
    this.Logger.log({ type: "manual edit", msg: { query: this.query, state: this.currentState} });
    this.history.push({ query: this.query, type: "accept", state: this.currentState, stepN: this.getSteps() + 1, formula: "none" });
    this.currentStateEditable = false;
    this.Setting.unmarkNewEvents(this);
    this.update();
    this.submitAnswerSempre();
    
    // this.resetResponses();
    // document.getElementById(configs.elems.console).value = "";
    // this.Sempre.query({ answer: this.currentState.value, sessionId: this.sessionId }, () => {});
    this.Setting.closeDefineInterface(this);
    this.Setting.status("definition accepted. thanks for teaching!");

  }

  define(query) {
    /* If just trying, update the current structure and everything */
    if (this.defineSuccess.length === 0 || query !== this.defineSuccess) {
      const cmds = { q: `(uttdef "${this.Sempre.formatQuery(query)}" -1)`, sessionId: this.sessionId };

      this.Logger.log({ type: "trydefine", msg: { query: query } });

      this.Sempre.query(cmds, (response) => {
        const formval = this.Sempre.parseSEMPRE(response.candidates);
        const commandResponse = response.commandResponse;

        const defCore = commandResponse.indexOf("Core") !== -1;
        const defNoCover = commandResponse.indexOf("NoCover") !== -1;
        const defNoParse = commandResponse.indexOf("NoParse") !== -1;

        if (defCore || defNoCover || defNoParse) {
          this.taggedCover = response.taggedcover;
          this.Setting.tryDefine(query, true, false, this.taggedCover, commandResponse, this.query);
        } else {
          this.defineSuccess = query;
          this.selectedResp = 0;
          this.responses = formval;
          this.update();
          this.Setting.tryDefine(query, true, true);
          this.Setting.toggleDefineButton();
        }
      });
      return false;
    }

    /* Otherwise, submit the definition if already tried */
    const text = `(uttdef "${this.Sempre.formatQuery(this.defineSuccess)}" ${this.responses[this.selectedResp].rank})`;
    const cmds = { q: text, sessionId: this.sessionId };
    const newPhrase = this.query;

    this.Sempre.query(cmds, (resp) => {
      this.history.push({ query: `defined "${this.query}" as "${this.defineSuccess}"`, type: "define" });
      this.Logger.log({ type: "define", msg: [this.query, this.defineSuccess, JSON.stringify(resp.candidates[0].formula)] });
      this.defineSuccess = "";
      this.resetResponses();
      this.update();
      this.Setting.status("definition accepted. thanks for teaching!");
    });

    return newPhrase;
  }

  clear() {
    this.Logger.log({ type: "clear", msg: "" });
    this.resetResponses();
    this.history = this.initialHistory();
    // this.currentState = configs.emptyStruct;
    this.update();
    this.Setting.status("cleared the space");
  }

  next() {
    if (this.responses.length <= 0) {
      this.Setting.status("↓: can't scroll, say something or ⎌");
    } else if (this.selectedResp !== this.responses.length - 1) {
      this.selectedResp++;
      this.update();
      this.Setting.status("↓: showing the next one", `${this.query} (#${this.selectedResp + 1}/${this.responses.length})`, this.responses[0].maxprop | -1);
      this.Logger.log({ type: "scroll", msg: "next" });
    } else {
        this.Setting.status('↓: out of options, scroll up or click "edit calendar" to show ', `${this.query} (#${this.selectedResp + 1}/${this.responses.length})`, this.responses[0].maxprop | -1);
        // this.Setting.promptDefine();
        if (this.rephraseOption) {this.Setting.promptRephrase();}
    }
  }

  prev() {
    if (this.responses.length <= 0) {
      this.Setting.status("↑: can't scroll, say something or ⎌");
    } 

    else if (!document.getElementById(configs.elems.definePrompt).classList.contains("hidden")) {
      if (this.rephraseOption) {this.Setting.removePromptRephrase();}
      this.Setting.removePromptDefine();
      this.Setting.status("↑: showing the previous one", `${this.query} (#${this.selectedResp + 1}/${this.responses.length})`, this.responses[0].maxprop | -1);
    }

    else if (this.selectedResp !== 0) {
      this.selectedResp--;
      this.update();
      this.Setting.status("↑: showing the previous one", `${this.query} (#${this.selectedResp + 1}/${this.responses.length})`, this.responses[0].maxprop | -1);
      this.Logger.log({ type: "scroll", msg: "prev" });
    } else {
      this.Setting.status("↑: already showing the first one", `${this.query} (#${this.selectedResp + 1}/${this.responses.length})`, this.responses[0].maxprop | -1);
    }
  }

  getSteps() {
    return this.history.filter((h) => h.type === "accept").length;
  }

  initialHistory() {
    return [{ type: "initial", query: "initial", state: configs.defaultStruct, stepN: 0, formula: "" }];
  }

  getRandomTarget() {
    const usedTargets = getStore("usedTargetsv1", []);
    if (usedTargets.length === configs.targets.length) {
      alert("You've completed all targets! Resetting...");
      setStore("usedTargetsv1", []);
    }

    let targetIdx = -1;
    do {
      targetIdx = Math.floor(Math.random() * configs.targets.length);
    } while (usedTargets.includes(targetIdx));

    return [targetIdx, ...configs.targets[targetIdx]];
  }

  skipTarget() {
    this.skipsLeft--;
    this.Setting.setSkips(this.skipsLeft);
    const usedTargets = getStore("usedTargetsv1", []);
    if (configs.targets.length - usedTargets.length > 1) {
      let randomTarget = [];
      do {
        randomTarget = this.getRandomTarget();
      } while (randomTarget[0] === this.targetIdx);
      this.Logger.log({ type: "skip", msg: { target: this.targetStruct, targetIdx: this.targetIdx } });
      this.setTarget(randomTarget);
    } else {
      alert("Sorry, this is the last target. No skips possible.");
    }
  }
}
