class DB {
  static setApiURL(data) {
    this.apiURL = data;
  }

  static async findAll() {
    const response = await fetch(this.apiURL + "vintage_monster_hero");
    return response.json();
  }
}

class Monster {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.dangerLevel = data.dangerLevel;
    this.year = data.year;
  }
}

class MonsterList {
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

new MonsterList({
  el: "#app",
  apiURL: "https://6ac7986275a4ce3fe7220d6d.mockapi.io/",
});