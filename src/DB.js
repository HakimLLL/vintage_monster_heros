 export default class DB {
  static setApiURL(data) {
    this.apiURL = data;
  }

  static async findAll() {
    const response = await fetch(this.apiURL + "vintage_monster_hero");
    return response.json();
  }

static async create(data) {
  const response = await fetch(this.apiURL + "vintage_monster_hero", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
 }