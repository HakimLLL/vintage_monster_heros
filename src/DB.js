 export default class DB {
  static setApiURL(data) {
    this.apiURL = data;
  }

  static async findAll() {
    const response = await fetch(this.apiURL + "vintage_monster_hero");
    return response.json();
  }
  
// ajout d'un monstre
static async create(data) {
  const response = await fetch(this.apiURL + "vintage_monster_hero", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}


// suppression d'un monstre par id
static async deleteOneById(id) {
  const response = await fetch(this.apiURL + "vintage_monster_hero/" + id, {
    method: "DELETE",
  });
  return response.json();
}
 }