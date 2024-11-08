export const ThemeNode = {
  new: (
    context = null,
    parent_node = null,
    theme = null,
    element_type: {},
    element_id = "",
    element_class = "",
    pseudo_class = "",
    inline_style = "",
    important = false,
  ) => ({
    get_horizontal_padding: () => 0,
    get_border_width: () => 0,
  }),
}

export const ThemeContext = {
  get_for_stage: () => ({
    get_theme: () => {},
  }),
}

export const Widget = {}
