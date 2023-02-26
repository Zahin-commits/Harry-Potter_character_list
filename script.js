const listBtn = document.getElementById('listBtn')
const text = document.querySelector('.titles')
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')
const p3 = document.querySelector('.p3')
const home = document.getElementById('home-page')

const container = document.querySelector('.container')
const characterList = document.getElementById('characterList')
const searchBar = document.getElementById('search')

let timeout = 0;
let timeout2 = 100;
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>")
p1.innerHTML = p1.textContent.replace(/\s/g, " </span> <span>")
p2.innerHTML = p2.textContent.replace(/\s/g, " </span> <span>")
p3.innerHTML = p3.textContent.replace(/\s/g, " </span> <span>")

const letters = document.querySelectorAll('.main span')


function changeBackground() {
  home.classList.add('blur')
}

listBtn.addEventListener('click', () => {
  letters.forEach(alpha => {
    setTimeout(() => {
      alpha.classList.add('smoke')
    }, timeout);

    timeout += 90
  });

  setTimeout(changeBackground, timeout += 200);

  setTimeout(() => {
    home.style.display = 'none'
  }, timeout += 2000)

  setTimeout(() => {
    container.classList.add('active')
  }, timeout);

  getData()
})


// characters list

let characters = []

async function getData() {
  //const res = await fetch('http://hp-api.herokuapp.com/api/characters')
  /* const res = await fetch('https://hp-api.onrender.com/api/characters') */
  const res = await fetch('./data.json')
  const data = await res.json()

  characters =  data.map(character => {

    const li = document.createElement('li')
    li.classList.add('show')
   
   li.innerHTML = `
   <img src="${character.image ? character.image : "unknown.jpg"}" alt="">
      <div>
      <h2>${character.name}</h2>
      <p>House: ${character.house ? character.house : "unknown"}</p>
      </div>
   `
    
   characterList.appendChild(li)
    return { name: character.name, house: character.house, img: character.image, element: li }

  });
}
// console.log(data)


searchBar.addEventListener('input', (e) => {
  
    const value = e.target.value.toLowerCase()
    characters.forEach(character => {
      const isValid = character.name.toLowerCase().includes(value) || character.house.toLowerCase().includes(value)
      // console.log(!isValid)
      character.element.classList.toggle('hide', !isValid)
    })


})


