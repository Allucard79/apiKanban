'use strict';

function initializeCard(tools) {
  function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.tools = tools;

    this.element = tools.generateTemplate('card-template', {
      description: this.name
    }, 'li');

    function handleDeleteCard() {
      self.tools.fetch('/card/' + self.id, {
          method: 'DELETE',
        })
        .then(function (resp) {
          self.removeCard();
        })
    }

    this.element.querySelector('.card').addEventListener('click', function (event) {

      if (event.target.classList.contains('btn-delete')) {
        event.stopPropagation();
        handleDeleteCard();
      }
    });
  }

  Card.prototype = {
    removeCard: function () {
      this.element.parentNode.removeChild(this.element);
    }
  };
  return Card;
}

