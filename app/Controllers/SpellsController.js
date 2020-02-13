import SpellsService from "../Services/SpellsService.js";
import store from "../store.js";

//Private
function _draw() {
  let spells = store.State.spells;
  let template = `<h4>Spell List</h4>`
  spells.forEach(s => {
    // @ts-ignore
    template += `<li onclick="app.spellsController.getSpellById('${s.index}')">${s.name}</li>`
  })
  console.log(spells);
  console.log(store.State.mySpells)
  document.getElementById("spell-list").innerHTML = template
}

function _drawActiveSpell() {
  if (store.State.activeSpell) {
    document.getElementById("active-spell").innerHTML = store.State.activeSpell.Template
  }
  else {
    document.getElementById("active-spell").innerHTML = ""
  }

}

function _drawMySpells() {
  let mySpells = store.State.mySpells
  let template = "<h4>My Spell List</h4>"

  mySpells.forEach(s => {
    template += `<li onclick="app.spellsController.getMySpellById('${s._id}')">${s.name}</li>`
    document.getElementById("my-spells").innerHTML = template
  })
}




//Public
export default class SpellsController {
  constructor() {
    store.subscribe("spells", _draw);
    store.subscribe("activeSpell", _drawActiveSpell)
    store.subscribe("mySpells", _drawMySpells)

    SpellsService.getAllApiSpells();
    SpellsService.getAllMySpells();
  }

  getSpellById(url) {
    SpellsService.getSpellById(url)
  }

  getMySpellById(id) {
    console.log("hello there")
    SpellsService.getMySpellById(id)
  }
  setMySpell(id) {
    SpellsService.setMySpell(id)
  }

  addMySpell() {
    SpellsService.addMySpell()
  }

  removeMySpell() {
    SpellsService.removeMySpell()
  }


}
