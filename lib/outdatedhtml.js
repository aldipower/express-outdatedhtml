/*!
 * express-outdatedhtml
 * 
 * Make sites outdated by replace the new HTML5 element names,
 * such as 'canvas', 'section', etc. with proven ones like 'div'.
 * This is happening on the fly by parsing
 * the view render results string of the Express framework.
 * Of course only if an outdated browser is detected,
 * in this case the Internet Explorer smaller than 9,
 * so the browser can handle the retrieved HTML correctly. 
 * 
 * Copyright(c) 2011 Felix Gertz <nihil.baxter.dev@gmail.com>
 * 
 * MIT Licensed
 */

/*
 * The key in this map is the replacement
 * for an matching HTML5-element-name in the according value array. 
 */
var replacemap = {
	"div": ['canvas','section','summary', 'header','footer', 'nav', 'menu', 'aside', 'article', 'hgroup', 'figure', 'figcaption'],
	"span": ['time', 'mark']
};

var useragent = require('useragent');

/**
 * If the user-agent is an Internet Explorer smaller then 9,
 * this function returns a callback that can be passed
 * to the Express 'render'-function as third argument.  
 * 
 * The callback replaces HTML5 element names (canvas, section, ..)
 * in the Express 'render'-'result'-string
 * with proven element names (div, span) defined in the replacemap
 * to gain old browser compatibility.
 * Then sends the result.
 * 
 * @param req Request object 
 * @param res Response object
 * @param force Force execution of replacement, even if no matching user-agent is found. (optional)
 * @param rendercallback Pass another Express render callback (optional)
 */
exports.makeoutdated = function(req, res, force, rendercallback) {
	if(typeof force === 'function') {
		rendercallback = force;
		force = false;
	}
	
	var agent = useragent.parse(req.headers['user-agent']);

	// Looking for IE smaller then major release 9
	if(force || (agent.family == 'IE' && parseInt(agent.major) < 9))
		return function(err, result) {
			for(replacement in replacemap) {
				var elements = replacemap[replacement].join("|");
				result = result.
				replace(new RegExp("<(?:"+elements+")", "gi"), "<"+replacement).
				replace(new RegExp("(?:"+elements+")>", "gi"), replacement+">");
			}
			if(typeof rendercallback !== 'function')
				res.send(result);
			else
				rendercallback(err, result);
		};
	
	// Nothing happens
	return function(err, result) { 
		if(typeof rendercallback !== 'function')
			res.send(result);
		else
			rendercallback(err, result);
	};
};