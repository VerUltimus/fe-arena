// The main script file for the simulator
// Currently works with loading a character

$(function(){

  // Unit represents a single unit's worth of data
  var Unit = Backbone.Model.extend({

    defaults: function() {
        id: 0,
        name: "",
        hp: 0
    }

  });

  // A UnitCollection represents an entire team that is read in from server
  var UnitCollection = Backbone.Collection.extend({

    model: Unit,
    url: "http://fe-arena.herokuapp.com/characters"

  });

  var unitCollection = new UnitCollection();

   // The DOM element for a unit
  var UnitView = Backbone.View.extend({

    // is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

    // The TeamView notifies when the teams have been read in
  var TeamView = Backbone.View.extend({

       // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(Todos, 'add', this.addOne);
      this.listenTo(Todos, 'reset', this.addAll);
      this.listenTo(Todos, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      unitCollection.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      this.main.show();
      this.footer.show();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(unit) {
      var view = new UnitView({model: unit});
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      unitCollection.each(this.addOne, this);
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new TeamView;

});