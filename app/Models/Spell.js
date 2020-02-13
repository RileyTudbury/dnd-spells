export default class Spell {
  constructor(data) {

    this.sandbox = data.desc ? true : false;
    this.url = data.url || null
    this.index = data.index || null
    this._id = data._id || ''
    this.name = data.name
    this.description = data.desc || data.description
    this.range = data.range
    this.duration = data.duration
    this.components = data.components
    this.user = data.user

  }


  get Button() {
    if (this.sandbox) {
      return `<button class="btn btn-secondary" onclick="app.spellsController.addMySpell()">Add Spell</button>`
    }
    return `<button class="btn btn-danger" onclick="app.spellsController.removeMySpell()">Remove Spell</button>`
  }


  // <textarea >${this.description}</textarea>
  get Template() {
    return `                   <div class="card">
    <h5 class="card-header">${this.name}</h5>
    <div class="card-body">
        
        <p class="card-text">${this.description}
        </p>
        ${this.Button}     
    </div>
</div>`
  }
}