'use strict';

class Car {
  constructor() {
    this.container = document.querySelector('.container-car');
    this.categoryItem = document.querySelector('#category-cars');
    this.categoryItem.addEventListener('change', (e) => {
      this.container.innerHTML = '';
      this.getCategory(e.target.value);
    });
  }

  newCard(car) {
    let card = document.createElement('div');
    card.classList.add('item-card');
    card.innerHTML = `<div class="img" style="background: url('${car.img}') no-repeat center; background-size: cover;"></div>
                      <div class="about"><h3 class="name">${car.name}</h3>
                      <p class="category">${this.upperCaseStr(car.category)}</p>
                      <p class="description">${this.upperCaseStr(this.sliseStr(car.description))}<span class="price">${car.price}$</span></p>
                      <p class="descriptionAll">${this.upperCaseStr(car.description)}<span class="price">${car.price}$</span></p>
                      </div>`;
    this.container.appendChild(card);
  }

  getJSON() {
    return fetch('file.json').then(response => response.json());
  }

  getCategory(category) {
    this.getJSON().then(json => {
      for (let i = 0; i < json.cars.length; i++) {
        if (category == 'all') {
          this.newCard(json.cars[i]);
        } else if (category == json.cars[i].category) {
          this.newCard(json.cars[i]);
        }
      }
    });
  }

  upperCaseStr(str) {
    return (str[0].toUpperCase() + str.slice(1));
  }
  
  sliseStr(str) {
    return (str.length > 135) ? (str = str.slice(0, 132) + '...') : str;
  }
}

let car = new Car();
car.getCategory('all');