const fs=require("fs");
function retriveInfo(){
    try{
        const jsonString=fs.readFile("Example.txt","utf8");
        const eventsArray=JSON.parse(jsonString);
        return eventsArray;
    }catch(err){
        console.error("Error reading or parsing the file: ",err);
    }
}
retriveInfo();