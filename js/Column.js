'use strict';

function initializeColumn(tools) {
    const Card = initializeCard(tools);

    function Column(id, name) {
        const self = this;

        this.id = id;
        this.name = name || 'No name given';
        this.tools = tools;

        this.element = tools.generateTemplate('column-template', {
            name: this.name,
            id: this.id
        });

        function handleDeleteColumn() {
            self.tools.fetch('/column/' + self.id, {
                    method: 'DELETE',
                })
                .then(function (resp) {
                    self.removeColumn();
                });
        }

        function handleAddCard() {
            const cardName = prompt("Enter the name of the card");

            const data = new FormData();
            data.append('name', cardName);
            data.append('bootcamp_kanban_column_id', self.id);

            self.tools.fetch('/card', {
                    method: 'POST',
                    body: data,
                })
                .then(function (resp) {
                    self.addCard(resp.id, cardName);
                });

        }

        this.element
            .querySelector('.column')
            .addEventListener('click', function (event) {
                if (event.target.classList.contains('btn-delete')) {
                    handleDeleteColumn()
                }

                if (event.target.classList.contains('add-card')) {
                    handleAddCard();
                }
            });
    }

    Column.prototype = {
        addCard: function (id, name) {
            const card = new Card(id, name);
            this.element.querySelector('ul').appendChild(card.element);
        },

        removeColumn: function () {
            this.element.parentNode.removeChild(this.element);
        }
    };

    return Column;
}
