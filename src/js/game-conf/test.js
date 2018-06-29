import difficulties from '../modules/difficulties'
import categories from '../modules/categories'

export default {
  difficulty: difficulties.EASY,
  category: categories.SEQUENCE,
  file: 'test-audio.webm',
  blocks: [
    {
      start: 0,
      end: 1000
    },
    {
      start: 1001,
      end: 2000
    },
    {
      start: 2001,
      end: 3000
    },
    {
      start: 3001,
      end: 4000
    }
  ]
}
