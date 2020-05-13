class DataTableSort 
{
    static getStrNumber (i, str)
    {
        let res = "";
        let nextChar = null;
        let doIt = true;
        while (doIt) { 
            res += "" + str[i]; 
            if (i +1 < str.length && /^[\d]$/.test(str[i+1])) {
                    i++; 
            } else { 
                if (i +1 < str.length) { nextChar = str[i+1]; }
                doIt = false; 
            } 
        }

        return {res:res, nextChar:nextChar};
    }

    static getSortRes (a,b,orderAsc)
    {
        if (a < b) return ((orderAsc) ? 1 : -1);
        if (a > b) return ((orderAsc) ? -1 : 1);
        return 0;
    }

    static getSort (arr, orderAsc)
    {
        let res = arr;
        res.sort(function (a,b) { return DataTableSort.getSortRes(a[1], b[1], orderAsc) });
        
        return res.sort(function (a,b) { 
            if (/^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(a[1]) && /^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(b[1])) {
                return DataTableSort.sortDate(a[1],b[1],orderAsc);
            } else {
                return DataTableSort.sortString(a,b,orderAsc);
            }
        });
    }
    
    static sortDate (a, b, orderAsc) 
    {
        const aDate = a.split('.');
        const bDate = b.split('.');
        const dateA = new Date(aDate[2]*1,aDate[1]*1 - 1,aDate[0]*1).getTime();
        const dateB = new Date(bDate[2]*1,bDate[1]*1 - 1,bDate[0]*1).getTime();
        return DataTableSort.getSortRes(dateA, dateB, orderAsc);
    }

    static sortString (a, b, orderAsc) 
    {
        const arr0 = (a[1]) ? a[1].toLowerCase().match(/[^\W*]/g) : "";
        const arr1 = (b[1]) ? b[1].toLowerCase().match(/[^\W*]/g) : "";
        let res0 = "";
        let res1 = "";

        for (let i = 0; i < arr0.length; i++) {
            if (/^[\d]$/.test(arr0[i]) && /^[\d]$/.test(arr1[i])) {
                const objNr0 = this.getStrNumber(i, arr0);
                const objNr1 = this.getStrNumber(i, arr1);
                let n0 = objNr0.res*1;
                let n1 = objNr1.res*1;

                if (n0 === n1) {
                    if (objNr0.nextChar !== null && objNr1.nextChar === null) {
                        n0 = 1;
                        n1 = 0;
                    } else if (objNr1.nextChar !== null && objNr0.nextChar === null) {
                        n0 = 0;
                        n1 = 1;
                    }
                }
                return DataTableSort.getSortRes(n0, n1, orderAsc);
            }
            if (arr1.length <= i && res0 === res1 || arr0[i] != arr1[i] && /^[\d]$/.test(arr1[i])) { 
                return (!orderAsc) ? 1 > 0 :1 < 0;
            } else { 
                res0 = arr0[i]; 
                res1 = arr1[i]; 
                if (arr0[i] != arr1[i]) { 
                    return DataTableSort.getSortRes(arr0[i], arr1[i], orderAsc);
                }
            }
        }
        
        return DataTableSort.getSortRes(res1, res0, orderAsc);
    }
}