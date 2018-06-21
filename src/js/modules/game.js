import difficulties from './difficulties'
import categories from './categories'
import genres from './genres'

const defaults = {
  difficulty: difficulties.EASY,
  category: categories.SEQUENCE,
  genre: genres.POP
}

const instance = {}
let settings

instance.init = (options) => {
  settings = Object.assign({}, defaults, options)
}

instance.setDifficulty = (difficulty) => {
  settings.difficulty = difficulty
}

instance.getDifficulty = () => settings.difficulty

instance.setCategory = (category) => {
  settings.category = category
}

instance.getCategory = () => settings.category

instance.prepareGame = () => new Promise((resolve, reject) => {
  resolve()
})

export default instance
