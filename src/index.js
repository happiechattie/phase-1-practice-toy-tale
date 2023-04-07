let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    for (toy of data){
      makeCard(toy);}
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyFormContainer.querySelector('form').addEventListener('submit', e => {
    let newToy = {};
    let input = e.target.querySelectorAll('.input-text');
    newToy.name = input[0].value;
    newToy.image = input[1].value;
    newToy.likes = 0;

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify(newToy),
    })
    makeCard(newToy);
  })

  const makeCard = function(cardObj) {
    let card = document.createElement('div');
    card.className = 'card';
    let name = document.createElement('h2');
    name.innerText = cardObj.name;
    let image = document.createElement('img');
    image.src = cardObj.image;
    image.className = 'toy-avatar';
    let likes = document.createElement('p');
    likes.innerText = cardObj.likes + ' likes'
    document.getElementById('toy-collection').append(card);
    card.append(name);
    card.append(image);
    card.append(likes);
    let button = document.createElement('button');
    button.className = 'like-btn';
    button.id = toy.id;
    button.innerText = 'Like ❤️';
    button.addEventListener('click', e => {
      e.preventDefault();
      cardObj.likes += 1;
      fetch('http://localhost:3000/toys/' + cardObj.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'likes': cardObj.likes + 1
        }) 
      })
      .then(res => res.json())
      .then(data => {likes.innerText = cardObj.likes + ' likes'})
    })
    card.append(button);
  }
});

const removeToy = function (id) { 
  fetch('http://localhost:3000/toys/' + id, {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json',
    }
})}