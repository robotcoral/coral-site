import { Injectable } from "@angular/core";
import { openSearchPanel } from "@codemirror/search";
import { redo, undo } from "../editor/util/codemirror.setup";
import { EditorViewComponent } from "../editor/view/editor-view.component";
import { GeneralSettingsService } from "./settings/general.settings.service";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root",
})
export class EditorController {
  private editor: EditorViewComponent;
  unsavedChanges: boolean = false;

  constructor(
    private utilService: UtilService,
    private settingsService: GeneralSettingsService
  ) {}

  undo() {
    undo(this.editor.view);
  }

  redo() {
    redo(this.editor.view);
  }

  zoomIn() {
    const fontSize = this.settingsService.settings.font_size + 2;
    this.settingsService.setSetting("font_size", fontSize);
  }

  zoomOut() {
    const fontSize = this.settingsService.settings.font_size - 2;
    this.settingsService.setSetting("font_size", fontSize);
  }

  resetFontSize() {
    this.settingsService.setSetting("font_size", 16);
  }

  cut() {
    this.clipboardEvent("cut");
  }

  copy() {
    this.clipboardEvent("copy");
  }

  paste() {
    this.clipboardEvent("paste");
  }

  openSearchPanel() {
    openSearchPanel(this.editor.view);
  }

  exportToString() {
    return this.editor.view.state.doc.toString();
  }

  export() {
    this.utilService.dyanmicDownloadByHtmlTag({
      title: "code.txt",
      content: this.exportToString(),
      fileType: "text/plain",
    });
    this.unsavedChanges = false;
  }

  loadString(text: string) {
    this.setState(text);
  }

  import() {
    const callback = async (event: Event) => {
      const file: File = (event.target as HTMLInputElement).files[0];
      try {
        if (!file) throw new Error("ERRORS.FILE_UPLOAD_FAILED");

        this.loadString(await file.text());
      } catch (error) {
        this.utilService.translateError(error);
      }
    };
    this.utilService.upload(".txt", callback);
  }

  setState(text = "") {
    const callback = () => {
      const transaction = this.editor.view.state.update({
        changes: {
          from: 0,
          to: this.editor.view.state.doc.length,
          insert: text,
        },
      });
      this.editor.view.update([transaction]);
      // prevents editor setting unsavedChanges to true instantly
      setTimeout(() => {
        this.unsavedChanges = false;
      }, 100);
    };

    if (!this.unsavedChanges) return callback();
  }

  private clipboardEvent(event: string) {
    this.editor.view.contentDOM.dispatchEvent(new ClipboardEvent(event));
  }

  setEditor(editor: EditorViewComponent) {
    this.editor = editor;
  }
}
