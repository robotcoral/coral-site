import { Component, ViewChild } from '@angular/core';
import { GameboardViewComponent } from './gameboard-view/gameboard-view.component';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent {
  @ViewChild(GameboardViewComponent)
  gameboardView: GameboardViewComponent;

  move() {
    this.gameboardView.move();
  }

  rotate(dir = 1) {
    this.gameboardView.rotate(dir);
  }

  place(color: string) {
    if (color) this.gameboardView.placeSlab(color);
    else this.gameboardView.placeBlock();
  }

  pickUp() {
    this.gameboardView.pickUpSlab();
  }
}
