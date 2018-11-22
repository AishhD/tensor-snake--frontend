class ScoreBoard {
  static init() {
    this.scores = []
    this.main = document.getElementById('main')
  }

  static render() {
    API.getScores().then(scores => {
      this.scores = scores.slice(0,20)
      let scoreList = document.createElement('div')
      scoreList.id = "score-list"

      let rows = []
      for (let i = 0; i < this.scores.length; i++){
        rows.push(`<td>${i+1}</td><td>${this.scores[i].user_name}</td><td>${this.scores[i].points}</td>`)
      }
      
      scoreList.innerHTML = `
      <h2>Top Scores</h2>
      <table>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        
      </table>
      <br><br>
      <button id="back">Go Back</button>
      `
      this.main.innerHTML = ""
      this.main.appendChild(scoreList)
      
      let table = document.querySelector("table")
      rows.forEach(row => {
        let tr = document.createElement('tr')
        tr.innerHTML = row
        table.tBodies[0].appendChild(tr)
      });

      // <ol>
      //   ${this.scores.map(score =>
      //    '<li class="score-li">' + score.user_name + ': ' + score.points + '</li>'
      //   ).join("")}
      // </ol>
    }).then(() => this.addListeners())
  }

  static addListeners() {
    let list = document.getElementById('score-list')
    list.addEventListener('click', event => {
      if(event.target.classList.contains('score-li')) {
        console.log('li')
      }
    })


    back.addEventListener('click', event => {
      TitleScreen.render()
    })
  }
}

ScoreBoard.init()