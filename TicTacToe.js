
function Tic_Tac_Toe(selector) {

    var grid_size = 3,
        clicks = 0,
        scores = {
            X: 0,
            O: 0
        },
        data = {};
    var main = document.querySelector(selector),
        x_score = main.querySelector('.score.X'),
        o_score = main.querySelector('.score.O'),
        board = main.querySelector('.board'),
        grid = main.querySelector('.grid-options'),
        reset_b = main.querySelector('.btn-reset');	

    grid.addEventListener('change', function(e){
      grid_size = parseInt(e.target.value);
      init();
    });

    init();

    reset_b.addEventListener('click', init);

    function paint() {
        var table = '<table>';
        for (var i = 0; i < grid_size; i++) {
            table += '<tr>';
            for (var j = 0; j < grid_size; j++) {
                table += '<td row="' + i + '" column="' + j + '"></td>';
            }
            table += "</tr>";
        }
        board.innerHTML = table;

        var columns = board.getElementsByTagName('td');
        for (i = 0; i < columns.length; i++) {
            columns[i].addEventListener('click', mark);
        }

    }

    function mark(e) {

        var td = e.target;

        if (td.innerHTML) {
            return;
        }

        var row = td.getAttribute('row'),
            column = td.getAttribute('column');

        var current_mark = clicks % 2 === 0
            ? 'X'
            : 'O';

        td.innerHTML = current_mark;
        td.classList.add(current_mark);
        data[row + '' + column] = current_mark;

        clicks++;

        setTimeout(function() {
            if (didWin(current_mark)) {
                alert(current_mark + ' --------WON !--------');
                scores[current_mark]++;
                scoreUpdate();
                empty();
            } else if (clicks === Math.pow(grid_size, 2)) {
                alert("--------DRAW !--------");
                empty();
            }
        }, 300);

    }

    function didWin(mark) {

        var vertical_count = 0,
            horizontal_count = 0,
            right_to_left_count = 0,
            left_to_right_count = 0;

        for (var i = 0; i < grid_size; i++) {

            vertical_count = 0;
            horizontal_count = 0;

            for (var j = 0; j < grid_size; j++) {

                if (data[i + '' + j] == mark) {
                    horizontal_count++;
                }

                if (data[j + '' + i] == mark) {
                    vertical_count++;
                }

            }

            if (data[i + '' + i] == mark) {
                left_to_right_count++;
            }

            if (data[(grid_size - 1 - i) + '' + i] == mark) {
                right_to_left_count++;
            }

            if (horizontal_count == grid_size || vertical_count == grid_size) {
                return true;
            }

        }

        if (left_to_right_count == grid_size || right_to_left_count == grid_size) {
            return true;
        }

        return false;
    }

    function empty() {
        clicks = 0;
        paint();
        data = {};
    }

    function init() {
        empty();
        scores = {
            X: 0,
            O: 0
        };
        scoreUpdate();
    }

    function scoreUpdate() {
        x_score.innerHTML = scores.X;
        o_score.innerHTML = scores.O;
    }

}
