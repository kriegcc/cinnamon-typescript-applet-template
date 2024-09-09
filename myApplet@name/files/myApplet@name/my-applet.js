var myApplet;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  main: () => (/* binding */ main)
});

;// CONCATENATED MODULE: ./src/consts/common.ts
const UUID = "myApplet@name";
const APPLET_DIR = imports.ui.appletManager.appletMeta[UUID].path;

;// CONCATENATED MODULE: ./src/consts/index.ts


;// CONCATENATED MODULE: ./src/utils/logging/Logger.ts

const { isError } = imports.ui.main;
const DEFAULT_LOG_LEVEL = "Info";
const logLevelPriority = {
    Error: 1,
    Warning: 2,
    Info: 3,
    Debug: 4,
};
class Logger {
    constructor(instanceId, logLevel = DEFAULT_LOG_LEVEL) {
        this.instanceId = instanceId;
        this.logLevel = logLevel;
    }
    setInstanceId(instanceId) {
        this.instanceId = instanceId;
    }
    setLogLevel(logLevel) {
        this.logLevel = logLevel;
    }
    logInfo(...msg) {
        if (this.canLog("Info")) {
            global.log(this.formatMessage("Info", ...msg));
        }
    }
    logDebug(...msg) {
        if (this.canLog("Debug")) {
            global.log(this.formatMessage("Debug", ...msg));
        }
    }
    logWarning(...msg) {
        if (this.canLog("Warning")) {
            global.logWarning(this.formatMessage("Warning", ...msg));
        }
    }
    logError(msg, error) {
        if (this.canLog("Error")) {
            global.logError(this.formatMessage("Error", msg));
            if (this.isCjsOrGlibError(error)) {
                global.logError(error);
            }
        }
    }
    formatMessage(logLevel, ...msg) {
        const formattedMessage = msg.join(" ");
        return `[${UUID}#${this.instanceId}:${logLevel}]: ${formattedMessage}`;
    }
    canLog(logLevel) {
        return logLevelPriority[logLevel] <= logLevelPriority[this.logLevel];
    }
    isCjsOrGlibError(error) {
        return isError(error);
    }
}
const logger = new Logger();

;// CONCATENATED MODULE: ./src/utils/logging/index.ts


;// CONCATENATED MODULE: ./src/utils/translation/translation.ts

const Gettext = imports.gettext;
function _(text) {
    const translated = Gettext.dgettext(UUID, text);
    if (translated !== text) {
        return translated;
    }
    return Gettext.gettext(text);
}

;// CONCATENATED MODULE: ./src/utils/translation/index.ts


;// CONCATENATED MODULE: ./src/MyApplet.ts


const { TextIconApplet, AppletPopupMenu } = imports.ui.applet;
const { AppletSettings } = imports.ui.settings;
const { PopupMenuManager, PopupMenuItem } = imports.ui.popupMenu;
class MyApplet extends TextIconApplet {
    constructor(metadata, orientation, panelHeight, instanceId) {
        super(orientation, panelHeight, instanceId);
        this.settingsObject = {};
        this.metadata = metadata;
        this.uuid = metadata.uuid;
        this.orientation = orientation;
        this.panelHeight = panelHeight;
        this.instanceId = instanceId;
        logger.logInfo("Log line from MyApplet's constructor ...");
        this.actor.set_style_class_name("my-applet");
        this.set_applet_icon_name("info");
        this.set_applet_tooltip(_("my applet tooltip"));
        this.bindSettings();
        this.updateAppletLabel();
        this.initPopupMenu();
    }
    on_applet_clicked(_) {
        logger.logInfo("My applet was clicked on ...");
        this.appletPopup.toggle();
        return false;
    }
    on_orientation_changed(orientation) {
        logger.logInfo("Orientation changed! The applet might moved to a vertical panel. New orientation: ", orientation);
        this.orientation = orientation;
    }
    on_panel_height_changed() {
        logger.logInfo("Panel height changed! New height: ", this._panelHeight);
        this.panelHeight = this._panelHeight;
    }
    on_applet_removed_from_panel() {
        logger.logInfo("The applet was removed from the panel. Anything to clean up?");
    }
    bindSettings() {
        this.settings = new AppletSettings(this.settingsObject, this.uuid, this.instanceId);
        this.settings.bind("keyAppletLabel", "appletLabel", this.updateAppletLabel.bind(this));
    }
    updateAppletLabel() {
        this.set_applet_label(this.settingsObject.appletLabel);
    }
    initPopupMenu() {
        this.popupMenuManager = new PopupMenuManager(this);
        this.appletPopup = new AppletPopupMenu(this, this.orientation);
        this.popupMenuManager.addMenu(this.appletPopup);
        const textMenuItem = new PopupMenuItem(_("Example popup item"));
        this.appletPopup.addMenuItem(textMenuItem);
    }
}

;// CONCATENATED MODULE: ./src/applet.ts



const applet_Gettext = imports.gettext;
const { GLib } = imports.gi;
function main(metadata, orientation, panelHeight, instanceId) {
    applet_Gettext.bindtextdomain(UUID, GLib.get_home_dir() + "/.local/share/locale");
    logger.setInstanceId(instanceId);
    return new MyApplet(metadata, orientation, panelHeight, instanceId);
}

myApplet = __webpack_exports__;
/******/ })()
;