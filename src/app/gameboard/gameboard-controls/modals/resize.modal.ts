import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinates3 } from '../../utils/coordinates';

@Component({
  selector: 'resize-modal',
  template: `
    <div id="modal">
      <div class="modal-header">
        <h4 class="modal-title">Resize World</h4>
        <button
          type="button"
          class="close"
          aria-label="Close"
          (click)="activeModal.dismiss('Cross click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form [formGroup]="formGroup">
          <div class="inputWrapper">
            <div class="nameField">Length:</div>
            <input type="number" name="length" formControlName="length" />
          </div>
          <div class="inputWrapper">
            <div class="nameField">Width:</div>
            <input type="number" name="width" formControlName="width" />
          </div>
          <div class="inputWrapper">
            <div class="nameField">Height:</div>
            <input type="number" name="height" formControlName="height" />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="onApply()">
          Apply
        </button>
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.dismiss('Close click')"
        >
          Close
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./modal.styles.scss'],
})
export class ResizeModal {
  @Input() options: Coordinates3;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  init(coo: Coordinates3) {
    this.formGroup = this.formBuilder.group({
      length: [
        coo.x,
        [Validators.required, Validators.min(0), Validators.max(1024)],
      ],
      width: [
        coo.y,
        [Validators.required, Validators.min(0), Validators.max(1024)],
      ],
      height: [
        coo.z,
        [Validators.required, Validators.min(0), Validators.max(256)],
      ],
    });
  }

  onApply() {
    if (this.formGroup.invalid) return;
    const size: Coordinates3 = {
      x: this.formGroup.value.width,
      y: this.formGroup.value.length,
      z: this.formGroup.value.height,
    };
    this.activeModal.close(size);
  }
}
