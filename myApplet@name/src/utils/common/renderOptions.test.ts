import { determineRenderOptionsFromSettings, RenderOptions, RenderOptionSettings } from "./renderOptions"

// Mock getThemeNodeOfClass before importing renderOptions
jest.mock("./theme", () => ({
  getThemeNodeOfClass: jest.fn(() => ({
    get_horizontal_padding: () => 0,
    get_border_width: () => 0,
  })),
}))

jest.mock("./renderOptions", () => {
  const originalModule = jest.requireActual("./renderOptions")
  return {
    ...originalModule,
    getDefaultAppletMargin: jest.fn(() => 8),
  }
})

// test("should return default render options when all flags are false", () => {
//   const props: RenderOptionSettings = {
//     isInHorizontalPanel: false,
//     panelHeight: 40,
//     isAutoMargin: false,
//     customMargin: 0,
//     isAutoFit: false,
//     isPreserveAnimationOriginalDimensions: false,
//     isPreserveAspectRation: false,
//     customHeight: 0,
//     customWidth: 0,
//     isRotated: false,
//   }

//   const expectedRenderOptions: RenderOptions = {
//     height: undefined,
//     width: undefined,
//     rotation: undefined,
//   }

//   expect(determineRenderOptionsFromSettings(props)).toEqual(expectedRenderOptions)
// })

test("should ignore custom margin when auto margin is enabled", () => {
  const props: RenderOptionSettings = {
    isInHorizontalPanel: true,
    panelHeight: 40,
    isAutoMargin: true,
    customMargin: 10,
    isRotated: false,
  }

  const expectedRenderOptions: RenderOptions = {
    height: 32,
    width: undefined,
    rotation: undefined,
  }

  expect(determineRenderOptionsFromSettings(props)).toEqual(expectedRenderOptions)
})
