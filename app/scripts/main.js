

//MODEL

ToDo = Backbone.Model.extend({

	initialize: function() {
		this.on('change', function() {
		});
	},
  defaults: {
//some defaults
  },

	idAttribute: '_id',  //tied in with url
});

//COLLECTION

ToDoCollection = Backbone.Collection.extend({
	model: ToDo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/ollietodo',
});

//VIEWS

ToDoView = Backbone.View.extend({

// Do I need a className on this?
// or only if I create html elements in Js?
	template: _.template($('.todo-list').text()),
	editTemplate: _.template($('.edit').text()),

	events: {
    "click .remove-task" : "deleteTask",
		"click .edit-task" : "editTask",        // I understand this, rendered below.
		"click .edit-commit" : "finishedEdit",
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render); //pertains to the model, listens to changes in the model
		$('.container').append(this.el);
		this.render();
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
		var editedTask = $('.edit-input').val();
    this.model.set('task', editedTask);
    this.model.save();
		var renderTemplate = this.template(this.model.attributes);
		this.$el.html(renderTemplate);

	},

});

//document.ready ???   Is this glue code? Should go here, but can technically go in the views.
$(document).ready(function(){
var toDoTasks = new ToDoCollection(); // explain how/why this ties to the collection?

toDoTasks.fetch().done(function() {
	toDoTasks.each(function(task) {
		new ToDoView({model: task});
	});
});

$('.add-button').click(function() {

	var input = $('.input-todo').val();
  var newTask = toDoTasks.create({task: input}); // telling collection to create new todo from input and give it back to me
	//newTask.create({task: input});
	new ToDoView({model: newTask}); // and this.
});
});
