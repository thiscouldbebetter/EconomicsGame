"use strict";
class Action2 extends Action {
    constructor(name, perform2) {
        super(name, null);
        this.perform2 = perform2;
    }
    static Instances2() {
        if (Action2._instances2 == null) {
            Action2._instances2 = new Action2_Instances();
        }
        return Action2._instances2;
    }
}
class Action2_Instances {
    constructor() {
        this.Activate = new Action2("Activate", (world, level, actor) => {
            level.cursor.activate(null, world, level);
        });
        this.Cancel = new Action2("Cancel", (world, level, actor) => {
            level.cursor.cancel(world, level);
        });
        this.MoveDown = new Action2("MoveDown", (world, level, actor) => {
            level.cursor.moveInDirection(level, Coords.fromXY(0, 1));
        });
        this.MoveLeft = new Action2("MoveLeft", (world, level, actor) => {
            level.cursor.moveInDirection(level, Coords.fromXY(-1, 0));
        });
        this.MoveRight = new Action2("MoveRight", (world, level, actor) => {
            level.cursor.moveInDirection(level, Coords.fromXY(1, 0));
        });
        this.MoveUp = new Action2("MoveUp", (world, level, actor) => {
            level.cursor.moveInDirection(level, Coords.fromXY(0, -1));
        });
        this.SelectNext = new Action2("SelectNext", (world, level, actor) => {
            level.cursor.selectInDirection(world, level, 1);
        });
        this.SelectPrevious = new Action2("SelectPrevious", (world, level, actor) => {
            level.cursor.selectInDirection(world, level, -1);
        });
        this._All =
            [
                this.Activate,
                this.Cancel,
                this.MoveDown,
                this.MoveLeft,
                this.MoveRight,
                this.MoveUp,
                this.SelectNext,
                this.SelectPrevious,
            ];
    }
}
