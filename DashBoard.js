$('#bar').click(function(){
	$(this).toggleClass('open');
	$('#page-content-wrapper ,#sidebar-wrapper').toggleClass('toggled' );

});




let db = new Dexie("mydexiedb")
        db.version(1).stores({
            employees: 'id,name,position,office,extension,startdate,salary'
        });
        
        var employeeOptions = {"Accountant": "Accountant", "Developer": "Developer", "Integration Specialist": "Integration Specialist", "Marketing Designer": "Marketing Designer", "Regional Director": "Regional Director", "Sales Assistant": "Sales Assistant", "Software Engineer": "Software Engineer", "System Architect": "System Architect"};
        var officeOptions = {"Tokyo": "Tokyo", "Singapore": "Singapore", "Sidney": "Sidney", "San Francisco": "San Francisco", "New York": "New York", "London": "London", "Edinburgh": "Edinburgh"};
        
        var dataColumns = [
            {
                title: "ID", 
                type: "text",
                required: true,
                unique: true
            }, 
            {
                title: "Name", 
                type: "text",
                required: true,
                unique: true
            }, 
            {
                title: "Position", 
                type: "select",
                options: employeeOptions,
                select2: {width: "100%"},
                /*render: function (dt, type, row, meta) {
                    if (dt == null || !(dt in employeeOptions)) return null;
                    return employeeOptions[dt];
                }*/
            }, 
            {
                title: "Office", 
                type: "select",
                options: officeOptions,
                select2: {width: "100%"},
                /*multiple: true,
                render: function (dt, type, row, meta) {
                    if (dt == null || !(dt in officeOptions)) return null;
                    return dt.map(function(dti) {return officeOptions[dti];});
                }*/
            },
            {
                title: "Extn.", 
                type: "text",
                required: true
            }, 
            {
                title: "Start date", 
                datetimepicker: { timepicker: false, format : "Y/m/d"}
            }, 
            {
                title: "Salary", 
                type: "text",
                pattern: "\\$[0-9]*,[0-9]{3}",
                hoverMsg: "At least $1,000"
            }
        ];
        
        var myTable = $('#tabledata').DataTable({
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
                db.employees.add({id: parseInt(rowdata[0]), name: rowdata[1], position: rowdata[2], office: rowdata[3], extension: rowdata[4], startdate: rowdata[5], salary: rowdata[6]});
                success(rowdata);
                Notiflix.Notify.Success(rowdata[1]+' has been added');
            },
            onEditRow: function(datatable, rowdata, success, error) {
                db.employees.update(parseInt(rowdata[0]), {name: rowdata[1], position: rowdata[2], office: rowdata[3], extension: rowdata[4], startdate: rowdata[5], salary: rowdata[6]});
                success(rowdata);
                Notiflix.Notify.Warning(rowdata[1]+' has been edited');
            },
            onDeleteRow: function(datatable, rowdata, success, error) {
                Notiflix.Confirm.Show(
                    'Delete Data', 'Are you sure about this?', 'Yes', 'No', 
                    function(){
                        db.employees.delete(rowdata[0]);
                        success(rowdata);
                        Notiflix.Notify.Failure(rowdata[1]+' has been deleted');
                    }, 
                    function(){
                        Notiflix.Report.Success('Canceling Delete Data', 'Thank you for not deleting this data', 'Close'); 
                    } 
                );
            },
        });
        
        db.employees.toArray(dataEmployees => {
            // if(dataEmployees.length <= 0) {
            //     Notiflix.Confirm.Show(
            //         'Sample Data', 'Do you want to add 3 sample data?', 'Yes', 'No', 
            //         function(){
            //             addAllEmployees()
            //         }, 
            //         function(){
            //             Notiflix.Report.Failure('Canceling Sample Data', 'You need to add new data manually by adding them one by one', 'Close');
            //         } 
            //     ); 
            // }
            dataEmployees.forEach(item => {
                myTable.row.add([item.id, item.name, item.position, item.office, item.extension, item.startdate, item.salary]).draw()
            })
        })
        
        // Sample DataBase

        // function addAllEmployees() {
        //     db.employees.bulkAdd([
        //         {id: 1, name: "Tiger Nixon", position: "System Architect", office: "Edinburgh", extension: "5421", startdate: "2011/04/25", salary: "$320,800"},
        //         {id: 2, name: "Garrett Winters", position: "Accountant", office: "Tokyo", extension: "8422", startdate: "2011/07/25", salary: "$170,750"},
        //         {id: 3, name: "Ashton Cox", position: "Junior Technical Author", office: "San Francisco", extension: "1562", startdate: "2009/01/12", salary: "$86,000"}
        //     ]);
        //     Notiflix.Notify.Info('3 data has been added to the dexie database and wait for this page to be automatically reload again');
        //     setTimeout(() => {
        //         window.location.reload()
        //     }, 1000);
        // }



        $('#myTab a').on('click', function (e) {
            e.preventDefault()
            $(this).tab('show')
          })