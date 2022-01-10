import { Component } from "@angular/core";
import { EditorController } from "../common/editor.controller";
import { KarolInterpreter } from "../common/karol.interpreter";
import { GameboardController } from "../gameboard/utils";

@Component({
  selector: "app-titlebar",
  templateUrl: "./titlebar.component.html",
})
export class TitlebarComponent {
  originalOrder = () => 0;
  expanded = false;

  constructor(
    public gbController: GameboardController,
    private eController: EditorController,
    private interpreter: KarolInterpreter
  ) {}

  titlebar: { [key: string]: { [key: string]: Function } } = {
    FILE: {
      NEW: () => this.eController.setState(),
      IMPORT: () => this.eController.import(),
      EXPORT: () => this.eController.export(),
      SETTINGS: null,
    },
    EDIT: {
      UNDO: () => this.eController.undo(),
      REDO: () => this.eController.redo(),
      CUT: () => this.eController.cut(),
      COPY: () => this.eController.copy(),
      PASTE: () => this.eController.paste(),
      TOGGLE_COMMENTS: null,
    },
    EXECUTE: {
      START: () => this.interpreter.play(),
      STEP: () => this.interpreter.step(),
      PAUSE_UNPAUSE: null,
      STOP: () => this.interpreter.stop(),
      RAISE_SPEED: () => this.interpreter.raiseSpeed(),
      LOWER_SPEED: () => this.interpreter.lowerSpeed(),
      RESET_WORLD: null,
    },
    EDITOR: {
      ZOOM_IN: () => this.eController.zoomIn(),
      ZOOM_OUT: () => this.eController.zoomOut(),
      RESET: () => this.eController.resetFontSize(),
      SETTINGS: () => null,
      SEARCH_AND_REPLACE: () => this.eController.openSearchPanel(),
    },
    WORLD: {
      IMPORT: () => this.gbController.importWorld(),
      EXPORT: () => this.gbController.exportWorld(),
      RESET: () => this.gbController.reset(),
      SAVE: null,
      SETTINGS: () => null,
    },
    HELP: {
      DOCUMENTATION: () => window.open("https://docs.robotcoral.de"),
      INFO: () => window.open("https://robotcoral.de"),
      IMPRESSUM: () => window.open("https://robotcoral.de/impressum"),
      SUPPORT_US: null,
    },
  };

  click() {
    this.expanded = true;
  }

  mouseleave() {
    this.expanded = false;
  }
}
