import configs from "./config";

export function getHistoryElems() {
  return document.querySelectorAll("#command_history > div[data-type='accept'], #command_history > div[data-type='initial']");
}

export function emojione(num) {
  const emojioneList = {
    ":scream:": ["1f631"],
    ":astonished:": ["1f632"],
    ":confused:": ["1f615"],
    ":rolling_eyes:": ["1f644"],
    ":relieved:": ["1f60c"],
    ":relaxed:": ["263a"],
    ":neutral_face:": ["1f610"],
    ":slight_smile:": ["1f642"],
    ":smiley:": ["1f603"],
    ":grinning:": ["1f600"],
  };

  const numToShort = {
    6: ":scream:",
    5: ":astonished:",
    4: ":confused:",
    3: ":rolling_eyes:",
    2: ":relieved:",
    1: ":relaxed:",
    0: ":smiley:",
  };

  const imagePathPNG = "http:\/\/cdn.jsdelivr.net\/emojione\/assets\/png\/";
  const imagePathSVG = "http:\/\/cdn.jsdelivr.net\/emojione\/assets\/svg\/";
  const cacheBustParam = "";
  const imageType = "png"; // png or svg

  const shortname = numToShort[num];
  const unicode = emojioneList[shortname][emojioneList[shortname].length - 1];
  const alt = shortname;

  let replaceWith = "";
  if (imageType === "png") {
    replaceWith = `<img class="emojione" alt="${alt}" src="${imagePathPNG}${unicode}.png" />`;
  } else {
    replaceWith = `<object class="emojione" data="${imagePathSVG}${unicode}.svg" type="image/svg+xml" standby="${alt}">${alt}</object`;
  }

  return replaceWith;
}

export function setStore(name, value) {
  const jsonValue = JSON.stringify(value);
  configs.store.setItem(name, jsonValue);
}

export function getStore(name, defaultValue = "") {
  const value = configs.store.getItem(name);
  if (!value) {
    return defaultValue;
  }
  return JSON.parse(value);
}

export function resetStore() {
  configs.store.clear();
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function contains(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

export function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}