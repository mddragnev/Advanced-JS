function jumpingJimmy(tower, jumpHeight) {
    let height = 0;
    
    for(let level of tower){
        if (level <= jumpHeight ){
            height+= level;
        }
        else{
            break;
        }
        
    }
    return height;

}


jumpingJimmy([3,1,2],3);