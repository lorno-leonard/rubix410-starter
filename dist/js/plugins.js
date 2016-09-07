/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "4cf2856c87bf5ce4b2a2"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 4;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8079/assets/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(971);
	module.exports = __webpack_require__(856);


/***/ },

/***/ 856:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot check for update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
					} else {
						console.warn("[HMR] Update check failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					return;
				}

				module.hot.apply({
					ignoreUnaccepted: true
				}, function(err, renewedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update. Need to do a full reload!");
							console.warn("[HMR] " + err.stack || err.message);
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}

					if(!upToDate()) {
						check();
					}

					__webpack_require__(857)(updatedModules, renewedModules);

					if(upToDate()) {
						console.log("[HMR] App is up to date.");
					}
				});
			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },

/***/ 857:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});

		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}

		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },

/***/ 971:
/***/ function(module, exports, __webpack_require__) {

	'use strict';__webpack_require__(972);__webpack_require__(975);/* Import your third-Party plugins here */;(function(){if(typeof __REACT_HOT_LOADER__==='undefined'){return;}})();;

/***/ },

/***/ 972:
/***/ function(module, exports, __webpack_require__) {

	"use strict";__webpack_require__(973)(__webpack_require__(974)+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///Users/tamerel-sayed/Desktop/simsar/rubix/node-seed/public/js/modernizr.js");;(function(){if(typeof __REACT_HOT_LOADER__==='undefined'){return;}})();;

/***/ },

/***/ 973:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },

/***/ 974:
/***/ function(module, exports) {

	module.exports = "/*! modernizr 3.2.0 (Custom Build) | MIT *\n * http://modernizr.com/download/?-history-touchevents !*/\n!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,i,a,r;for(var f in d)if(d.hasOwnProperty(f)){if(e=[],n=d[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,\"function\")?n.fn():n.fn,i=0;i<e.length;i++)a=e[i],r=a.split(\".\"),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),l.push((s?\"\":\"no-\")+r.join(\"-\"))}}function i(e){var n=u.className,t=Modernizr._config.classPrefix||\"\";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp(\"(^|\\\\s)\"+t+\"no-js(\\\\s|$)\");n=n.replace(o,\"$1\"+t+\"js$2\")}Modernizr._config.enableClasses&&(n+=\" \"+t+e.join(\" \"+t),p?u.className.baseVal=n:u.className=n)}function a(){return\"function\"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,\"http://www.w3.org/2000/svg\",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=a(p?\"svg\":\"body\"),e.fake=!0),e}function f(e,t,o,s){var i,f,l,d,c=\"modernizr\",p=a(\"div\"),h=r();if(parseInt(o,10))for(;o--;)l=a(\"div\"),l.id=s?s[o]:c+(o+1),p.appendChild(l);return i=a(\"style\"),i.type=\"text/css\",i.id=\"s\"+c,(h.fake?h:p).appendChild(i),h.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=c,h.fake&&(h.style.background=\"\",h.style.overflow=\"hidden\",d=u.style.overflow,u.style.overflow=\"hidden\",u.appendChild(h)),f=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=d,u.offsetHeight):p.parentNode.removeChild(p),!!f}var l=[],d=[],c={_version:\"3.2.0\",_config:{classPrefix:\"\",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){d.push({name:e,fn:n,options:t})},addAsyncTest:function(e){d.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr,Modernizr.addTest(\"history\",function(){var n=navigator.userAgent;return-1===n.indexOf(\"Android 2.\")&&-1===n.indexOf(\"Android 4.0\")||-1===n.indexOf(\"Mobile Safari\")||-1!==n.indexOf(\"Chrome\")||-1!==n.indexOf(\"Windows Phone\")?e.history&&\"pushState\"in e.history:!1});var u=n.documentElement,p=\"svg\"===u.nodeName.toLowerCase(),h=c._config.usePrefixes?\" -webkit- -moz- -o- -ms- \".split(\" \"):[];c._prefixes=h;var m=c.testStyles=f;Modernizr.addTest(\"touchevents\",function(){var t;if(\"ontouchstart\"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=[\"@media (\",h.join(\"touch-enabled),(\"),\"heartz\",\")\",\"{#modernizr{top:9px;position:absolute}}\"].join(\"\");m(o,function(e){t=9===e.offsetTop})}return t}),s(),i(l),delete c.addTest,delete c.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);\n"

/***/ },

