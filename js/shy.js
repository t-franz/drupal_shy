(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    global.CKEditor5 = global.CKEditor5 || {};
    global.CKEditor5.shy = factory();
  }
}(self, (() => (() => {
  var modulesMap = {
          "ckeditor5/src/core.js": (module, exports, requireFn) => {
              module.exports = requireFn("dll-reference CKEditor5.dll")("./src/core.js")
          },
          "ckeditor5/src/ui.js": (module, exports, requireFn) => {
              module.exports = requireFn("dll-reference CKEditor5.dll")("./src/ui.js")
          },
          "dll-reference CKEditor5.dll": (module) => {
              "use strict";
              module.exports = CKEditor5.dll
          }
      },
      modulesCache = {};

  function requireModule(moduleId) {
      var cachedModule = modulesCache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }

      var module = modulesCache[moduleId] = { exports: {} };
      modulesMap[moduleId](module, module.exports, requireModule);
      return module.exports;
  }
  requireModule.d = (exports, definition) => {
      Object.keys(definition).forEach((key) => {
        if (!requireModule.o(exports, key) && requireModule.o(definition, key)) {
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        }
      });
  };
  requireModule.o = (object, property) => Object.prototype.hasOwnProperty.call(object, property);
  var api = {};
  return (() => {
      "use strict";
      requireModule.d(api, {
          default: () => ShyPlugin
      });
      var core = requireModule("ckeditor5/src/core.js");
      class InsertShyCommand extends core.Command {
          execute() {
              this.editor.model.change((writer) => {
                  const viewFragment = this.editor.data.processor.toView("<shy>&shy;</shy>");
                  const modelFragment = this.editor.data.toModel(viewFragment);
                  this.editor.model.insertContent(modelFragment);
              });
          }
      }

      class ShyPlugin extends core.Plugin {
          _defineSchema() {
              this.editor.model.schema.register("shy", {
                  allowWhere: "$text",
                  isInline: true
              });
          }

          _defineConverters() {
              this.editor.conversion.elementToElement({
                  model: "shy",
                  view: "shy"
              });
          }

          init() {
              const editor = this.editor;
              this.editor.commands.add("shy", new InsertShyCommand(this.editor));
              this._defineSchema();
              this._defineConverters();

              editor.keystrokes.set(["ctrl", 45], (data, stopCallback) => {
                  editor.commands.execute("shy");
                  stopCallback();
              });
          }
      }

      var ui = requireModule("ckeditor5/src/ui.js");
      class ShyButtonPlugin extends core.Plugin {
          init() {
              const editor = this.editor;
              editor.ui.componentFactory.add("shy", (locale) => {
                  const view = new ui.ButtonView(locale);
                  view.set({
                      label: "Insert non-breaking space",
                      icon: '<svg viewBox="0 0 32 30" width="32" height="30" xmlns="http://www.w3.org/2000/svg"><path d="m5.6 14.8c0-3.5 1-6.4 2.6-9.2l2.2.9c-1.4 2.6-2 5.5-2 8.3s.6 5.7 2 8.3l-2.1.9c-1.7-2.8-2.7-5.7-2.7-9.2z"/><path d="m12.3 14.2h7.8v2.2h-7.8z"/><path d="m22.1 23.1c1.4-2.6 2-5.5 2-8.3s-.6-5.7-2-8.3l2.2-.9c1.7 2.8 2.6 5.6 2.6 9.2 0 3.5-1 6.4-2.6 9.2z"/></svg>',
                      tooltip: true
                  });
                  view.on("execute", () => {
                      editor.model.change((writer) => {
                          editor.commands.execute("shy");
                      });
                  });
                  return view;
              });
          }
      }

      class ShyPluginWrapper extends core.Plugin {
          static get pluginName() {
              return "Shy"
          }

          static get requires() {
              return [ShyPlugin, ShyButtonPlugin]
          }
      }
      const exportedPlugins = {
          Shy: ShyPluginWrapper
      }
      return exportedPlugins;
  })(), api = api.default
})())));
