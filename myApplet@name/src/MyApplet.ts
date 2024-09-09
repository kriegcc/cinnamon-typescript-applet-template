import { AppletSettingsProps, Metadata } from "types"
import { logger } from "utils/logging"
import { _ } from "utils/translation"

const { TextIconApplet, AppletPopupMenu } = imports.ui.applet
const { AppletSettings } = imports.ui.settings
const { PopupMenuManager, PopupMenuItem } = imports.ui.popupMenu

export class MyApplet extends TextIconApplet {
  private metadata: Metadata
  private uuid: string
  private orientation: imports.gi.St.Side
  private panelHeight: number
  private instanceId: number

  // ------ settings --------

  // initialized in helper function bindSettings()
  private settings!: imports.ui.settings.AppletSettings
  // props of this object are initialized and bound by AppletSetting
  private settingsObject = {} as AppletSettingsProps

  // -------------------------

  // ------ popup menu --------

  // initialized in helper function initPopupMenu()
  private popupMenuManager!: imports.ui.popupMenu.PopupMenuManager
  private appletPopup!: imports.ui.applet.AppletPopupMenu

  // ---------------------------

  constructor(metadata: Metadata, orientation: imports.gi.St.Side, panelHeight: number, instanceId: number) {
    super(orientation, panelHeight, instanceId)

    this.metadata = metadata
    this.uuid = metadata.uuid
    this.orientation = orientation
    this.panelHeight = panelHeight
    this.instanceId = instanceId

    logger.logInfo("Log line from MyApplet's constructor ...")

    // set class for custom styling, see stylesheet.css
    this.actor.set_style_class_name("my-applet")

    this.set_applet_icon_name("info")
    // string gets translated ("_"-function)
    this.set_applet_tooltip(_("my applet tooltip"))

    this.bindSettings()
    this.updateAppletLabel()
    this.initPopupMenu()
  }

  public override on_applet_clicked(_: imports.gi.Clutter.Event): boolean {
    logger.logInfo("My applet was clicked on ...")
    this.appletPopup.toggle()

    // no need to continue the emission
    return false
  }

  public override on_orientation_changed(orientation: imports.gi.St.Side): void {
    logger.logInfo("Orientation changed! The applet might moved to a vertical panel. New orientation: ", orientation)
    this.orientation = orientation
  }

  public override on_panel_height_changed(): void {
    logger.logInfo("Panel height changed! New height: ", this._panelHeight)
    this.panelHeight = this._panelHeight
  }

  public override on_applet_removed_from_panel(): void {
    logger.logInfo("The applet was removed from the panel. Anything to clean up?")
  }

  private bindSettings(): void {
    // applet settings setup (settings menu)
    // properties are defined in settings-schema.json
    // See: https://projects.linuxmint.com/reference/git/cinnamon-tutorials/xlet-settings.html
    this.settings = new AppletSettings(this.settingsObject, this.uuid, this.instanceId)

    this.settings.bind("keyAppletLabel", "appletLabel", this.updateAppletLabel.bind(this))
  }

  private updateAppletLabel(): void {
    this.set_applet_label(this.settingsObject.appletLabel)
  }

  private initPopupMenu(): void {
    this.popupMenuManager = new PopupMenuManager(this)
    this.appletPopup = new AppletPopupMenu(this, this.orientation)
    this.popupMenuManager.addMenu(this.appletPopup)

    const textMenuItem = new PopupMenuItem(_("Example popup item"))
    this.appletPopup.addMenuItem(textMenuItem)
  }
}
