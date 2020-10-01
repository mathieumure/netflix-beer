import _mapValues from "lodash/mapValues";

class CssVariablePlugin {
  constructor() {
    this.themes = null;
    this.defaultSelector = null;
  }

  buildTheme(theme) {
    return _mapValues(theme, value => {
      if (typeof value === "function") {
        return theme[value()];
      }
      return value;
    });
  }

  applyTheme(theme, elementOrSelector = this.defaultSelector) {
    const element =
      typeof elementOrSelector === "object"
        ? [elementOrSelector]
        : document.querySelectorAll(elementOrSelector);

    for (let [key, value] of Object.entries(this.themes[theme])) {
      let colorValue = value;
      if (typeof value === "function") {
        colorValue = this.themes[theme][value()];
      }
      element.forEach(it => it.style.setProperty(`--${key}`, colorValue));
    }
  }

  install(Vue, { themes, defaultTheme, querySelector = ":root" } = {}) {
    this.themes = _mapValues(themes, this.buildTheme);

    this.defaultSelector = querySelector;

    Vue.prototype.$styleVariables = {
      colors: theme => this.themes[theme],
      applyTheme: (theme, elementOrSelector) =>
        this.applyTheme(theme, elementOrSelector)
    };

    this.applyTheme(defaultTheme);
  }
}

const inst = new CssVariablePlugin();

export default inst;
