export default function arrayRemove(arr: Array<any>, value: string | number) { 
    return arr.filter(function(ele){ 
        return ele.id != value; 
    });
}