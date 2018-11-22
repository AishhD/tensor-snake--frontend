class SetupScreen {
  static init () {
    this.main = document.getElementById('main')
    this.controller = document.getElementById('controllerDiv')
  }

  static render() {
    main.innerHTML = `
    <div id="userSettings">

      <form id='setup-form'>
        <h2>Enter your name:</h2>
        <input type="text" id="name">
        
        <br><br><br>
        <input type="submit" value="Start Game">
        </form>
    

      <button id="tensor-setup">Setup Camera</button>
      <button id="back">Go Back</button>
    </div>
    `
    
    this.addListeners()
  }

  // avatars
  // <p>Choose an Avatar:</p>

  //   ${
  //     avatars.map((avatarUrl, i) => {
  //       return `
  //       <div class="box">
  //       <label>
  //         <input type="radio" class="radio" name="test" value="${i}" checked>
  //         <img class="avatar" src="${avatarUrl}">
  //       </label>
  //       </div>
  //       `
  //     })
  //     .join('')
  //   }
  

  static addListeners() {
    const formEl = document.querySelector('#setup-form')
    const formName = document.querySelector('#name')
    // const form = document.querySelector("form")
    const setup = document.querySelector("#tensor-setup")
    const back = document.querySelector("#back")

    const playButton = document.querySelector('button#predict')
  
    formEl.addEventListener('submit', startGame)
    playButton.addEventListener('click', startGame)

    function startGame(event) {
      event.preventDefault()
      // let data = new FormData(form);
      // let output = "";
      // for (const entry of data) {
      //   output = entry[1] + "\r";
      // };
      const newUser = {
        name: formName.value
        // avatar: output
      }
      if (newUser.name !== "") {
        API.createPlayer(newUser)
           .then(playerData => {
             Game.init(playerData.id, 1)
           })
           .then(() => {

             Game.render()
           })
      }
      SetupScreen.controller.classList.add("trained")
    }

    setup.addEventListener('click', event => {
      
      this.controller.classList.add("setup")
    })

    back.addEventListener('click', event => {
      TitleScreen.render()
    })
  }
}

SetupScreen.init()
