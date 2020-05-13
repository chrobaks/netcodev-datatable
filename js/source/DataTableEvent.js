class DataTableEvent
{
    constructor(DataTable, config) {
        this.DataTable = DataTable;
        this.config    = config;
    }

    headerEvent ()
    {
        const listColHeader = this.config.dom.header.getElementsByClassName("col-header");
            
        for (let col=0; col < listColHeader.length;col++) {

            listColHeader[col].querySelectorAll('.svg-arrow-item').forEach((obj) => 
            {
                const index = listColHeader[col].dataset.colIndex;

                obj.onclick = () => {
                    this.DataTable.setSortDataTable(index, obj);
                }
            });
        }
    }

    contentEvent ()
    {
        const rows = this.config.dom.content.getElementsByClassName("data-row");
        
        for (let i = 0; i < rows.length; i++) {
            rows[i].onclick = () => { this.DataTable.View.toggleDataRow(rows[i]); }
        }
    }

    colToggleEvent (obj)
    {
        const radio = obj.getElementsByTagName("input")[0];
        const status = (radio.getAttribute('checked')) ? true : false;
        
        if (!status) {
            radio.setAttribute('checked','checked');
            this.config.arrToggleList.splice(this.config.arrToggleList.indexOf(obj.dataset.colIndex), 1);
        } else {
            radio.removeAttribute('checked');
            this.config.arrToggleList.push(obj.dataset.colIndex);
        }
        this.DataTable.View.setColumnUpdate(obj.dataset.colIndex, status);
    }

    searchToggleEvent (obj, index)
    {
        const parent = this.DataTable.View.getClosest('dataTable-col-toggle-wrapper',obj);
        const container = this.DataTable.View.getClosest('dataTable-toolbar',parent);
        parent.getElementsByClassName("column-name")[0].innerHTML = val;

        if (!this.config.arrColType.hasOwnProperty("col_" +index)) {
            this.config.arrColType["col_" +index] = this.DataTable.View.getColumnType(index);
        }
        
        if (this.config.arrColType["col_" +index] === "string") {
            if (!container.getElementsByClassName("dataTable-search-wrapper-str")[0].classList.contains('active')) {
                container.getElementsByClassName("dataTable-search-wrapper-str")[0].classList.add('active');
            }
            if (container.getElementsByClassName("dataTable-search-wrapper-date")[0].classList.contains('active')) {
                container.getElementsByClassName("dataTable-search-wrapper-date")[0].classList.remove('active');
            }
            container.getElementsByClassName("dataTable-search-wrapper-str")[0].getElementsByClassName("inpt-search")[0].dataset.colIndex = index;
            container.getElementsByClassName("dataTable-search-wrapper-str")[0].getElementsByClassName("inpt-search")[0].value = "";
            container.getElementsByClassName("dataTable-search-wrapper-str")[0].getElementsByClassName("inpt-search")[0].focus();
        } else {
            
            if (container.getElementsByClassName("dataTable-search-wrapper-str")[0].classList.contains('active')) {
                container.getElementsByClassName("dataTable-search-wrapper-str")[0].classList.remove('active');
            }
            if (!container.getElementsByClassName("dataTable-search-wrapper-date")[0].classList.contains('active')) {
                container.getElementsByClassName("dataTable-search-wrapper-date")[0].classList.add('active');
            }
            
            container.getElementsByClassName("dataTable-search-wrapper-date")[0].getElementsByClassName("inpt-date")[0].dataset.colIndex = index;
            // container.getElementsByClassName("dataTable-search-wrapper-date")[0].getElementsByClassName("inpt-date")[0].value = "";
            container.getElementsByClassName("dataTable-search-wrapper-date")[0].getElementsByClassName("inpt-date")[0].focus();
        }
    }
}