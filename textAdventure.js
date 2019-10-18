class Room {
    constructor(name,description,items,north,east,south,west){
    this.name=name //string
    this.description=description //string
    this.items=items //array?
    this.north=north //room object
    this.south=south // 
    this.east=east
    this.west=west
    }
}
    //create rooms that describe the end of a current room, that have no other directions to go, except back.  i.e.,
    // in the woods, reach a point where the thicket is too great and needs a sword to get through!  
    //on the bridge, you need the holy symbol to scare the troll away!  If you go into the cave, you get eaten!
let currentRoom= new Room('temple','a cold stone temple.\ntorches are on either side\nof the doorway','torch','meadow','river','insideTemple','woods')
let insideTemple= new Room('insideTemple','the temple is dimly lit, and quiet;\nbefore you, an altar.\nUpon it is a holy symbol','holy symbol','temple',undefined,undefined,undefined)
let woods = new Room('woods','dark, spooky woods',undefined,'woodsClearing','temple',undefined,undefined)
let temple= new Room('temple','a cold stone temple.\ntorches are on either side\nof the doorway','torch','meadow','river','insideTemple','woods')
let river = new Room('river','a massive, raging river. crossing is not an option',undefined,'riverRocks',undefined,undefined,'temple')
let woodsClearing = new Room('woodsClearing','a clearing in the woods.  In the center, a sword lodged inside a stump','sword','woodsCave','meadow','woods',undefined)
let meadow = new Room('meadow','a quiet green meadow.  peaceful and quiet.',undefined,'meadow2','riverRocks','temple','woodsClearing')
let riverRocks= new Room('riverRocks','a river with a rocky embankment','rock','riverBridge',undefined,'river','meadow')
let woodsCave= new Room('woodsCave','a cave.  you hear low growls from within',undefined,'cave','meadow2','woodsClearing',undefined)
let meadow2= new Room('meadow2','meadow. A large oak tree lies before you',undefined,undefined,'riverBridge','meadow','woodsCave')
let riverBridge = new Room('riverBridge','A troll guards the\nbridge to the east;\nover it, a massive bridge.\n"NONE SHALL PASS," it screams',undefined,'passedBridge',undefined,'riverRocks','meadow2')
let cave = new Room('cave','you stumble upon a hibernating bear',undefined, undefined, undefined, 'woodsCave',undefined)
let passedBridge = new Room('passedBridge','the east side of the river',undefined,undefined,undefined,undefined,'riverBridge')
//let deadBear = new Room('deadBear','Here lies a dead bear. In a cave. Looks like it was sleeping. Hm.',undefined,undefined,undefined,'woodsCave',undefined)
//***IF CREATING A NEW ROOM FROM THE ROOM CONSTRUCTOR CLASS, ADD IT TO THE LOOKUP TABLE BELOW OR IT WILL NOT BE ABLE TO BE DEFINED */
let nextRoom={
    'insideTemple': insideTemple,
    'woods': woods,
    'temple':temple,
    'river': river,
    'woodsClearing': woodsClearing,
    'meadow': meadow,
    'riverRocks':riverRocks,
    'woodsCave': woodsCave,
    'meadow2': meadow2,
    'riverBridge': riverBridge,
    'cave': cave,
    'passedBridge':passedBridge
} //^^^^lookup table!  allows proof of next room existence BEFORE accessing value.  

class Item{
    constructor(name,description){
    this.name=name,
    this.description=description
    }
}
let sword= new Item('sword','a suprisingly sharp blade, considering where you found it')
let holySymbol= new Item('holy symbol','a token of home; wards off fiends\nand other abominable creatures')
let torch= new Item('torch','a small wooden torch\nvery bright when lit')

let hasItem ={
    'sword':sword,
    'holy symbol':holySymbol,
    'torch': torch,
}
let player = {
    inventory:[]
    //hp: 100,
}

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start(){
    console.log('\nValid commands:\n"north", "east","south","west"\n"pick up {item}"\n"use {item}"\n"i" for inventory\n(type "exit" at any time to leave game)\n \n Hello, traveler!');
    let name= await ask("Enter your name to continue on your path, should you so choose. \n>_");
    player.name=name;
    console.log(
 `\nGreetings, ${player.name}. \n
You find yourself 
at the base of the temple.
To the north, a verdant meadow. The temple 
doors to the south, a stream in the east, and
woodland in the distant west`)
action()
} 

async function action(){
    let choice = await ask(`\nwhat would you like to do? \n >_`)
    choice= choice.toLowerCase();
    if (currentRoom.name='riverBridge' && choice=== 'use holy symbol' && player.inventory.includes('holy symbol')){
        console.log('\nThe troll recoils in disgust\nand stumbles off of the bridge\nyou hear a splash below.\nyou move across to')
        riverBridge.description='a clear bridge lies before you'
        riverBridge.east='passedBridge'
        enterRoom('east')
    }
    else if (choice ==='north'|| choice=== 'east' || choice === 'south' || choice ==='west'){
    enterRoom(choice);
    }else if (choice==='pick up holy symbol' && currentRoom.items==='holy symbol'){ //use string literal to personalize item to be picked up?
        player.inventory.push(currentRoom.items)
        console.log(`you picked up the holy symbol`)
        currentRoom.items=undefined
        insideTemple.description= 'the temple is dimly lit, and quiet;\nbefore you, an altar.'
     } else if(choice==='pick up sword'&& currentRoom.items==='sword'){
        player.inventory.push(currentRoom.items)
        console.log(`you picked up the sword`)
        currentRoom.items=undefined
        woodsClearing.description= 'There is a tree stump with a large gash in it.'
    }else if(choice==='i'){
        console.log(player.inventory)
    } else if(choice ===`use sword` && currentRoom.description===cave.description && player.inventory.includes('sword')){
            console.log('You slay the sleeping bear.  How could you.')
            cave.description = 'Here lies a dead bear. In a cave. Looks like it was sleeping. Weird.'
            woodsCave.description='a cave. It is silent'
        }else if (choice==='exit'){
            process.exit()
        } else console.log('***************invalid input****************')
    action();
 }

async function enterRoom(dir){ //dir = north,east,south,west
        if(currentRoom[dir]){
           currentRoom= nextRoom[currentRoom[dir]];
           console.log("\n"+currentRoom.description + '\n');
        } else console.log('\n No. Go somehwere else, dummy')
    }

    /**tweak this to make more sense for the zorkington project
     * make items have a description!  'inspect sword'
     * --------->>>>items should be an array maybe?  or an object with more than one;
     rooms need an inventory! ARRAY
     Inventory, AND instructions
     */