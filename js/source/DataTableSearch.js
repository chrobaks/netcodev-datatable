class DataTableSearch
{
    constructor() {
        this.config = {};
    }

    getSearch (srchConf)
    {
        let result = [];
        const list = this.config.content.querySelectorAll('.data-row');
        let revertIndex = list.length - 1;
        srchConf.val = srchConf.val.toLowerCase();
        srchConf.colIndex = srchConf.colIndex*1;

        for (let i = 0;i < list.length;i++) {

            let colVal1 = list[i].querySelectorAll('.data-col')[srchConf.index].innerHTML.toLowerCase();
            let colVal2 = list[revertIndex].querySelectorAll('.data-col')[srchConf.index].innerHTML.toLowerCase();

            if (srchConf.type === 'date' && srchConf.hasOwnProperty('dateEnd')) {
                
                let sDate = srchConf.val.split('.');
                let eDate = srchConf.dateEnd.split('.');
                colVal1 = colVal1.split('.');
                colVal2 = colVal2.split('.');
                sDate = new Date(sDate[2]*1,sDate[1]*1 - 1,sDate[0]*1).getTime();
                eDate = new Date(eDate[2]*1,eDate[1]*1 - 1,eDate[0]*1).getTime();
                colVal1 = new Date(colVal1[2]*1,colVal1[1]*1 - 1,colVal1[0]*1).getTime();
                colVal2 = new Date(colVal2[2]*1,colVal2[1]*1 - 1,colVal2[0]*1).getTime();

                if (colVal1 >= sDate && colVal1 <= eDate) {
                    result.push(list[i].dataset.rowIndex*1);
                }
                if(revertIndex > i) {
                    if (colVal2 >= sDate && colVal2 <= eDate) {
                        result.push(list[revertIndex].dataset.rowIndex*1);
                    }
                    revertIndex--;
                }

            } else {
                if (colVal1 === srchConf.val) {
                    result.push(list[i].dataset.rowIndex*1);
                }
                if(revertIndex > i) {
                    if (colVal2 === srchConf.val) {
                        result.push(list[revertIndex].dataset.rowIndex*1);
                    }
                    revertIndex--;
                }
            }
            
            if (revertIndex === i) { break; }
        }

        return result;
    }

    getSort (colIndex, order)
    {
        let arrRes = [];
        let arrIndex = [];
        let arrRowIndex = [];
        const asc = (order === 'down') ? 1 : 0;
        
        for (let i = 0; i < this.config.dataTable.length; i++) {
            let rowId = this.config.content.getElementsByClassName("data-row")[i].dataset.rowIndex*1;
            arrIndex.push([rowId, this.config.dataTable[rowId][colIndex]]);
        }
        arrIndex = DataTableSort.getSort(arrIndex,asc);
        
        
        
        for (let n = 0; n < arrIndex.length; n++) {
            arrRes.push(this.config.dataTable[arrIndex[n][0]*1]);
            arrRowIndex.push(arrIndex[n][0]*1);
        }

        return {arrRes:arrRes, arrRowIndex:arrRowIndex};
    };
        
    set _config (obj) { this.config = Object.assign(this.config,obj); }
}