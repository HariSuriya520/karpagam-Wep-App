$('#bar').click(function(){
	$(this).toggleClass('open');
	$('#page-content-wrapper ,#sidebar-wrapper').toggleClass('toggled' );

});



let db17 = new Dexie("mechanical")
    db17.version(1).stores({
        mech2: 'rollno, name, year,sem,  course1, course2, course3, course4, course5, course6'
    });
    
    var semOptions = {"3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8"}
    var yearOptions = {"2nd Year": "2nd Year", "3rd Year": "3rd Year", "4th Year": "4th Year"}
    
    var dataColumns = [
        {
            title: "Roll No", 
            type: "text",
            required: true
        },
        {
            title: "Name", 
            type: "text",
            required: true
        },
        {
            title: "Year",
            type: "select",
            options: yearOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "Sem", 
            type: "select",
            options: semOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "Course 1", 
            type: "text",
            required: true
        }, 
        {
            title: "Course 2", 
            type: "text",
            required: true
        }, 
        {
            title: "Course 3", 
            type: "text",
            required: true
        }, 
        {
            title: "Course 4", 
            type: "text",
            required: true
        }, 
        {
            title: "Course 5", 
            type: "text",
            required: true
        }, 
        {
            title: "Course 6",
            type: "text",
            required: true
        },
    ];
//================================================================================================================================================================================   
    var myTable = $('#tabledatamech2').DataTable({
        sPaginationType: "full_numbers",
        columns: dataColumns,
        order: [[ 0, "desc" ]],
        dom: "<'row mb-0'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'B>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-3'<'mt-2'l>><'col-sm-12 col-md-3'i><'col-sm-12 col-md-6'p>>",
        select: 'single',
        responsive: true,
        altEditor: true,     // Enable altEditor
        buttons: [
            {
                text: '<i class="fa fa-plus mr-1"></i> Add', 
                name: 'add', //don't change the name
                className: 'btn-success btn-sm mr-1 mb-1'
            }, 
            {
                extend: 'selected', // Bind to Selected row 
                text: '<i class="fa fa-edit mr-1"></i> Edit', 
                name: 'edit',
                className: 'btn-warning btn-sm mr-1 mb-1'
            },
            {
                extend: 'selected', 
                text: '<i class="fa fa-times mr-1"></i> Delete', 
                name: 'delete',
                className: 'btn-danger btn-sm mr-1 mb-1'
            }
        ],
        onAddRow: function(datatable, rowdata, success, error) {
            db17.mech2.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db17.mech2.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9]});
            success(rowdata);
            Notiflix.Notify.Warning(rowdata[1]+' has been edited');
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            Notiflix.Confirm.Show(
                'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                function(){
                    db17.mech2.delete(rowdata[0]);
                    success(rowdata);
                    Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                }, 
                function(){
                    Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                } 
            );
        },
    });
    
    db17.mech2.toArray(dataMech2 => {
        if(dataMech2.length <= 0) {
            Notiflix.Confirm.Show(
                'Sample Data', 'Do you want to add sample data?', 'Yes', 'No', 
                function(){
                    addAllMech2()
                }, 
                function(){
                    Notiflix.Report.Failure('Canceling Sample Data', 'You need to add new data manually by adding them one by one', 'Close');
                } 
            ); 
        }
        dataMech2.forEach(item => {
            myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6]).draw()
        })
    })
//================================================================================================================================================================================
function addAllMech2() {
    db17.mech2.bulkAdd([
        {rollno: "18A502", name: "Hari Hara Sudhan S", year: "2nd Year", sem: 3, course1: 6.0, course2: 7.0, course3: 5.0, course4: 8.0, course5: 4.0, course6: 7.0},
        {rollno: "17A122", name: "Iswar", year: "3rd Year", sem: 6, course1: 6.0, course2: 7.0, course3: 5.0, course4: 8.0, course5: 4.0, course6: 7.0},
        {rollno: "18P502", name: "Murali S", year: "4th Year", sem: 7, course1: 6.0, course2: 7.0, course3: 5.0, course4: 8.0, course5: 4.0, course6: 7.0}
    ]);
    Notiflix.Notify.Info('data has been added to the dexie database and wait for this page to be automatically reload again');
    setTimeout(() => {
        window.location.reload()
    }, 1000);
}