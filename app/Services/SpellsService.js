import store from "../store.js";
import Spell from "../Models/Spell.js";

//@ts-ignore
let _spellApi = axios.create({
  baseURL: "https://www.dnd5eapi.co/api/spells",
  timeout: 3000
})

// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/Riley/spells",
  timeout: 3000
})

class SpellsService {


  getAllApiSpells() {
    _spellApi
      .get("")
      .then(res => {
        store.commit("spells", res.data.results)
        console.log("from service", store.State.spells)
      })
      .catch(error => {
        console.error(error)
      })
  }

  getSpellById(url) {


    _spellApi
      .get(url)
      .then(res => {
        let spell = new Spell(res.data)
        store.commit("activeSpell", spell)
        console.log("from spell by id", store.State.activeSpell)
      })
  }

  getAllMySpells() {
    _sandboxApi
      .get("")
      .then(res => {
        let mySpell = res.data.data.map(s => new Spell(s))
        store.commit("mySpells", mySpell)
      })
      .catch(error => {
        console.error(error)
      })
  }

  getMySpellById(id) {
    _sandboxApi
      .get(id)
      .then(res => {
        let spell = new Spell(res.data.data)
        store.commit("activeSpell", spell)
      })
      .catch(error => {
        console.error(error)
      })
  }

  setMySpell(id) {
    let spell = store.State.mySpells.find(s => s._id == id)
    store.commit("activeSpell", spell)
  }


  // 'catch' from example
  addMySpell() {

    let spellDescription = store.State.activeSpell.description
    if (typeof spellDescription != "string") {

      spellDescription = spellDescription.join()
      store.State.activeSpell.description = spellDescription

    }

    console.log("FROM ADD SPELL", spellDescription)

    _sandboxApi
      .post("", store.State.activeSpell)
      .then(res => {
        let newSpell = store.State.activeSpell
        let mySpells = [...store.State.mySpells, newSpell]
        store.commit("mySpells", mySpells)

      })
      .catch(error => {
        console.error(error)
      })
  }

  removeMySpell() {
    _sandboxApi
      .delete(store.State.activeSpell._id)
      .then(res => {
        let filteredSpells = store.State.mySpells.filter(s => s._id != store.State.activeSpell._id)
        store.commit("mySpells", filteredSpells)
        store.commit("activeSpell", null)
      })
      .catch(error => {
        console.error(error)
      })
  }



}

const service = new SpellsService();
export default service;
