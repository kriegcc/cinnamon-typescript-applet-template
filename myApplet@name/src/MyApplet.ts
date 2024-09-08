import { Metadata } from "types"
import { logger } from "utils/logging"

const { Applet } = imports.ui.applet

export class MyApplet extends Applet {
  constructor(metadata: Metadata, orientation: imports.gi.St.Side, panelHeight: number, instanceId: number) {
    super(orientation, panelHeight, instanceId)

    logger.logInfo("MyApplet constructor called.")
  }
}
