$('#bar').click(function(){
	$(this).toggleClass('open');
	$('#page-content-wrapper ,#sidebar-wrapper').toggleClass('toggled' );

});




let db1 = new Dexie("timetabledb1")
    db1.version(1).stores({
        auto: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        civil: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        cse: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        cst: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        cybersecurity: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        ece: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        eee: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        eie: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        ete: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        mech: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        ai: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        it: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        mba: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        mca: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        mecs: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        mevlsi: 'sem, days, period1, period2, period3, period4, period5, period6, period7',
        memts: 'sem, days, period1, period2, period3, period4, period5, period6, period7'
    });
    
    var daysOptions = {"Monday": "Monday", "Tuesday": "Tuesday", "Wednesday": "Wednesday", "Thursday": "Thursday", "Friday": "Friday", "Saturday": "Saturday"}
    var periodOptions = {"AT": "AT", "FEM": "FEM", "UCMP": "UCMP", "VBE": "VBE", "KOM": "KOM", "Mini Project": "Mini Project"}
    var semOptions = {"1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8"}
    
    var dataColumns = [
        {
            title: "Sem", 
            type: "select",
            options: semOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "Day",
            type: "select",
            options: daysOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "period 1",
            type: "select",
            options: periodOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "period 2",
            type: "select",
            options: periodOptions,
            select2: {width: "100%"},
            required: true
        },
        {
            title: "period 3",
            type: "select",
            options: periodOptions,
            select2: {width: "100%"},
            required: true
        }, 
        {
            title: "period 4",
            type: "select",
            options: periodOptions,
            select2: {width: "100%"},
            required: true
        }, 
        {
            title: "period 5",
            type: "select",
            options: periodOptions,
            select2: {width: "100%"},
            required: true
        }, 
        {
            title: "period 6",
            type: "select",
            options: periodOptions,
            select2: {width: "100%"},
            required: true
        }, 
        {
            title: "period 7",
            type: "select",
            options: periodOptions,
            select2: {width: "100%"},
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
            db1.auto.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db1.auto.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
            success(rowdata);
            Notiflix.Notify.Warning(rowdata[1]+' has been edited');
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            Notiflix.Confirm.Show(
                'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                function(){
                    db1.auto.delete(rowdata[0]);
                    success(rowdata);
                    Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                }, 
                function(){
                    Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                } 
            );
        },
    });
    
    db1.auto.toArray(dataAuto => {
        dataAuto.forEach(item => {
            myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
            db1.civil.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db1.civil.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
            success(rowdata);
            Notiflix.Notify.Warning(rowdata[1]+' has been edited');
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            Notiflix.Confirm.Show(
                'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                function(){
                    db1.civil.delete(rowdata[0]);
                    success(rowdata);
                    Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                }, 
                function(){
                    Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                } 
            );
        },
    });

    db1.civil.toArray(dataCivil => {
        dataCivil.forEach(item => {
            myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
            db1.cse.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db1.cse.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
            success(rowdata);
            Notiflix.Notify.Warning(rowdata[1]+' has been edited');
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            Notiflix.Confirm.Show(
                'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                function(){
                    db1.cse.delete(rowdata[0]);
                    success(rowdata);
                    Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                }, 
                function(){
                    Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                } 
            );
        },
    });

    db1.cse.toArray(dataCse => {
        dataCse.forEach(item => {
            myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
        db1.cst.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.cst.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.cst.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.cst.toArray(dataCst => {
    dataCst.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
        db1.cybersecurity.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.cybersecurity.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.cybersecurity.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.cybersecurity.toArray(dataCybersecurity => {
    dataCybersecurity.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
        db1.ece.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.ece.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.ece.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.ece.toArray(dataEce => {
    dataEce.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
        db1.eee.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.eee.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.eee.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.eee.toArray(dataEee => {
    dataEee.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
        db1.eie.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.eie.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.eie.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.eie.toArray(dataEie => {
    dataEie.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
        db1.ete.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.ete.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.ete.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.ete.toArray(dataEte => {
    dataEte.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
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
        db1.mech.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.mech.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.mech.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.mech.toArray(dataMech => {
    dataMech.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledataai').DataTable({
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
        db1.ai.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.ai.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.ai.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.ai.toArray(dataAi => {
    dataAi.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatait').DataTable({
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
        db1.it.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.it.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.it.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.it.toArray(dataIt => {
    dataIt.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamba').DataTable({
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
        db1.mba.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.mba.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.mba.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.mba.toArray(dataMba => {
    dataMba.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamca').DataTable({
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
        db1.mca.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.mca.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.mca.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.mca.toArray(dataMca => {
    dataMca.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamecs').DataTable({
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
        db1.mecs.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.mecs.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.mecs.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.mecs.toArray(dataMecs => {
    dataMecs.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamevlsi').DataTable({
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
        db1.mevlsi.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.mevlsi.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.mevlsi.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.mevlsi.toArray(dataMevlsi => {
    dataMevlsi.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})


//================================================================================================================================================================================
var myTable = $('#tabledatamemts').DataTable({
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
        db1.memts.add({sem: rowdata[0], days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Success(rowdata[1]+' has been added');
    },
    onEditRow: function(datatable, rowdata, success, error) {
        db1.memts.update(rowdata[0], {days: rowdata[1], period1: rowdata[2], period2: rowdata[3], period3: rowdata[4], period4: rowdata[5], period5: rowdata[6], period6: rowdata[7], period7: rowdata[8]});
        success(rowdata);
        Notiflix.Notify.Warning(rowdata[1]+' has been edited');
    },
    onDeleteRow: function(datatable, rowdata, success, error) {
        Notiflix.Confirm.Show(
            'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
            function(){
                db1.memts.delete(rowdata[0]);
                success(rowdata);
                Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
            }, 
            function(){
                Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
            } 
        );
    },
});

db1.memts.toArray(dataMemts => {
    dataMemts.forEach(item => {
        myTable.row.add([item.sem, item.days, item.period1, item.period2, item.period3, item.period4, item.period5, item.period6, item.period7]).draw()
    })
})