'use strict';

function initializeBoard(tools) {
    const Column = initializeColumn(tools);

    const board = {
        name: 'Kanban Board',
        element: document.querySelector('#board .column-container'),

        addColumn: function (id, name) {
            const column = new Column(id, name);

            this.element.appendChild(column.element);

            initSortable(column.id);

            return column;
        },
    };

    function initSortable(id) {
        const el = document.getElementById(id);
        const sortable = Sortable.create(el, {
            group: 'kanban',
            sort: true,
        });
    }

    function handleAddColumn() {
        const name = prompt('Enter a column name');
        const data = new FormData();
        data.append('name', name);

        tools.fetch('/column', {
                method: 'POST',
                body: data,
            })
            .then(function (resp) {
                board.addColumn(resp.id, name);
            });
    }

    document
        .querySelector('#board .create-column')
        .addEventListener('click', handleAddColumn);

    return board;
}

