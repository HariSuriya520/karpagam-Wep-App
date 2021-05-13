$('#bar').click(function(){
	$(this).toggleClass('open');
	$('#page-content-wrapper ,#sidebar-wrapper').toggleClass('toggled' );

});




let db = new Dexie("Iyearbedb")
    db.version(1).stores({
        auto: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        civil: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        cse: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        cst: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        cybersecurity: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        ece: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        eee: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        eie: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        ete: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        mech: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint'
    });
    
    var semOptions = {"1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8"}
    var coursecodeOptions = {"17AD06": "17AD06", "17AD09": "17AD09", "17AD16": "17AD16", "17AE23": "17AE23", "17AF02": "17AF02", "17MD14": "17MD14"};
    var coursetitleOptions = {"KOM": "KOM", "AT": "AT", "VBE": "VBE", "UCMP": "UCMP", "Mini Project": "Mini Project", "FEM": "FEM"};
    
    var dataColumns = [
        {
            title: "Sem", 
            type: "select",
            options: semOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "Roll No", 
            type: "text",
            required: true,
            unique: true
        },
        {
            title: "Name", 
            type: "text",
            required: true
        }, 
        {
            title: "Course Code", 
            type: "select",
            options: coursecodeOptions,
            select2: {width: "100%"},
            required: true
        }, 
        {
            title: "Course Title", 
            type: "select",
            options: coursetitleOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "Credits", 
            type: "text",
            required: true
        }, 
        {
            title: "Grade Point", 
            type: "text",
            required: true
        }, 
        {
            title: "Grade Letter", 
            type: "text",
            required: true
        }
    ];
//================================================================================================================================================================================   
    var myTable = $('#tabledataauto').DataTable({
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
            db.auto.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.auto.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
            myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
        })
    })
//================================================================================================================================================================================
    var myTable = $('#tabledatacivil').DataTable({
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
            db.civil.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.civil.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
            myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
        })
    })
//================================================================================================================================================================================
    var myTable = $('#tabledatacse').DataTable({
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
            db.cse.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.cse.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
            myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
        })
    })

//================================================================================================================================================================================
var myTable = $('#tabledatacst').DataTable({
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
        db.cst.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.cst.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
        myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
    })
})

//================================================================================================================================================================================
var myTable = $('#tabledatacybersecurity').DataTable({
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
        db.cybersecurity.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.cybersecurity.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
        myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataece').DataTable({
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
        db.ece.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.ece.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
        myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataeee').DataTable({
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
        db.eee.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.eee.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
        myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataeie').DataTable({
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
        db.eie.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.eie.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
        myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataete').DataTable({
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
        db.ete.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.ete.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
        myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamech').DataTable({
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
        db.mech.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db.mech.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
        myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
    })
})