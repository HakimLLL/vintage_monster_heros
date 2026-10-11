import DB from "../../DB";
import Monster from "../monster/Monster";

export default class MonsterList {
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    DB.setApiURL(data.apiURL);
    this.monsters = [];
    this.loadMonsters();
  }

  async loadMonsters() {
    const monsters = await DB.findAll();
    this.monsters = monsters.map((monster) => new Monster(monster));
    console.table(this.monsters);
  }
}
