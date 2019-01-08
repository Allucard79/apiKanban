'use strict';

function start() {

  const tools = {
    generateTemplate: function (name, data, basicElement) {
      const template = document.getElementById(name).innerHTML;
      const element = document.createElement(basicElement || 'div');

      element.innerHTML = Mustache.render(template, data);

      return element;
    },

    fetch: function (url, opts) {
      const baseUrl = 'https://kodilla.com/pl/bootcamp-api';
      const prefix = 'https://cors-anywhere.herokuapp.com/';

      const options = Object.assign({
        headers: {
          'X-Client-Id': '3727',
          'X-Auth-Token': 'e20f7d1aee52ff21718a986d41b31ff1'
        }
      }, opts);

      return fetch(prefix + baseUrl + url, options)
        .then(function (resp) {
          return resp.json();
        });
    }
  }

  const board = initializeBoard(tools);

  tools.fetch('/board').then(function (resp) {
    setupColumns(resp.columns);
  });

  function setupColumns(columns) {
    columns.forEach(function (column) {
      const col = board.addColumn(column.id, column.name);

      setupCards(col, column.cards);
    });
  }

  function setupCards(col, cards) {
    cards.forEach(function (card) {
      col.addCard(card.id, card.name);
    });
  }
}

start();
