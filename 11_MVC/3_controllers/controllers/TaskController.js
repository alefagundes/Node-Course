const Task = require('../models/Task')

module.exports = class TaskController {
    static create(req, res) {
    res.render('tasks/create')
    }
}