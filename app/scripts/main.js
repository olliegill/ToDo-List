//MODEL

ToDo = Backbone.Model.extend({

	initialize: function() {
		this.on('change', function() {
		});
	},
  defaults: {

  },

	idAttribute: '_id',
});

//COLLECTION

ToDoCollection = Backbone.Collection.extend({
	model: ToDo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/ollietodo',
});

//VIEWS

ToDoView = Backbone.View.extend({

// Do I need a className on this?

	template: _.template($('.todo-list').text()),
	editTemplate: _.template($('.edit').text()),

	events: {
    "click .remove-task" : "deleteTask",
		"click .edit-task" : "editTask",
		"click .edit-commit" : "finishedEdit",
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render),
		$('.container').append(this.el),
		this.render();  // I know have to do something like this, not sure why it's an error.
	},

	render: function() {
		var renderTemplate = this.template(this.model.attributes);
		this.$el.html(renderTemplate);
	},

  deleteTask: function() {
    this.model.destroy();
    this.remove();
  },
	editTask: function() {
		var renderTemplate = this.editTemplate(this.model.attributes);
		this.$el.html(renderTemplate);
	},

	finishedEdit: function() {

		$('.edit-input').val();
		var renderTemplate = this.template(this.model.attributes);
		this.$el.html(renderTemplate);
    //something here?
	},

});

var toDoTasks = new ToDoCollection();

toDoTasks.fetch().done(function() {
	toDoTasks.each(function(task) {
		new ToDoView({model: task});
	});
});

$('.add-button').click(function() {
	var newTask = new ToDoCollection();

	var input = $('.input-todo').val();

	newTask.create({task: input});
	new ToDoView({model: this.model});
});
