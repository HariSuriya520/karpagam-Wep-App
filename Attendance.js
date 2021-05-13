$('#bar').click(function(){
	$(this).toggleClass('open');
	$('#page-content-wrapper ,#sidebar-wrapper').toggleClass('toggled' );

});




let db = new Dexie("attendance")
    db.version(1).stores({
        auto: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        civil: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        cse: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        cst: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        cybersecurity: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        ece: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        eee: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        eie: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        ete: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        mech: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        ai: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        it: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        mba: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        mca: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        mecs: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        mevlsi: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall',
        memts: 'rollno, name, year, sem, course1, course2, course3, course4, course5, course6, overall'
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
        {
            title: "OverAll",
            type: "text",
            required: true
        },
    ];
//================================================================================================================================================================================   
    var myTable = $('#tabledataautoat').DataTable({
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
            db.auto.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.auto.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
            success(rowdata);
            Notiflix.Notify.Warning(rowdata[1]+' has been edited');
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            Notiflix.Confirm.Show(
                'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                function(){
                    db.auto.delete(rowdata[0]);
                    success(rowdata);
                    Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                }, 
                function(){
                    Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                } 
            );
        },
    });
    
    db.auto.toArray(dataAuto => {
        dataAuto.forEach(item => {
            myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
        })
    })
//================================================================================================================================================================================
    var myTable = $('#tabledatacivilat').DataTable({
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
            db.civil.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.civil.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
            success(rowdata);
            Notiflix.Notify.Warning(rowdata[1]+' has been edited');
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            Notiflix.Confirm.Show(
                'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                function(){
                    db.civil.delete(rowdata[0]);
                    success(rowdata);
                    Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                }, 
                function(){
                    Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                } 
            );
        },
    });

    db.civil.toArray(dataCivil => {
        dataCivil.forEach(item => {
            myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
        })
    })
//================================================================================================================================================================================
    var myTable = $('#tabledatacseat').DataTable({
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
            db.cse.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.cse.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
            success(rowdata);
            Notiflix.Notify.Warning(rowdata[1]+' has been edited');
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            Notiflix.Confirm.Show(
                'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                function(){
                    db.cse.delete(rowdata[0]);
                    success(rowdata);
                    Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                }, 
                function(){
                    Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                } 
            );
        },
    });

    db.cse.toArray(dataCse => {
        dataCse.forEach(item => {
            myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
        })
    })

//================================================================================================================================================================================
var myTable = $('#tabledatacstat').DataTable({
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
        db.cst.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.cst.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.cst.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.cst.toArray(dataCst => {
    dataCst.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})

//================================================================================================================================================================================
var myTable = $('#tabledatacybersecurityat').DataTable({
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
        db.cybersecurity.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.cybersecurity.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.cybersecurity.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.cybersecurity.toArray(dataCybersecurity => {
    dataCybersecurity.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataeceat').DataTable({
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
        db.ece.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.ece.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.ece.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.ece.toArray(dataEce => {
    dataEce.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataeeeat').DataTable({
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
        db.eee.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.eee.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.eee.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.eee.toArray(dataEee => {
    dataEee.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataeieat').DataTable({
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
        db.eie.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.eie.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.eie.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.eie.toArray(dataEie => {
    dataEie.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataeteat').DataTable({
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
        db.ete.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.ete.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.ete.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.ete.toArray(dataEte => {
    dataEte.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamechat').DataTable({
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
        db.mech.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.mech.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.mech.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.mech.toArray(dataMech => {
    dataMech.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataaiat').DataTable({
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
        db.ai.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.ai.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.ai.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.ai.toArray(dataAi => {
    dataAi.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataitat').DataTable({
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
        db.it.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.it.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.it.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.it.toArray(dataIt => {
    dataIt.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatambaat').DataTable({
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
        db.mba.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.mba.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.mba.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.mba.toArray(dataMba => {
    dataMba.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamcaat').DataTable({
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
        db.mca.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.mca.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.mca.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.mca.toArray(dataMca => {
    dataMca.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamecsat').DataTable({
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
        db.mecs.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.mecs.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.mecs.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.mecs.toArray(dataMecs => {
    dataMecs.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamevlsiat').DataTable({
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
        db.mevlsi.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.mevlsi.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.mevlsi.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.mevlsi.toArray(dataMevlsi => {
    dataMevlsi.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamemtsat').DataTable({
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
        db.memts.add({rollno: rowdata[0], name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.memts.update(rowdata[0], {name: rowdata[1], year: rowdata[2], sem: rowdata[3], course1: rowdata[4], course2: rowdata[5], course3: rowdata[6], course4: rowdata[7], course5: rowdata[8], course6: rowdata[9], overall: rowdata[10]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db.memts.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db.memts.toArray(dataMemts => {
    dataMemts.forEach(item => {
        myTable.row.add([item.rollno, item.name, item.year, item.sem, item.course1, item.course2, item.course3, item.course4, item.course5, item.course6, item.overall]).draw()
    })
})