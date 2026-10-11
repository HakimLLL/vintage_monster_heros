import DB from "../../DB";
import Monster from "../monster/Monster";
import getTemplate from "./template";

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
    this.render();
  }

  getMonstersCount(){
  return this.monsters.length;
}
renderMonstersCount(){
  this.domElt.querySelector(".monsters-count").innerText= this.getMonstersCount();
}


  render() {
    this.domElt.innerHTML = getTemplate();
    this.listDomElt = this.domElt.querySelector(".monster-list");
    this.monsters.forEach((monster) => this.listDomElt.append(monster.render()));
    this.renderMonstersCount();
    this.initEvents()
  }

async addMonster(data) {
  const monster = await DB.create(data);
  const newMonster = new Monster(monster);
  this.monsters.push(newMonster);
  this.listDomElt.append(newMonster.render());
  this.renderMonstersCount();
}


initEvents() {
  const nameInput = this.domElt.querySelector(".new-name");
  const typeInput = this.domElt.querySelector(".new-type");
  const dangerInput = this.domElt.querySelector(".new-danger");
  const yearInput = this.domElt.querySelector(".new-year");

  this.domElt.querySelector(".btn-add").addEventListener("click", () => {
    if (nameInput.value == "") return;
    this.addMonster({
      name: nameInput.value,
      type: typeInput.value,
      dangerLevel: Number(dangerInput.value),
      year: Number(yearInput.value),
    });
    nameInput.value = "";
    dangerInput.value = "";
    yearInput.value = "";
  });

  this.listDomElt.addEventListener("monster:deleted", async (e) => {
  await this.deleteOneById(e.detail.id);
});
}

async deleteOneById(id) {
  await DB.deleteOneById(id);

  this.monsters.splice(
    this.monsters.findIndex((monster) => monster.id == id),
    1,
  );

  this.domElt.querySelector(`[data-id='${id}']`).remove();
  this.renderMonstersCount();
}
}