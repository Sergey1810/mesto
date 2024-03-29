export default class Section{
  constructor({items, renderer}, section){
    this._items = items,
    this._renderer = renderer,
    this._section = document.querySelector(section);
  }

  rendererItems(){
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element){
    this._section.append(element);
  }

  addCard(element){
    this._section.prepend(element);
  }
}