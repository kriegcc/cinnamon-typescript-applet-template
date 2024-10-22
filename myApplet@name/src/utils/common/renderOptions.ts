const DEFAULT_APPLET_CLASS_NAME = "applet-box"

export type AnimationRotation = 0 | 90 | 180 | 270
export type RenderOptions = {
  width?: number
  height?: number
  rotation?: AnimationRotation
}

export type RenderOptionSettings = {
  isInHorizontalPanel: boolean
  panelHeight: number

  isAutoMargin: boolean
  customMargin: number

  isRotated: boolean
  // rotation: AnimationRotation
}

export function getThemeNodeOfClass(className: string): imports.gi.St.ThemeNode {
  const themeContext = imports.gi.St.ThemeContext.get_for_stage(global.stage)
  const themeNode = imports.gi.St.ThemeNode.new(
    themeContext,
    null,
    themeContext.get_theme(),
    imports.gi.St.Widget,
    "",
    className,
    "",
    // "inline_style": undocumented argument.
    // Bug: Using empty string here causes an error in console. See: https://gitlab.gnome.org/GNOME/gnome-shell/-/issues/4634
    " ",
    // "important": undocumented argument.
    // Fallback lookup in default Cinnamon theme, I guess. Seems to be something CJS specific (argument is not in GJS).
    true,
  )
  return themeNode
}

export function determineRenderOptionsFromSettings(props: RenderOptionSettings): RenderOptions {
  const { isInHorizontalPanel, panelHeight, isAutoMargin, customMargin, isRotated } = props

  let height = undefined
  let width = undefined
  let rotation: AnimationRotation | undefined = undefined

  if (isRotated) {
    rotation = 90
  }

  global.log("--> getDefaultAppletMargin:", getDefaultAppletMargin())
  const margins = isAutoMargin ? getDefaultAppletMargin() : customMargin

  if (isInHorizontalPanel) {
    if (isRotated) {
      height = undefined
      width = panelHeight - margins
    } else {
      height = panelHeight - margins
      width = undefined
    }
  } else {
    if (isRotated) {
      height = panelHeight - margins
      width = undefined
    } else {
      height = undefined
      width = panelHeight - margins
    }
  }

  const renderOptions: RenderOptions = {
    height,
    width,
    rotation,
  }
  return renderOptions
}

export function getDefaultAppletMargin(): number {
  // reads and calculate margins from active CSS stylesheet, element "applet-box"
  const themeNode = getThemeNodeOfClass(DEFAULT_APPLET_CLASS_NAME)
  const margin =
    themeNode.get_horizontal_padding() +
    themeNode.get_border_width(imports.gi.St.Side.TOP) +
    themeNode.get_border_width(imports.gi.St.Side.BOTTOM)
  return margin
}