/***/ 975:
/***/ function(module, exports, __webpack_require__) {

	"use strict";__webpack_require__(973)(__webpack_require__(976)+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///Users/tamerel-sayed/Desktop/simsar/rubix/node-seed/public/js/perfect-scrollbar.js");;(function(){if(typeof __REACT_HOT_LOADER__==='undefined'){return;}})();;

/***/ },

/***/ 976:
/***/ function(module, exports) {

	module.exports = "/* perfect-scrollbar v0.6.7 */\n(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw f.code=\"MODULE_NOT_FOUND\",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar ps = require('../main');\n\nif (typeof define === 'function' && define.amd) {\n  // AMD\n  define(ps);\n} else {\n  // Add to a global object.\n  window.PerfectScrollbar = ps;\n  if (typeof window.Ps === 'undefined') {\n    window.Ps = ps;\n  }\n}\n\n},{\"../main\":7}],2:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nfunction oldAdd(element, className) {\n  var classes = element.className.split(' ');\n  if (classes.indexOf(className) < 0) {\n    classes.push(className);\n  }\n  element.className = classes.join(' ');\n}\n\nfunction oldRemove(element, className) {\n  var classes = element.className.split(' ');\n  var idx = classes.indexOf(className);\n  if (idx >= 0) {\n    classes.splice(idx, 1);\n  }\n  element.className = classes.join(' ');\n}\n\nexports.add = function (element, className) {\n  if (element.classList) {\n    element.classList.add(className);\n  } else {\n    oldAdd(element, className);\n  }\n};\n\nexports.remove = function (element, className) {\n  if (element.classList) {\n    element.classList.remove(className);\n  } else {\n    oldRemove(element, className);\n  }\n};\n\nexports.list = function (element) {\n  if (element.classList) {\n    return Array.prototype.slice.apply(element.classList);\n  } else {\n    return element.className.split(' ');\n  }\n};\n\n},{}],3:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar DOM = {};\n\nDOM.e = function (tagName, className) {\n  var element = document.createElement(tagName);\n  element.className = className;\n  return element;\n};\n\nDOM.appendTo = function (child, parent) {\n  parent.appendChild(child);\n  return child;\n};\n\nfunction cssGet(element, styleName) {\n  return window.getComputedStyle(element)[styleName];\n}\n\nfunction cssSet(element, styleName, styleValue) {\n  if (typeof styleValue === 'number') {\n    styleValue = styleValue.toString() + 'px';\n  }\n  element.style[styleName] = styleValue;\n  return element;\n}\n\nfunction cssMultiSet(element, obj) {\n  for (var key in obj) {\n    var val = obj[key];\n    if (typeof val === 'number') {\n      val = val.toString() + 'px';\n    }\n    element.style[key] = val;\n  }\n  return element;\n}\n\nDOM.css = function (element, styleNameOrObject, styleValue) {\n  if (typeof styleNameOrObject === 'object') {\n    // multiple set with object\n    return cssMultiSet(element, styleNameOrObject);\n  } else {\n    if (typeof styleValue === 'undefined') {\n      return cssGet(element, styleNameOrObject);\n    } else {\n      return cssSet(element, styleNameOrObject, styleValue);\n    }\n  }\n};\n\nDOM.matches = function (element, query) {\n  if (typeof element.matches !== 'undefined') {\n    return element.matches(query);\n  } else {\n    if (typeof element.matchesSelector !== 'undefined') {\n      return element.matchesSelector(query);\n    } else if (typeof element.webkitMatchesSelector !== 'undefined') {\n      return element.webkitMatchesSelector(query);\n    } else if (typeof element.mozMatchesSelector !== 'undefined') {\n      return element.mozMatchesSelector(query);\n    } else if (typeof element.msMatchesSelector !== 'undefined') {\n      return element.msMatchesSelector(query);\n    }\n  }\n};\n\nDOM.remove = function (element) {\n  if (typeof element.remove !== 'undefined') {\n    element.remove();\n  } else {\n    if (element.parentNode) {\n      element.parentNode.removeChild(element);\n    }\n  }\n};\n\nDOM.queryChildren = function (element, selector) {\n  return Array.prototype.filter.call(element.childNodes, function (child) {\n    return DOM.matches(child, selector);\n  });\n};\n\nmodule.exports = DOM;\n\n},{}],4:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar EventElement = function (element) {\n  this.element = element;\n  this.events = {};\n};\n\nEventElement.prototype.bind = function (eventName, handler) {\n  if (typeof this.events[eventName] === 'undefined') {\n    this.events[eventName] = [];\n  }\n  this.events[eventName].push(handler);\n  this.element.addEventListener(eventName, handler, false);\n};\n\nEventElement.prototype.unbind = function (eventName, handler) {\n  var isHandlerProvided = (typeof handler !== 'undefined');\n  this.events[eventName] = this.events[eventName].filter(function (hdlr) {\n    if (isHandlerProvided && hdlr !== handler) {\n      return true;\n    }\n    this.element.removeEventListener(eventName, hdlr, false);\n    return false;\n  }, this);\n};\n\nEventElement.prototype.unbindAll = function () {\n  for (var name in this.events) {\n    this.unbind(name);\n  }\n};\n\nvar EventManager = function () {\n  this.eventElements = [];\n};\n\nEventManager.prototype.eventElement = function (element) {\n  var ee = this.eventElements.filter(function (eventElement) {\n    return eventElement.element === element;\n  })[0];\n  if (typeof ee === 'undefined') {\n    ee = new EventElement(element);\n    this.eventElements.push(ee);\n  }\n  return ee;\n};\n\nEventManager.prototype.bind = function (element, eventName, handler) {\n  this.eventElement(element).bind(eventName, handler);\n};\n\nEventManager.prototype.unbind = function (element, eventName, handler) {\n  this.eventElement(element).unbind(eventName, handler);\n};\n\nEventManager.prototype.unbindAll = function () {\n  for (var i = 0; i < this.eventElements.length; i++) {\n    this.eventElements[i].unbindAll();\n  }\n};\n\nEventManager.prototype.once = function (element, eventName, handler) {\n  var ee = this.eventElement(element);\n  var onceHandler = function (e) {\n    ee.unbind(eventName, onceHandler);\n    handler(e);\n  };\n  ee.bind(eventName, onceHandler);\n};\n\nmodule.exports = EventManager;\n\n},{}],5:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nmodule.exports = (function () {\n  function s4() {\n    return Math.floor((1 + Math.random()) * 0x10000)\n               .toString(16)\n               .substring(1);\n  }\n  return function () {\n    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +\n           s4() + '-' + s4() + s4() + s4();\n  };\n})();\n\n},{}],6:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar cls = require('./class')\n  , d = require('./dom');\n\nexports.toInt = function (x) {\n  return parseInt(x, 10) || 0;\n};\n\nexports.clone = function (obj) {\n  if (obj === null) {\n    return null;\n  } else if (typeof obj === 'object') {\n    var result = {};\n    for (var key in obj) {\n      result[key] = this.clone(obj[key]);\n    }\n    return result;\n  } else {\n    return obj;\n  }\n};\n\nexports.extend = function (original, source) {\n  var result = this.clone(original);\n  for (var key in source) {\n    result[key] = this.clone(source[key]);\n  }\n  return result;\n};\n\nexports.isEditable = function (el) {\n  return d.matches(el, \"input,[contenteditable]\") ||\n         d.matches(el, \"select,[contenteditable]\") ||\n         d.matches(el, \"textarea,[contenteditable]\") ||\n         d.matches(el, \"button,[contenteditable]\");\n};\n\nexports.removePsClasses = function (element) {\n  var clsList = cls.list(element);\n  for (var i = 0; i < clsList.length; i++) {\n    var className = clsList[i];\n    if (className.indexOf('ps-') === 0) {\n      cls.remove(element, className);\n    }\n  }\n};\n\nexports.outerWidth = function (element) {\n  return this.toInt(d.css(element, 'width')) +\n         this.toInt(d.css(element, 'paddingLeft')) +\n         this.toInt(d.css(element, 'paddingRight')) +\n         this.toInt(d.css(element, 'borderLeftWidth')) +\n         this.toInt(d.css(element, 'borderRightWidth'));\n};\n\nexports.startScrolling = function (element, axis) {\n  cls.add(element, 'ps-in-scrolling');\n  if (typeof axis !== 'undefined') {\n    cls.add(element, 'ps-' + axis);\n  } else {\n    cls.add(element, 'ps-x');\n    cls.add(element, 'ps-y');\n  }\n};\n\nexports.stopScrolling = function (element, axis) {\n  cls.remove(element, 'ps-in-scrolling');\n  if (typeof axis !== 'undefined') {\n    cls.remove(element, 'ps-' + axis);\n  } else {\n    cls.remove(element, 'ps-x');\n    cls.remove(element, 'ps-y');\n  }\n};\n\nexports.env = {\n  isWebKit: 'WebkitAppearance' in document.documentElement.style,\n  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),\n  supportsIePointer: window.navigator.msMaxTouchPoints !== null\n};\n\n},{\"./class\":2,\"./dom\":3}],7:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar destroy = require('./plugin/destroy')\n  , initialize = require('./plugin/initialize')\n  , update = require('./plugin/update');\n\nmodule.exports = {\n  initialize: initialize,\n  update: update,\n  destroy: destroy\n};\n\n},{\"./plugin/destroy\":9,\"./plugin/initialize\":17,\"./plugin/update\":21}],8:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nmodule.exports = {\n  maxScrollbarLength: null,\n  minScrollbarLength: null,\n  scrollXMarginOffset: 0,\n  scrollYMarginOffset: 0,\n  stopPropagationOnClick: true,\n  suppressScrollX: false,\n  suppressScrollY: false,\n  swipePropagation: true,\n  useBothWheelAxes: false,\n  useKeyboard: true,\n  useSelectionScroll: false,\n  wheelPropagation: false,\n  wheelSpeed: 1\n};\n\n},{}],9:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar d = require('../lib/dom')\n  , h = require('../lib/helper')\n  , instances = require('./instances');\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n\n  if (!i) {\n    return;\n  }\n\n  i.event.unbindAll();\n  d.remove(i.scrollbarX);\n  d.remove(i.scrollbarY);\n  d.remove(i.scrollbarXRail);\n  d.remove(i.scrollbarYRail);\n  h.removePsClasses(element);\n\n  instances.remove(element);\n};\n\n},{\"../lib/dom\":3,\"../lib/helper\":6,\"./instances\":18}],10:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar h = require('../../lib/helper')\n  , instances = require('../instances')\n  , updateGeometry = require('../update-geometry')\n  , updateScroll = require('../update-scroll');\n\nfunction bindClickRailHandler(element, i) {\n  function pageOffset(el) {\n    return el.getBoundingClientRect();\n  }\n  var stopPropagation = window.Event.prototype.stopPropagation.bind;\n\n  if (i.settings.stopPropagationOnClick) {\n    i.event.bind(i.scrollbarY, 'click', stopPropagation);\n  }\n  i.event.bind(i.scrollbarYRail, 'click', function (e) {\n    var halfOfScrollbarLength = h.toInt(i.scrollbarYHeight / 2);\n    var positionTop = i.railYRatio * (e.pageY - window.scrollY - pageOffset(i.scrollbarYRail).top - halfOfScrollbarLength);\n    var maxPositionTop = i.railYRatio * (i.railYHeight - i.scrollbarYHeight);\n    var positionRatio = positionTop / maxPositionTop;\n\n    if (positionRatio < 0) {\n      positionRatio = 0;\n    } else if (positionRatio > 1) {\n      positionRatio = 1;\n    }\n\n    updateScroll(element, 'top', (i.contentHeight - i.containerHeight) * positionRatio);\n    updateGeometry(element);\n\n    e.stopPropagation();\n  });\n\n  if (i.settings.stopPropagationOnClick) {\n    i.event.bind(i.scrollbarX, 'click', stopPropagation);\n  }\n  i.event.bind(i.scrollbarXRail, 'click', function (e) {\n    var halfOfScrollbarLength = h.toInt(i.scrollbarXWidth / 2);\n    var positionLeft = i.railXRatio * (e.pageX - window.scrollX - pageOffset(i.scrollbarXRail).left - halfOfScrollbarLength);\n    var maxPositionLeft = i.railXRatio * (i.railXWidth - i.scrollbarXWidth);\n    var positionRatio = positionLeft / maxPositionLeft;\n\n    if (positionRatio < 0) {\n      positionRatio = 0;\n    } else if (positionRatio > 1) {\n      positionRatio = 1;\n    }\n\n    updateScroll(element, 'left', ((i.contentWidth - i.containerWidth) * positionRatio) - i.negativeScrollAdjustment);\n    updateGeometry(element);\n\n    e.stopPropagation();\n  });\n}\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n  bindClickRailHandler(element, i);\n};\n\n},{\"../../lib/helper\":6,\"../instances\":18,\"../update-geometry\":19,\"../update-scroll\":20}],11:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar d = require('../../lib/dom')\n  , h = require('../../lib/helper')\n  , instances = require('../instances')\n  , updateGeometry = require('../update-geometry')\n  , updateScroll = require('../update-scroll');\n\nfunction bindMouseScrollXHandler(element, i) {\n  var currentLeft = null;\n  var currentPageX = null;\n\n  function updateScrollLeft(deltaX) {\n    var newLeft = currentLeft + (deltaX * i.railXRatio);\n    var maxLeft = i.scrollbarXRail.getBoundingClientRect().left + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));\n\n    if (newLeft < 0) {\n      i.scrollbarXLeft = 0;\n    } else if (newLeft > maxLeft) {\n      i.scrollbarXLeft = maxLeft;\n    } else {\n      i.scrollbarXLeft = newLeft;\n    }\n\n    var scrollLeft = h.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;\n    updateScroll(element, 'left', scrollLeft);\n  }\n\n  var mouseMoveHandler = function (e) {\n    updateScrollLeft(e.pageX - currentPageX);\n    updateGeometry(element);\n    e.stopPropagation();\n    e.preventDefault();\n  };\n\n  var mouseUpHandler = function () {\n    h.stopScrolling(element, 'x');\n    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);\n  };\n\n  i.event.bind(i.scrollbarX, 'mousedown', function (e) {\n    currentPageX = e.pageX;\n    currentLeft = h.toInt(d.css(i.scrollbarX, 'left')) * i.railXRatio;\n    h.startScrolling(element, 'x');\n\n    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);\n    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);\n\n    e.stopPropagation();\n    e.preventDefault();\n  });\n}\n\nfunction bindMouseScrollYHandler(element, i) {\n  var currentTop = null;\n  var currentPageY = null;\n\n  function updateScrollTop(deltaY) {\n    var newTop = currentTop + (deltaY * i.railYRatio);\n    var maxTop = i.scrollbarYRail.getBoundingClientRect().top + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));\n\n    if (newTop < 0) {\n      i.scrollbarYTop = 0;\n    } else if (newTop > maxTop) {\n      i.scrollbarYTop = maxTop;\n    } else {\n      i.scrollbarYTop = newTop;\n    }\n\n    var scrollTop = h.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));\n    updateScroll(element, 'top', scrollTop);\n  }\n\n  var mouseMoveHandler = function (e) {\n    updateScrollTop(e.pageY - currentPageY);\n    updateGeometry(element);\n    e.stopPropagation();\n    e.preventDefault();\n  };\n\n  var mouseUpHandler = function () {\n    h.stopScrolling(element, 'y');\n    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);\n  };\n\n  i.event.bind(i.scrollbarY, 'mousedown', function (e) {\n    currentPageY = e.pageY;\n    currentTop = h.toInt(d.css(i.scrollbarY, 'top')) * i.railYRatio;\n    h.startScrolling(element, 'y');\n\n    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);\n    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);\n\n    e.stopPropagation();\n    e.preventDefault();\n  });\n}\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n  bindMouseScrollXHandler(element, i);\n  bindMouseScrollYHandler(element, i);\n};\n\n},{\"../../lib/dom\":3,\"../../lib/helper\":6,\"../instances\":18,\"../update-geometry\":19,\"../update-scroll\":20}],12:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar h = require('../../lib/helper')\n  , instances = require('../instances')\n  , updateGeometry = require('../update-geometry')\n  , updateScroll = require('../update-scroll');\n\nfunction bindKeyboardHandler(element, i) {\n  var hovered = false;\n  i.event.bind(element, 'mouseenter', function () {\n    hovered = true;\n  });\n  i.event.bind(element, 'mouseleave', function () {\n    hovered = false;\n  });\n\n  var shouldPrevent = false;\n  function shouldPreventDefault(deltaX, deltaY) {\n    var scrollTop = element.scrollTop;\n    if (deltaX === 0) {\n      if (!i.scrollbarYActive) {\n        return false;\n      }\n      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {\n        return !i.settings.wheelPropagation;\n      }\n    }\n\n    var scrollLeft = element.scrollLeft;\n    if (deltaY === 0) {\n      if (!i.scrollbarXActive) {\n        return false;\n      }\n      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {\n        return !i.settings.wheelPropagation;\n      }\n    }\n    return true;\n  }\n\n  i.event.bind(i.ownerDocument, 'keydown', function (e) {\n    if (e.isDefaultPrevented && e.isDefaultPrevented()) {\n      return;\n    }\n\n    if (!hovered) {\n      return;\n    }\n\n    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;\n    if (activeElement) {\n      // go deeper if element is a webcomponent\n      while (activeElement.shadowRoot) {\n        activeElement = activeElement.shadowRoot.activeElement;\n      }\n      if (h.isEditable(activeElement)) {\n        return;\n      }\n    }\n\n    var deltaX = 0;\n    var deltaY = 0;\n\n    switch (e.which) {\n    case 37: // left\n      deltaX = -30;\n      break;\n    case 38: // up\n      deltaY = 30;\n      break;\n    case 39: // right\n      deltaX = 30;\n      break;\n    case 40: // down\n      deltaY = -30;\n      break;\n    case 33: // page up\n      deltaY = 90;\n      break;\n    case 32: // space bar\n      if (e.shiftKey) {\n        deltaY = 90;\n      } else {\n        deltaY = -90;\n      }\n      break;\n    case 34: // page down\n      deltaY = -90;\n      break;\n    case 35: // end\n      if (e.ctrlKey) {\n        deltaY = -i.contentHeight;\n      } else {\n        deltaY = -i.containerHeight;\n      }\n      break;\n    case 36: // home\n      if (e.ctrlKey) {\n        deltaY = element.scrollTop;\n      } else {\n        deltaY = i.containerHeight;\n      }\n      break;\n    default:\n      return;\n    }\n\n    updateScroll(element, 'top', element.scrollTop - deltaY);\n    updateScroll(element, 'left', element.scrollLeft + deltaX);\n    updateGeometry(element);\n\n    shouldPrevent = shouldPreventDefault(deltaX, deltaY);\n    if (shouldPrevent) {\n      e.preventDefault();\n    }\n  });\n}\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n  bindKeyboardHandler(element, i);\n};\n\n},{\"../../lib/helper\":6,\"../instances\":18,\"../update-geometry\":19,\"../update-scroll\":20}],13:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar h = require('../../lib/helper')\n  , instances = require('../instances')\n  , updateGeometry = require('../update-geometry')\n  , updateScroll = require('../update-scroll');\n\nfunction bindMouseWheelHandler(element, i) {\n  var shouldPrevent = false;\n\n  function shouldPreventDefault(deltaX, deltaY) {\n    var scrollTop = element.scrollTop;\n    if (deltaX === 0) {\n      if (!i.scrollbarYActive) {\n        return false;\n      }\n      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {\n        return !i.settings.wheelPropagation;\n      }\n    }\n\n    var scrollLeft = element.scrollLeft;\n    if (deltaY === 0) {\n      if (!i.scrollbarXActive) {\n        return false;\n      }\n      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {\n        return !i.settings.wheelPropagation;\n      }\n    }\n    return true;\n  }\n\n  function getDeltaFromEvent(e) {\n    var deltaX = e.deltaX;\n    var deltaY = -1 * e.deltaY;\n\n    if (typeof deltaX === \"undefined\" || typeof deltaY === \"undefined\") {\n      // OS X Safari\n      deltaX = -1 * e.wheelDeltaX / 6;\n      deltaY = e.wheelDeltaY / 6;\n    }\n\n    if (e.deltaMode && e.deltaMode === 1) {\n      // Firefox in deltaMode 1: Line scrolling\n      deltaX *= 10;\n      deltaY *= 10;\n    }\n\n    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {\n      // IE in some mouse drivers\n      deltaX = 0;\n      deltaY = e.wheelDelta;\n    }\n\n    return [deltaX, deltaY];\n  }\n\n  function shouldBeConsumedByTextarea(deltaX, deltaY) {\n    var hoveredTextarea = element.querySelector('textarea:hover');\n    if (hoveredTextarea) {\n      var maxScrollTop = hoveredTextarea.scrollHeight - hoveredTextarea.clientHeight;\n      if (maxScrollTop > 0) {\n        if (!(hoveredTextarea.scrollTop === 0 && deltaY > 0) &&\n            !(hoveredTextarea.scrollTop === maxScrollTop && deltaY < 0)) {\n          return true;\n        }\n      }\n      var maxScrollLeft = hoveredTextarea.scrollLeft - hoveredTextarea.clientWidth;\n      if (maxScrollLeft > 0) {\n        if (!(hoveredTextarea.scrollLeft === 0 && deltaX < 0) &&\n            !(hoveredTextarea.scrollLeft === maxScrollLeft && deltaX > 0)) {\n          return true;\n        }\n      }\n    }\n    return false;\n  }\n\n  function mousewheelHandler(e) {\n    // FIXME: this is a quick fix for the select problem in FF and IE.\n    // If there comes an effective way to deal with the problem,\n    // this lines should be removed.\n    if (!h.env.isWebKit && element.querySelector('select:focus')) {\n      return;\n    }\n\n    var delta = getDeltaFromEvent(e);\n\n    var deltaX = delta[0];\n    var deltaY = delta[1];\n\n    if (shouldBeConsumedByTextarea(deltaX, deltaY)) {\n      return;\n    }\n\n    shouldPrevent = false;\n    if (!i.settings.useBothWheelAxes) {\n      // deltaX will only be used for horizontal scrolling and deltaY will\n      // only be used for vertical scrolling - this is the default\n      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));\n      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));\n    } else if (i.scrollbarYActive && !i.scrollbarXActive) {\n      // only vertical scrollbar is active and useBothWheelAxes option is\n      // active, so let's scroll vertical bar using both mouse wheel axes\n      if (deltaY) {\n        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));\n      } else {\n        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));\n      }\n      shouldPrevent = true;\n    } else if (i.scrollbarXActive && !i.scrollbarYActive) {\n      // useBothWheelAxes and only horizontal bar is active, so use both\n      // wheel axes for horizontal bar\n      if (deltaX) {\n        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));\n      } else {\n        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));\n      }\n      shouldPrevent = true;\n    }\n\n    updateGeometry(element);\n\n    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));\n    if (shouldPrevent) {\n      e.stopPropagation();\n      e.preventDefault();\n    }\n  }\n\n  if (typeof window.onwheel !== \"undefined\") {\n    i.event.bind(element, 'wheel', mousewheelHandler);\n  } else if (typeof window.onmousewheel !== \"undefined\") {\n    i.event.bind(element, 'mousewheel', mousewheelHandler);\n  }\n}\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n  bindMouseWheelHandler(element, i);\n};\n\n},{\"../../lib/helper\":6,\"../instances\":18,\"../update-geometry\":19,\"../update-scroll\":20}],14:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar instances = require('../instances')\n  , updateGeometry = require('../update-geometry');\n\nfunction bindNativeScrollHandler(element, i) {\n  i.event.bind(element, 'scroll', function () {\n    updateGeometry(element);\n  });\n}\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n  bindNativeScrollHandler(element, i);\n};\n\n},{\"../instances\":18,\"../update-geometry\":19}],15:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar h = require('../../lib/helper')\n  , instances = require('../instances')\n  , updateGeometry = require('../update-geometry')\n  , updateScroll = require('../update-scroll');\n\nfunction bindSelectionHandler(element, i) {\n  function getRangeNode() {\n    var selection = window.getSelection ? window.getSelection() :\n                    document.getSelection ? document.getSelection() : '';\n    if (selection.toString().length === 0) {\n      return null;\n    } else {\n      return selection.getRangeAt(0).commonAncestorContainer;\n    }\n  }\n\n  var scrollingLoop = null;\n  var scrollDiff = {top: 0, left: 0};\n  function startScrolling() {\n    if (!scrollingLoop) {\n      scrollingLoop = setInterval(function () {\n        if (!instances.get(element)) {\n          clearInterval(scrollingLoop);\n          return;\n        }\n\n        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);\n        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);\n        updateGeometry(element);\n      }, 50); // every .1 sec\n    }\n  }\n  function stopScrolling() {\n    if (scrollingLoop) {\n      clearInterval(scrollingLoop);\n      scrollingLoop = null;\n    }\n    h.stopScrolling(element);\n  }\n\n  var isSelected = false;\n  i.event.bind(i.ownerDocument, 'selectionchange', function () {\n    if (element.contains(getRangeNode())) {\n      isSelected = true;\n    } else {\n      isSelected = false;\n      stopScrolling();\n    }\n  });\n  i.event.bind(window, 'mouseup', function () {\n    if (isSelected) {\n      isSelected = false;\n      stopScrolling();\n    }\n  });\n\n  i.event.bind(window, 'mousemove', function (e) {\n    if (isSelected) {\n      var mousePosition = {x: e.pageX, y: e.pageY};\n      var containerGeometry = {\n        left: element.offsetLeft,\n        right: element.offsetLeft + element.offsetWidth,\n        top: element.offsetTop,\n        bottom: element.offsetTop + element.offsetHeight\n      };\n\n      if (mousePosition.x < containerGeometry.left + 3) {\n        scrollDiff.left = -5;\n        h.startScrolling(element, 'x');\n      } else if (mousePosition.x > containerGeometry.right - 3) {\n        scrollDiff.left = 5;\n        h.startScrolling(element, 'x');\n      } else {\n        scrollDiff.left = 0;\n      }\n\n      if (mousePosition.y < containerGeometry.top + 3) {\n        if (containerGeometry.top + 3 - mousePosition.y < 5) {\n          scrollDiff.top = -5;\n        } else {\n          scrollDiff.top = -20;\n        }\n        h.startScrolling(element, 'y');\n      } else if (mousePosition.y > containerGeometry.bottom - 3) {\n        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {\n          scrollDiff.top = 5;\n        } else {\n          scrollDiff.top = 20;\n        }\n        h.startScrolling(element, 'y');\n      } else {\n        scrollDiff.top = 0;\n      }\n\n      if (scrollDiff.top === 0 && scrollDiff.left === 0) {\n        stopScrolling();\n      } else {\n        startScrolling();\n      }\n    }\n  });\n}\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n  bindSelectionHandler(element, i);\n};\n\n},{\"../../lib/helper\":6,\"../instances\":18,\"../update-geometry\":19,\"../update-scroll\":20}],16:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar instances = require('../instances')\n  , updateGeometry = require('../update-geometry')\n  , updateScroll = require('../update-scroll');\n\nfunction bindTouchHandler(element, i, supportsTouch, supportsIePointer) {\n  function shouldPreventDefault(deltaX, deltaY) {\n    var scrollTop = element.scrollTop;\n    var scrollLeft = element.scrollLeft;\n    var magnitudeX = Math.abs(deltaX);\n    var magnitudeY = Math.abs(deltaY);\n\n    if (magnitudeY > magnitudeX) {\n      // user is perhaps trying to swipe up/down the page\n\n      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||\n          ((deltaY > 0) && (scrollTop === 0))) {\n        return !i.settings.swipePropagation;\n      }\n    } else if (magnitudeX > magnitudeY) {\n      // user is perhaps trying to swipe left/right across the page\n\n      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||\n          ((deltaX > 0) && (scrollLeft === 0))) {\n        return !i.settings.swipePropagation;\n      }\n    }\n\n    return true;\n  }\n\n  function applyTouchMove(differenceX, differenceY) {\n    updateScroll(element, 'top', element.scrollTop - differenceY);\n    updateScroll(element, 'left', element.scrollLeft - differenceX);\n\n    updateGeometry(element);\n  }\n\n  var startOffset = {};\n  var startTime = 0;\n  var speed = {};\n  var easingLoop = null;\n  var inGlobalTouch = false;\n  var inLocalTouch = false;\n\n  function globalTouchStart() {\n    inGlobalTouch = true;\n  }\n  function globalTouchEnd() {\n    inGlobalTouch = false;\n  }\n\n  function getTouch(e) {\n    if (e.targetTouches) {\n      return e.targetTouches[0];\n    } else {\n      // Maybe IE pointer\n      return e;\n    }\n  }\n  function shouldHandle(e) {\n    if (e.targetTouches && e.targetTouches.length === 1) {\n      return true;\n    }\n    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {\n      return true;\n    }\n    return false;\n  }\n  function touchStart(e) {\n    if (shouldHandle(e)) {\n      inLocalTouch = true;\n\n      var touch = getTouch(e);\n\n      startOffset.pageX = touch.pageX;\n      startOffset.pageY = touch.pageY;\n\n      startTime = (new Date()).getTime();\n\n      if (easingLoop !== null) {\n        clearInterval(easingLoop);\n      }\n\n      e.stopPropagation();\n    }\n  }\n  function touchMove(e) {\n    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {\n      var touch = getTouch(e);\n\n      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};\n\n      var differenceX = currentOffset.pageX - startOffset.pageX;\n      var differenceY = currentOffset.pageY - startOffset.pageY;\n\n      applyTouchMove(differenceX, differenceY);\n      startOffset = currentOffset;\n\n      var currentTime = (new Date()).getTime();\n\n      var timeGap = currentTime - startTime;\n      if (timeGap > 0) {\n        speed.x = differenceX / timeGap;\n        speed.y = differenceY / timeGap;\n        startTime = currentTime;\n      }\n\n      if (shouldPreventDefault(differenceX, differenceY)) {\n        e.stopPropagation();\n        e.preventDefault();\n      }\n    }\n  }\n  function touchEnd() {\n    if (!inGlobalTouch && inLocalTouch) {\n      inLocalTouch = false;\n\n      clearInterval(easingLoop);\n      easingLoop = setInterval(function () {\n        if (!instances.get(element)) {\n          clearInterval(easingLoop);\n          return;\n        }\n\n        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {\n          clearInterval(easingLoop);\n          return;\n        }\n\n        applyTouchMove(speed.x * 30, speed.y * 30);\n\n        speed.x *= 0.8;\n        speed.y *= 0.8;\n      }, 10);\n    }\n  }\n\n  if (supportsTouch) {\n    i.event.bind(window, 'touchstart', globalTouchStart);\n    i.event.bind(window, 'touchend', globalTouchEnd);\n    i.event.bind(element, 'touchstart', touchStart);\n    i.event.bind(element, 'touchmove', touchMove);\n    i.event.bind(element, 'touchend', touchEnd);\n  }\n\n  if (supportsIePointer) {\n    if (window.PointerEvent) {\n      i.event.bind(window, 'pointerdown', globalTouchStart);\n      i.event.bind(window, 'pointerup', globalTouchEnd);\n      i.event.bind(element, 'pointerdown', touchStart);\n      i.event.bind(element, 'pointermove', touchMove);\n      i.event.bind(element, 'pointerup', touchEnd);\n    } else if (window.MSPointerEvent) {\n      i.event.bind(window, 'MSPointerDown', globalTouchStart);\n      i.event.bind(window, 'MSPointerUp', globalTouchEnd);\n      i.event.bind(element, 'MSPointerDown', touchStart);\n      i.event.bind(element, 'MSPointerMove', touchMove);\n      i.event.bind(element, 'MSPointerUp', touchEnd);\n    }\n  }\n}\n\nmodule.exports = function (element, supportsTouch, supportsIePointer) {\n  var i = instances.get(element);\n  bindTouchHandler(element, i, supportsTouch, supportsIePointer);\n};\n\n},{\"../instances\":18,\"../update-geometry\":19,\"../update-scroll\":20}],17:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar cls = require('../lib/class')\n  , h = require('../lib/helper')\n  , instances = require('./instances')\n  , updateGeometry = require('./update-geometry');\n\n// Handlers\nvar clickRailHandler = require('./handler/click-rail')\n  , dragScrollbarHandler = require('./handler/drag-scrollbar')\n  , keyboardHandler = require('./handler/keyboard')\n  , mouseWheelHandler = require('./handler/mouse-wheel')\n  , nativeScrollHandler = require('./handler/native-scroll')\n  , selectionHandler = require('./handler/selection')\n  , touchHandler = require('./handler/touch');\n\nmodule.exports = function (element, userSettings) {\n  userSettings = typeof userSettings === 'object' ? userSettings : {};\n\n  cls.add(element, 'ps-container');\n\n  // Create a plugin instance.\n  var i = instances.add(element);\n\n  i.settings = h.extend(i.settings, userSettings);\n\n  clickRailHandler(element);\n  dragScrollbarHandler(element);\n  mouseWheelHandler(element);\n  nativeScrollHandler(element);\n\n  if (i.settings.useSelectionScroll) {\n    selectionHandler(element);\n  }\n\n  if (h.env.supportsTouch || h.env.supportsIePointer) {\n    touchHandler(element, h.env.supportsTouch, h.env.supportsIePointer);\n  }\n  if (i.settings.useKeyboard) {\n    keyboardHandler(element);\n  }\n\n  updateGeometry(element);\n};\n\n},{\"../lib/class\":2,\"../lib/helper\":6,\"./handler/click-rail\":10,\"./handler/drag-scrollbar\":11,\"./handler/keyboard\":12,\"./handler/mouse-wheel\":13,\"./handler/native-scroll\":14,\"./handler/selection\":15,\"./handler/touch\":16,\"./instances\":18,\"./update-geometry\":19}],18:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar d = require('../lib/dom')\n  , defaultSettings = require('./default-setting')\n  , EventManager = require('../lib/event-manager')\n  , guid = require('../lib/guid')\n  , h = require('../lib/helper');\n\nvar instances = {};\n\nfunction Instance(element) {\n  var i = this;\n\n  i.settings = h.clone(defaultSettings);\n  i.containerWidth = null;\n  i.containerHeight = null;\n  i.contentWidth = null;\n  i.contentHeight = null;\n\n  i.isRtl = d.css(element, 'direction') === \"rtl\";\n  i.isNegativeScroll = (function () {\n    var originalScrollLeft = element.scrollLeft;\n    var result = null;\n    element.scrollLeft = -1;\n    result = element.scrollLeft < 0;\n    element.scrollLeft = originalScrollLeft;\n    return result;\n  })();\n  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;\n  i.event = new EventManager();\n  i.ownerDocument = element.ownerDocument || document;\n\n  i.scrollbarXRail = d.appendTo(d.e('div', 'ps-scrollbar-x-rail'), element);\n  i.scrollbarX = d.appendTo(d.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);\n  i.scrollbarXActive = null;\n  i.scrollbarXWidth = null;\n  i.scrollbarXLeft = null;\n  i.scrollbarXBottom = h.toInt(d.css(i.scrollbarXRail, 'bottom'));\n  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN\n  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : h.toInt(d.css(i.scrollbarXRail, 'top'));\n  i.railBorderXWidth = h.toInt(d.css(i.scrollbarXRail, 'borderLeftWidth')) + h.toInt(d.css(i.scrollbarXRail, 'borderRightWidth'));\n  // Set rail to display:block to calculate margins\n  d.css(i.scrollbarXRail, 'display', 'block');\n  i.railXMarginWidth = h.toInt(d.css(i.scrollbarXRail, 'marginLeft')) + h.toInt(d.css(i.scrollbarXRail, 'marginRight'));\n  d.css(i.scrollbarXRail, 'display', '');\n  i.railXWidth = null;\n  i.railXRatio = null;\n\n  i.scrollbarYRail = d.appendTo(d.e('div', 'ps-scrollbar-y-rail'), element);\n  i.scrollbarY = d.appendTo(d.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);\n  i.scrollbarYActive = null;\n  i.scrollbarYHeight = null;\n  i.scrollbarYTop = null;\n  i.scrollbarYRight = h.toInt(d.css(i.scrollbarYRail, 'right'));\n  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN\n  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : h.toInt(d.css(i.scrollbarYRail, 'left'));\n  i.scrollbarYOuterWidth = i.isRtl ? h.outerWidth(i.scrollbarY) : null;\n  i.railBorderYWidth = h.toInt(d.css(i.scrollbarYRail, 'borderTopWidth')) + h.toInt(d.css(i.scrollbarYRail, 'borderBottomWidth'));\n  d.css(i.scrollbarYRail, 'display', 'block');\n  i.railYMarginHeight = h.toInt(d.css(i.scrollbarYRail, 'marginTop')) + h.toInt(d.css(i.scrollbarYRail, 'marginBottom'));\n  d.css(i.scrollbarYRail, 'display', '');\n  i.railYHeight = null;\n  i.railYRatio = null;\n}\n\nfunction getId(element) {\n  if (typeof element.dataset === 'undefined') {\n    return element.getAttribute('data-ps-id');\n  } else {\n    return element.dataset.psId;\n  }\n}\n\nfunction setId(element, id) {\n  if (typeof element.dataset === 'undefined') {\n    element.setAttribute('data-ps-id', id);\n  } else {\n    element.dataset.psId = id;\n  }\n}\n\nfunction removeId(element) {\n  if (typeof element.dataset === 'undefined') {\n    element.removeAttribute('data-ps-id');\n  } else {\n    delete element.dataset.psId;\n  }\n}\n\nexports.add = function (element) {\n  var newId = guid();\n  setId(element, newId);\n  instances[newId] = new Instance(element);\n  return instances[newId];\n};\n\nexports.remove = function (element) {\n  delete instances[getId(element)];\n  removeId(element);\n};\n\nexports.get = function (element) {\n  return instances[getId(element)];\n};\n\n},{\"../lib/dom\":3,\"../lib/event-manager\":4,\"../lib/guid\":5,\"../lib/helper\":6,\"./default-setting\":8}],19:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar cls = require('../lib/class')\n  , d = require('../lib/dom')\n  , h = require('../lib/helper')\n  , instances = require('./instances')\n  , updateScroll = require('./update-scroll');\n\nfunction getThumbSize(i, thumbSize) {\n  if (i.settings.minScrollbarLength) {\n    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);\n  }\n  if (i.settings.maxScrollbarLength) {\n    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);\n  }\n  return thumbSize;\n}\n\nfunction updateCss(element, i) {\n  var xRailOffset = {width: i.railXWidth};\n  if (i.isRtl) {\n    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;\n  } else {\n    xRailOffset.left = element.scrollLeft;\n  }\n  if (i.isScrollbarXUsingBottom) {\n    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;\n  } else {\n    xRailOffset.top = i.scrollbarXTop + element.scrollTop;\n  }\n  d.css(i.scrollbarXRail, xRailOffset);\n\n  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};\n  if (i.isScrollbarYUsingRight) {\n    if (i.isRtl) {\n      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;\n    } else {\n      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;\n    }\n  } else {\n    if (i.isRtl) {\n      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;\n    } else {\n      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;\n    }\n  }\n  d.css(i.scrollbarYRail, yRailOffset);\n\n  d.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});\n  d.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});\n}\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n\n  i.containerWidth = element.clientWidth;\n  i.containerHeight = element.clientHeight;\n  i.contentWidth = element.scrollWidth;\n  i.contentHeight = element.scrollHeight;\n\n  var existingRails;\n  if (!element.contains(i.scrollbarXRail)) {\n    existingRails = d.queryChildren(element, '.ps-scrollbar-x-rail');\n    if (existingRails.length > 0) {\n      existingRails.forEach(function (rail) {\n        d.remove(rail);\n      });\n    }\n    d.appendTo(i.scrollbarXRail, element);\n  }\n  if (!element.contains(i.scrollbarYRail)) {\n    existingRails = d.queryChildren(element, '.ps-scrollbar-y-rail');\n    if (existingRails.length > 0) {\n      existingRails.forEach(function (rail) {\n        d.remove(rail);\n      });\n    }\n    d.appendTo(i.scrollbarYRail, element);\n  }\n\n  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {\n    i.scrollbarXActive = true;\n    i.railXWidth = i.containerWidth - i.railXMarginWidth;\n    i.railXRatio = i.containerWidth / i.railXWidth;\n    i.scrollbarXWidth = getThumbSize(i, h.toInt(i.railXWidth * i.containerWidth / i.contentWidth));\n    i.scrollbarXLeft = h.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));\n  } else {\n    i.scrollbarXActive = false;\n    i.scrollbarXWidth = 0;\n    i.scrollbarXLeft = 0;\n    element.scrollLeft = 0;\n  }\n\n  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {\n    i.scrollbarYActive = true;\n    i.railYHeight = i.containerHeight - i.railYMarginHeight;\n    i.railYRatio = i.containerHeight / i.railYHeight;\n    i.scrollbarYHeight = getThumbSize(i, h.toInt(i.railYHeight * i.containerHeight / i.contentHeight));\n    i.scrollbarYTop = h.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));\n  } else {\n    i.scrollbarYActive = false;\n    i.scrollbarYHeight = 0;\n    i.scrollbarYTop = 0;\n    updateScroll(element, 'top', 0);\n  }\n\n  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {\n    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;\n  }\n  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {\n    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;\n  }\n\n  updateCss(element, i);\n\n  cls[i.scrollbarXActive ? 'add' : 'remove'](element, 'ps-active-x');\n  cls[i.scrollbarYActive ? 'add' : 'remove'](element, 'ps-active-y');\n};\n\n},{\"../lib/class\":2,\"../lib/dom\":3,\"../lib/helper\":6,\"./instances\":18,\"./update-scroll\":20}],20:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar instances = require('./instances');\n\nvar upEvent = document.createEvent('Event')\n  , downEvent = document.createEvent('Event')\n  , leftEvent = document.createEvent('Event')\n  , rightEvent = document.createEvent('Event')\n  , yEvent = document.createEvent('Event')\n  , xEvent = document.createEvent('Event')\n  , xStartEvent = document.createEvent('Event')\n  , xEndEvent = document.createEvent('Event')\n  , yStartEvent = document.createEvent('Event')\n  , yEndEvent = document.createEvent('Event')\n  , lastTop\n  , lastLeft;\n\nupEvent.initEvent('ps-scroll-up', true, true);\ndownEvent.initEvent('ps-scroll-down', true, true);\nleftEvent.initEvent('ps-scroll-left', true, true);\nrightEvent.initEvent('ps-scroll-right', true, true);\nyEvent.initEvent('ps-scroll-y', true, true);\nxEvent.initEvent('ps-scroll-x', true, true);\nxStartEvent.initEvent('ps-x-reach-start', true, true);\nxEndEvent.initEvent('ps-x-reach-end', true, true);\nyStartEvent.initEvent('ps-y-reach-start', true, true);\nyEndEvent.initEvent('ps-y-reach-end', true, true);\n\nmodule.exports = function (element, axis, value) {\n  if (typeof element === 'undefined') {\n    throw 'You must provide an element to the update-scroll function';\n  }\n\n  if (typeof axis === 'undefined') {\n    throw 'You must provide an axis to the update-scroll function';\n  }\n\n  if (typeof value === 'undefined') {\n    throw 'You must provide a value to the update-scroll function';\n  }\n\n  if (axis === 'top' && value <= 0) {\n    element.scrollTop = 0;\n    element.dispatchEvent(yStartEvent);\n    return; // don't allow negative scroll\n  }\n\n  if (axis === 'left' && value <= 0) {\n    element.scrollLeft = 0;\n    element.dispatchEvent(xStartEvent);\n    return; // don't allow negative scroll\n  }\n\n  var i = instances.get(element);\n\n  if (axis === 'top' && value > i.contentHeight - i.containerHeight) {\n    element.scrollTop = i.contentHeight - i.containerHeight;\n    element.dispatchEvent(yEndEvent);\n    return; // don't allow scroll past container\n  }\n\n  if (axis === 'left' && value > i.contentWidth - i.containerWidth) {\n    element.scrollLeft = i.contentWidth - i.containerWidth;\n    element.dispatchEvent(xEndEvent);\n    return; // don't allow scroll past container\n  }\n\n  if (!lastTop) {\n    lastTop = element.scrollTop;\n  }\n\n  if (!lastLeft) {\n    lastLeft = element.scrollLeft;\n  }\n\n  if (axis === 'top' && value < lastTop) {\n    element.dispatchEvent(upEvent);\n  }\n\n  if (axis === 'top' && value > lastTop) {\n    element.dispatchEvent(downEvent);\n  }\n\n  if (axis === 'left' && value < lastLeft) {\n    element.dispatchEvent(leftEvent);\n  }\n\n  if (axis === 'left' && value > lastLeft) {\n    element.dispatchEvent(rightEvent);\n  }\n\n  if (axis === 'top') {\n    element.scrollTop = lastTop = value;\n    element.dispatchEvent(yEvent);\n  }\n\n  if (axis === 'left') {\n    element.scrollLeft = lastLeft = value;\n    element.dispatchEvent(xEvent);\n  }\n\n};\n\n},{\"./instances\":18}],21:[function(require,module,exports){\n/* Copyright (c) 2015 Hyunje Alex Jun and other contributors\n * Licensed under the MIT License\n */\n'use strict';\n\nvar d = require('../lib/dom')\n  , h = require('../lib/helper')\n  , instances = require('./instances')\n  , updateGeometry = require('./update-geometry');\n\nmodule.exports = function (element) {\n  var i = instances.get(element);\n\n  if (!i) {\n    return;\n  }\n\n  // Recalcuate negative scrollLeft adjustment\n  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;\n\n  // Recalculate rail margins\n  d.css(i.scrollbarXRail, 'display', 'block');\n  d.css(i.scrollbarYRail, 'display', 'block');\n  i.railXMarginWidth = h.toInt(d.css(i.scrollbarXRail, 'marginLeft')) + h.toInt(d.css(i.scrollbarXRail, 'marginRight'));\n  i.railYMarginHeight = h.toInt(d.css(i.scrollbarYRail, 'marginTop')) + h.toInt(d.css(i.scrollbarYRail, 'marginBottom'));\n\n  // Hide scrollbars not to affect scrollWidth and scrollHeight\n  d.css(i.scrollbarXRail, 'display', 'none');\n  d.css(i.scrollbarYRail, 'display', 'none');\n\n  updateGeometry(element);\n\n  d.css(i.scrollbarXRail, 'display', '');\n  d.css(i.scrollbarYRail, 'display', '');\n};\n\n},{\"../lib/dom\":3,\"../lib/helper\":6,\"./instances\":18,\"./update-geometry\":19}]},{},[1]);\n"

/***/ }

/******/ });