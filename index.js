let url = "http://api.weatherstack.com/current?access_key=19bad3e5a5498c44e584e44dd7ca50e9&query=Melbourne"
let div = document.querySelector('.container')
let input = document.querySelector("input")
let divCity

input.addEventListener("keypress",function(e){
  if(e.key === "Enter" && input.value!=""){
    let numOfCity = document.querySelectorAll('.city')
    console.log(numOfCity.length)
      if(numOfCity.length>=5){
        alert("Exceed number of stored cities, please delete unused data first")
        console.log("Hey")
      } else {
      url = `http://api.weatherstack.com/current?access_key=19bad3e5a5498c44e584e44dd7ca50e9&query=${input.value}`
      fetch(url)
      .then((res)=>{
        if(!res.ok){throw Error(res.statusText)}
        return res.json()
        })
      .then((data) => {
        console.log(data)
        console.log(data.success)
        if(data.success===false){console.log("error")
        throw new Error("Something went wrong")
        }
        localStorage.setItem(`city${localStorage.length}`,JSON.stringify(data))
        update()
        return input.value=""
      })
      .catch(function(error) {
        alert(error.message);
      });
    }
  }
});


let addData = (city) => {
  let cityJSON = localStorage.getItem(city);
  let cityObject = JSON.parse(cityJSON);
  
  
  div.insertAdjacentHTML("beforeend",`<div class="city" id=${city}>
    <p style="text-align: center">${cityObject.location.name}</p>
    <p style="text-align: center">${cityObject.current.temperature} degrees</p>
    <p style="text-align: center">${cityObject.current.weather_descriptions}</p>
    <p style="text-align: center">Updated at ${cityObject.location.localtime} local time</p></div>
  `)
    place = document.querySelector(`div[id=${city}]`)
    if(cityObject.current.temperature<10){
      place.style.backgroundColor = "#daf0ff"
    } else if(cityObject.current.temperature>25){
      place.style.backgroundColor = "#ffddf"
    }
   document.querySelector(`div[id=${city}]`).addEventListener("click",function(e){
      localStorage.removeItem(event.target.id);
      update()
    })
}

let update = () => {
  console.log("hello here for update")
  div.innerHTML = "";
  let cities = []
  for (let key in localStorage) {
    cities.push(key)
    console.log(key)
  }

  for(i = 0; i <= cities.length-7; i++){
    addData(cities[i])
  }
}

if(localStorage.length === 0){
  fetch(url)
      .then((res)=>{
        if(!res.ok){throw Error(res.statusText)}
        return res.json()
        })
      .then((data) => {
        console.log(data)
        console.log(data.success)
        if(data.success===false){console.log("error")
        throw new Error("Something went wrong")
        }
        localStorage.setItem(`city${localStorage.length}`,JSON.stringify(data))
        update()
      })
      .catch(function(error) {
        alert(error.message);
      });
} else{
  console.log("Log existing data")
  update()
}
