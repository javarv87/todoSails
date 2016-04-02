/**
 * TodoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getTodos: function(req, res) {
    Todo.find().exec(function(err, todos) {
      return res.json(todos);
    });
  },
  addTodo: function(req, res) {
    var dataTodo = req.params.all();
    Todo.create(dataTodo).exec(function(err, todo) {
      return res.json(todo);
    });
  },
  removeTodo: function(req, res) {
    var dataTodo = req.params.all();
    Todo.destroy(dataTodo).exec(function(err, todo) {
      return res.json(todo);
    });
  }
};
