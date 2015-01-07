var Model = {
    column: 12,
    students: [{
        name: 'Slappy the Frog',
        attend: [3, 4, 5]
    }, {
        name: 'Lilly the Lizard',
        attend: [3, 4, 6]
    }, {
        name: 'Paulrus the Walrus',
        attend: [2, 3, 4]
    }]
}

var Octupos = {

    init: function() {
        View.init()

    },

    getColumn: function() {
        return Model.column;
    },

    getDaysMissed: function(index) {
        return Model.column - Model.students[index].attend.length;
    },

    getStudents: function() {
        return Model.students;
    },
    attend: function(index, day) {
        Model.students[index].attend.push(day);
        // console.log(Model.students[index].attend);
    },
    disattend: function(index, day) {
        var arr = Model.students[index].attend
        for(var i = 0; i < arr.length; ++i) {
            if(arr[i] === day){
                arr.splice(i,1)
            }
        }
        // console.log(Model.students[index].attend);

    }
}

var View = {

    init: function() {
        this.render(Octupos.getStudents());
        $('input[type="checkbox"]').change(function(e) {
            var checkbox = e.target;
            var studentIndex = parseInt(checkbox.id.split(',')[0])
            var dayIndex = parseInt(checkbox.id.split(',')[1])
            if(checkbox.checked){
                Octupos.attend(studentIndex, dayIndex);
            }else{
                Octupos.disattend(studentIndex, dayIndex);
            }
            $('tbody tr').eq(studentIndex).find('td').eq(Octupos.getColumn() + 1).text(Octupos.getDaysMissed(studentIndex))
        })
    },

    render: function(students) {
        var column = Octupos.getColumn();
        var th = ''
        for (var m = 1; m <= column; ++m) {
            th += '<th>' + m + '</th>';
        }
        $(th).insertAfter($('#student-name'))

        for (var i = 0; i < students.length; ++i) {
            var rowDom = '<tr><td>' + students[i].name + '</td>';
            for (var j = 0; j < column; ++j) {
                var t = '';
                for (var k = 0; k < students[i].attend.length; ++k) {
                    if (students[i].attend[k] === j) {
                        t = '<td><input type="checkbox" id=' + i + ',' + j + ' checked></td>';
                        break;
                    }
                    t = '<td><input type="checkbox" id=' + i + ',' + j + ' ></td>';
                }
                rowDom += t;
            }
            rowDom += '<td>' + Octupos.getDaysMissed(i) + '</td>';
            $('tbody').append(rowDom)
        }


    }
}

Octupos.init();
