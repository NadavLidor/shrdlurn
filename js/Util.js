"use strict"
// captures the game state
String.prototype._format = function(placeholders) {
    var s = this;
    for(var propertyName in placeholders) {
        var re = new RegExp('{' + propertyName + '}', 'gm');
        s = s.replace(re, placeholders[propertyName]);
    }    
    return s;
};
var util = {}
util.guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	return v.toString(16);
    });
}
util.simpleid = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
util.store = sessionStorage;
util.setStore = function(name, value) {
    var jsonvalue = JSON.stringify(value)
    util.store.setItem(name, jsonvalue);
}

util.getStore = function(name, defval) {
    var val = util.store.getItem(name);
    if (!val) {
	return defval
    } else return JSON.parse(val)
}
util.getId= function() {
    if (!util.store.guid) {
	util.store.guid = util.simpleid();
    }
    return util.store.guid;
}

util.emojione = {};
(function(ns) {
    ns.emojioneList = {
	':scream:':["1f631"],
	':astonished:':["1f632"],
	':confused:':["1f615"],
	':rolling_eyes:':["1f644"],
	':neutral_face:':["1f610"],
	':slight_smile:':["1f642"],
	':smiley:':["1f603"]};
    ns.numToShort = {
	6: ':scream:',
	5: ':astonished:',
	4: ':confused:',
	3: ':rolling_eyes:',
	2: ':neutral_face:',
	1: ':slight_smile:',
	0: ':smiley:'
    };
    
    ns.imagePathPNG = 'http://cdn.jsdelivr.net/emojione/assets/png/';
    ns.imagePathSVG = 'http://cdn.jsdelivr.net/emojione/assets/svg/';
    ns.cacheBustParam = ''; //'?v=2.1.1';
    ns.imageType = 'svg';
    
    ns.shortnameToImage = function(shortname) {
	unicode = ns.emojioneList[shortname][ns.emojioneList[shortname].length-1];
	alt = shortname;
	if(ns.imageType === 'png') {
	    replaceWith = '<img class="emojione" alt="'+alt+'" src="'+ns.imagePathPNG+unicode+'.png'+ns.cacheBustParam+'"/>';
	}
	else {
	    replaceWith = '<object class="emojione" data="'+ns.imagePathSVG+unicode+'.svg'+ns.cacheBustParam+'" type="image/svg+xml" standby="'+alt+'">'+alt+'</object>';
	}
	return replaceWith;
    }
    ns.numToImg = function(num) {
	return ns.shortnameToImage(ns.numToShort[num]);
    }
} (util.emojione));