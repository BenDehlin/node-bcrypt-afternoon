module.exports = {
  dragonTreasure: async (req, res) => {
    const db = req.app.get('db')
    const results = await db.get_dragon_treasure(1)
    res.status(200).send(results)
  },
  getUserTreasure: async (req, res) => {
    const db = req.app.get('db')
    const results = await db.get_user_treasure(req.session.user.id)
    res.status(200).send(results)
  },
  addUserTreasure: async (req, res) => {
    const db = req.app.get('db')
    const {treasureUrl} = req.body
    const {id} = req.session.user
    const results = await db.add_user_treasure([treasureUrl, id])
    res.status(200).send(results)
  },
  getAllTreasure: async (req, res) => {
    const db = req.app.get('db')
    const results = await db.get_all_treasure()
    res.status(200).send(results)
  }
}