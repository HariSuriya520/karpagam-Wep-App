$('#bar').click(function(){
	$(this).toggleClass('open');
	$('#page-content-wrapper ,#sidebar-wrapper').toggleClass('toggled' );

});




let db = new Dexie("Iyearbtechdb")
    db.version(1).stores({
        ai: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint',
        it: 'sem, rollno, name, coursecode, coursetitle, credits, gradepoint'
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
            db.ai.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.ai.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
            myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
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
            db.it.add({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
            success(rowdata);
            Notiflix.Notify.Success(rowdata[1]+' has been added');
        },
        onEditRow: function(datatable, rowdata, success, error) {
            db.it.update({sem: rowdata[0], rollno: rowdata[1], name: rowdata[2], coursecode: rowdata[3], coursetitle: rowdata[4], credits: rowdata[5], gradepoint: rowdata[6], gradeletter: rowdata[7]});
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
            myTable.row.add([item.sem, item.rollno, item.name, item.coursecode, item.coursetitle, item.credits, item.gradepoint, item.gradeletter]).draw()
        })
    })
