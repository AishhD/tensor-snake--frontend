class TitleScreen {

  static init () {
    this.main = document.getElementById('main')
    this.titleScreen = {}
  }

  static render() {
    
    this.main.innerHTML = `
      <div class="titleScreen">
        <div class="nav">
          <button class="playBtn moving-border">Play</button>
          <button class="scoreBoardBtn moving-border">View Scoreboard</button>
        </div>
      </div>
    `
    this.titleScreen = document.querySelector(".titleScreen")
    // this.collectReviews()
    this.addListeners()
    

  }

  static renderRatings(rating) {
    let ratingsContainer = document.createElement('div')
    ratingsContainer.id = "ratings-container"
    ratingsContainer.innerHTML = `<h2>Star Rating</h2>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
     `
     this.titleScreen.appendChild(ratingsContainer)
     ratingsContainer.querySelectorAll('.fa').forEach((item, index) => {
      if(index < rating) {
        item.classList.add('checked');
      }
    })

    // this.userReview()
  }

  static addListeners() {
    const container = this.main.querySelector(".titleScreen")
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('playBtn')) {
        SetupScreen.render()
        Game.init(4, 1)
      } else if (e.target.classList.contains('scoreBoardBtn')) {
        ScoreBoard.render()
      }
    })
  }

  static collectReviews() {
    API.getReviews()
      .then(reviews => this.averageReview(reviews))
  }

  static averageReview(reviews) {
    const allReviewCount = reviews.map(review => review.star_rating)
    const reviewCount = allReviewCount.reduce((a, b) => a + b, 0)/allReviewCount.length
    const reviewAverage = Math.round(reviewCount)
    this.renderRatings(reviewAverage)
  }

  static userReview() {
    const ratingSec = document.createElement('div')
    ratingSec.className = "review-container"
    ratingSec.innerHTML += `
      <h4>Add a review:</h4>
      <form>
        <fieldset class="fieldset">
          <label for="username"><p>Username:</p></label>
          <input type="text" name="Username" id="username">
        </fieldset>
        <fieldset class="fieldset">
          <label for="comments"><p>Comments:</p></label>
          <textarea name="comment" rows="3" cols="50" wrap="soft"></textarea>
        </fieldset>
        <fieldset class="fieldset">
          <label for="rating"><p>Rating:</p></label>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </fieldset>
        <input type="submit" value="Submit">
      </form> 
    `

    this.titleScreen.appendChild(ratingSec)
  }

}


TitleScreen.init()
