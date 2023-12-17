import React,{useState,useEffect} from 'react';
import useRawTextParser from './hooks/useRawTextParser.jsx'


export default function CodeOutput(input){

    const linkFile = '/aocday4.txt'
    let inputList= useRawTextParser(linkFile)
    if (!(inputList.length === 0)){
        return(
            <div style={{color:'white'}}>
                {outputDay4(inputList)}
            </div>
        )

    }

}

//day 1
function outputDay1(inputList) {
    
    //part 1
    //const regex = /\d/g 
    
        
    //part 2
    var numMap = new Map()
    var keys = ["zer","on","tw","thre","four","fiv","six","seve", "eigh", "nin"]
    for (let i=0;i<keys.length;i++){
        numMap.set(keys[i],i)

    }

    console.log(numMap)
    const regex = /on(?=e)|tw(?=o)|thre(?=e)|four|fiv(?=e)|six|seve(?=n)|eigh(?=t)|nin(?=e)|zer(?=o)|[0-9]/g

    let newList=inputList.map((item) => 
    {   
        
        let numGet = item.match(regex)
        console.log(numGet)
        
        //part 1
        //return (parseInt(numGet[0].toString() + numGet[numGet.length-1].toString()))

        //part 2
        let parsedArray =numGet.map((arrItem)=>{

            if (numMap.has(arrItem)){
                return numMap.get(arrItem)}    
            else{   
                return(arrItem)
            }
        })

        //return (<p>{parsedArray}</p>)
        return(parseInt(parsedArray[0].toString() + parsedArray[parsedArray.length-1].toString()))
    }
    )
    //part 1 and 2
    let sumTotal=newList.reduce((prev,curr)=>prev + curr,0)
    
    return sumTotal

    //test
    //return newList
    }

//day 2
function outputDay2(inputList){
    
    const blueThresh = 14
    const redThresh = 12
    const greenThresh = 13
    const regexBlue =/\d?\d?\d(?= blue)/g
    const regexRed =/\d?\d?\d(?= red)/g
    const regexGreen =/\d?\d?\d(?= green)/g

    function getHighest(list){
        let highestVal=list[0]
        for (let i=1;i<list.length;i++){
            
            if (parseInt(highestVal)<parseInt(list[i])){
                highestVal= list[i]
            }
        }
        //console.log(highestVal)
        return parseInt(highestVal)   
    }

    //let gameNumber=0

    let legalGames=inputList.map((item)=> {
        let getBlue=item.match(regexBlue)
        let getGreen = item.match(regexGreen)
        let getRed = item.match(regexRed)
        console.log("set")
        //part 1
        //gameNumber++
    
        // if ((getBlue.every((curr)=> parseInt(curr)<=blueThresh)) &&
        // (getGreen.every((curr)=> parseInt(curr)<=greenThresh)) &&
        // (getRed.every((curr)=> parseInt(curr)<=redThresh)))
        // {
        //  return gameNumber
        // }
        // else{
        //     return 0
        // }

        //part2
        return getHighest(getRed) * getHighest(getGreen) *getHighest(getBlue)

    })
    console.log(legalGames)
    let sumTotal=legalGames.reduce((prev,curr)=>prev + curr,0)
    console.log(sumTotal)
}

//day 3
function outputDay3(inputList){
    
    const tList= inputList.map((item)=>{
            return item.trim()

        })
    

    const xLength = tList.length
    const yLength = tList[tList.length-1].length
    //part 1
    //const scanFor=/!|@|#|\$|%|\^|&|\*|\+|\/|=|-/g
    //part 2
    const scanFor=/\*/
    const isDigit=/\d/g

    let finalList=[]
    for (let x=0;x<xLength;x++){
        for (let y=0;y<yLength;y++){
            
            // if (tList[x][y].match(isDigit)){
            //     scanAndReplace(x,y)
            // }
            if (tList[x][y].match(scanFor)){
                compareNeighbour(x,y)
            }
        }
    }

    console.log(finalList)
    let sumTotal=finalList.reduce((prev,curr)=>parseInt(prev) + parseInt(curr),0)
    console.log(sumTotal)

    function lookAhead (x,y){
        if ((y+1) >= yLength){
            return y
        }
        else if (!(tList[x][y+1].match(isDigit))){
            
            return y
            
        }
        else{
            
            return lookAhead(x,y+1)
        }


    }
    function lookBehind (x,y){
        if ((y-1) < 0){
            return y
        }
        else if (!(tList[x][y-1].match(isDigit))){
            
            return y
            
        }
        else{
            return lookBehind(x,y-1)
        }
    }

    function scan(x,y){

        let startIndex = lookBehind(x,y)
        let endIndex = lookAhead(x,y)
        
        return [x,startIndex,endIndex+1]
    }

    function compareNeighbour(x,y){
        const coords =[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0,],[1,1]]
        
        let localCoords=coords.map((cs)=>{
            let xco=x+cs[0]
            let yco=y+cs[1] 
            
            if ( (xco >= 0) && (xco <=xLength) && (yco >= 0) && (yco <=yLength) ){
                
                if( tList[xco][yco].match(isDigit) ) {
                    return scan(xco,yco)             
                 }
            }
            
        })

        let finalCoords=removeLocalDupes(localCoords)
        //part 2
        getGearRatio(finalCoords)
        

        // finalCoords.forEach((eachCo)=>{
        //     //part 1 
        //     //finalList.push(tList[eachCo[0]].slice(eachCo[1],eachCo[2]))
        //     
           
        // })

        }

        
    function getGearRatio(coordPair){
        if (coordPair.length === 2){
        let gear1= tList[coordPair[0][0]].slice(coordPair[0][1],coordPair[0][2])
        let gear2 =tList[coordPair[1][0]].slice(coordPair[1][1],coordPair[1][2])
        finalList.push(parseInt(gear1)*parseInt(gear2))
        }
        }

    

    function removeLocalDupes(coordSet){
        
        const map = new Map();
        coordSet.forEach((item) => 
        {
            if(item){
            map.set(item.join(), item)
        }
        });
        return (Array.from(map.values()));
        
    }
    
}

function outputDay4(inputList){

let winningNumbers =[]
let yourNumbers = []
let score=[]
    inputList.forEach((eachLine)=>{
    eachLine=eachLine.trim()
    eachLine=eachLine.split(':')
    eachLine=eachLine[1].split("|")
    const winningSet= new Set(scrubWhitespace(eachLine[0]))
    const yourSet = new Set(scrubWhitespace(eachLine[1]))
    score.push(Math.pow(2,getIntersectionSize(winningSet,yourSet)-1))

})
//console.log(score)

let sumTotal=score.reduce((prev,curr)=>parseInt(prev) + parseInt(curr),0)
console.log(sumTotal)
function getIntersectionSize(set1,set2){

    let intersect = new Set([...set1].filter(i => set2.has(i)));
    //console.log(intersect)
    return intersect.size
}



}

function scrubWhitespace(alist){
    
    let scrubbedList = alist.split(" ")
    scrubbedList=scrubbedList.filter((item)=>{
        if(item=== "") {return false}
        else {return true}
    })
    
    return scrubbedList
}
    

    
