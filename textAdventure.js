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
let currentRoom= new Room('temple','a cold stone temple.\ntorches are on either side\nof the doorway.\nthere are steps leading in',
    ['torch','torch'],'meadow','river','insideTemple','woods')
let insideTemple= new Room('insideTemple','the temple is dimly lit, and quiet;\nbefore you, an altar.\nUpon it is a holy symbol',
    ['holy symbol'],'temple',undefined,undefined,undefined)
let woods = new Room('woods','dark, spooky woods',
    [],'woodsClearing','temple',undefined,undefined)
let temple= new Room('temple','a cold stone temple.\ntorches are on either side\nof the doorway',
    ['torch','torch'],'meadow','river','insideTemple','woods')
let river = new Room('river','a massive, raging river. crossing is not an option',
    [],'riverRocks',undefined,undefined,'temple')
let woodsClearing = new Room('woodsClearing','a clearing in the woods.  In the center, a sword lodged inside a stump',
    ['sword'],'woodsCave','meadow','woods',undefined)
let meadow = new Room('meadow','a quiet green meadow.  peaceful and green.\n It continues north.  To the east is a river.\nin the west, woods. ',
    [],'meadow2','riverRocks','temple','woodsClearing')
let riverRocks= new Room('riverRocks','a river with a rocky embankment',
    ['rock','rock','rock','rock'],'riverBridge',undefined,'river','meadow')
let woodsCave= new Room('woodsCave','a cave.  you hear low growls from within',
    [],'cave','meadow2','woodsClearing',undefined)
let meadow2= new Room('meadow2','meadow. A large oak tree lies before you.\nthere is a sign nailed to it.',
    [],undefined,'riverBridge','meadow','woodsCave')
let riverBridge = new Room('riverBridge','A troll guards the\nbridge to the east;\nover it, a massive bridge.\n"NONE SHALL PASS," it screams',
    [],undefined,undefined,'riverRocks','meadow2')
let cave = new Room('cave','The cave is very dark.  The growling is much louder',
    [], undefined, undefined, 'woodsCave',undefined)
let passedBridge = new Room('passedBridge','the east side of the river',
    [],undefined,'eastPath',undefined,'riverBridge')
let eastPath= new Room('eastPath','the smell of pie draws you eastward',
    [],undefined,'grandmasHouse',undefined,'passedBridge')
let grandmasHouse= new Room('grandmasHouse','A familiar house appears on the horizon.\nthe smell of delicious pie is overwhelming.  You walk up to the front door.("enter" or "open door" to enter)',
    [],undefined,'winRoom',undefined,'eastPath')
let winRoom= new Room('winRoom','THE SMELL OF PIE IS EVERYWHERE!! BLUEBERRY, STRAWBERRY, CHERRY, PEACH!\n Granny greets you with a smile\n"come in, deary!  hope you saved room for dessert!" YOU DID IT! NOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOM',[],undefined,undefined,undefined,'grandmasHouse')
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
    'passedBridge':passedBridge,
    'eastPath': eastPath,
    'grandmasHouse': grandmasHouse,
    'winRoom':winRoom
} //^^^^lookup table!  allows proof of next room existence BEFORE accessing value.  

class Item{
    constructor(name,description){
    this.name=name,
    this.description=description
    }
}
let sword= new Item('sword','\na suprisingly sharp blade, considering where you found it')
let holySymbol= new Item('holy symbol','a token of home; wards off evil')
let torch= new Item('torch','\na small wooden torch.  very bright when lit')

let hasItem ={
    'sword':sword,
    'holy symbol':holySymbol,
    'torch': torch,
}
let player = {
    inventory:[]

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
    console.log('\nValid commands:\n"north", "east","south","west"\n"pick up {item}"\n"use {item}"\n"i" for inventory\n"examine {item}"\n"drop {item}"\n"r" for room items\n(type "exit" at any time to leave game,\n or "c" to view controls)\n \n Hello, traveler!');
    let name= await ask("Enter your name to continue on your path, should you so choose. \n>_");
    player.name=name;
    console.log(
 `\nGreetings, ${player.name}. \n
You find yourself 
at the base of the temple.
To the north, a verdant meadow. The temple 
doors to the south, a stream in the east, and
woodland in the distant west.  Better get to 
grandma's before that pie gets cold.  Where was 
her place again?`)
action()
} 

async function action(){
    let choice = await ask(`\nwhat would you like to do? \n >_`)
    choice= choice.toLowerCase();

    if (choice==='east'&& currentRoom.description==='A troll guards the\nbridge to the east;\nover it, a massive bridge.\n"NONE SHALL PASS," it screams'){
        console.log('The troll gobbled you up!\nif only you had USED something to protect yourself...\n\n*GAME OVER*')
        process.exit();
    }   
    if (choice ==='north'|| choice=== 'east' || choice === 'south' || choice ==='west'){
        enterRoom(choice);

    }else if(choice==='i'){
    for(let n in player.inventory){
        console.log(player.inventory[n].name);
    }
}   else if(choice==='r'){
        console.log(currentRoom.items)
    }else if(choice==='c'){
         console.log('Valid commands:\n"north", "east","south","west"\n"pick up {item}"\n"use {item}"\n"i" for inventory\n"examine {item}"\n"drop {item}"\n"r" for room items\n(type "exit" at any time to leave game,\nor "c" to view controls)\n')
    }else if(choice.includes('examine')){
         examine(hasItem[choice.replace('examine ','')])
    }else if(choice.includes('drop')){
        drop(hasItem[choice.replace('drop ','')])


    }else if (choice ==='pick up holy symbol'){ 
        pickup('holy symbol');
        insideTemple.description= 'the temple is dimly lit, and quiet;\nbefore you, an altar.\nthere is a spot where the holy symbol was' //pet the bear dammit!, over the river=gramma's pie= win condition!
    } else if(choice==='pick up sword'){
        pickup('sword')
        woodsClearing.description= 'There is a tree stump with a large gash in it.'
    }else if(choice==='pick up torch'& temple.items.length>1 && currentRoom.name===temple.name){
            pickup('torch')
            temple.description= 'a cold stone temple.  there is one torch left'
    }else if(choice==='pick up torch'& temple.items.length===1 && currentRoom.name===temple.name){
                pickup('torch')
                temple.description= 'a cold stone temple.'
    }else if (choice.includes('pick up')){
            pickup(choice.replace('pick up ',''))
    }else if(choice ==='use torch' && cave.description==='The cave is very dark.  The growling is much louder'&& currentRoom.name===cave.name){
        console.log("light fills the room.  You see a hibernating bear")
        cave.description='a sleeping bear.  It is very cute'
    }else if (choice=== 'use holy symbol' &&currentRoom.name==='riverBridge' && player.inventory.includes(holySymbol)){
            console.log('\nThe troll recoils in disgust\nand stumbles off of the bridge\n"AW DAAAAAaaaaaaannnnnnngggggg....."\nyou hear a splash below')
            riverBridge.description='a clear bridge lies before you'
            console.log(riverBridge.description)
            riverBridge.east='passedBridge'
            action();
    }else if(choice ===`use sword` && currentRoom.name===cave.name && player.inventory.includes(sword)){
            console.log('You slayed a sweet little bear.  How could you.')
            cave.description = 'Here lies a dead bear. In a cave. Looks like it was sleeping. Weird.'
            woodsCave.description='a cave. It is silent'
    }else if(choice==='use sword' && currentRoom.description!=='a clear bridge lies before you'&& player.inventory.includes(sword)){
        console.log('\nYou run the troll through with your sword\n but the wounds close up quickly\n "HAHAHA," it says, "YOUR MORTAL WEAPONS WILL NOT WORK ON ME"\nit throws you back and resumes its previous stance')

    }else if(choice==='pet bear' && currentRoom.description==='a sleeping bear.  It is very cute'){
       console.log('the bear begins to stir.  It awakens and looks\ncuriously at you')
       cave.description='The bear is awake, and looks\ncuriously at you.'
    }else if(choice==='pet bear'&& currentRoom.description==='The bear is awake, and looks\ncuriously at you.'){
        console.log("the bear's hind leg begins to shake uncontrollably.\nhe gives you a big slobbery kiss")
        cave.description='a happy bear :)'
    }else if(choice==='pet bear'&& currentRoom.name==cave.name&&currentRoom.description!=='The cave is very dark.  The growling is much louder'){
        console.log("the bear licks your hand as you pet it")
        cave.description='a happy bear :)'
    }else if(choice==='read sign' && currentRoom.name===meadow2.name){
        console.log('The sign reads:\n <----Bear Cave  Grandmas Pie Palace---->')
    }else if (choice==='enter' || 'open door' &&currentRoom.name===grandmasHouse.name){
        enterRoom('east');
        if(currentRoom.name===winRoom.name){
            console.log(`Thanks for playing, ${player.name}!`)
            process.exit();
        }
    }else if (choice==='exit'){
            process.exit()
    }else console.log("\nSorry, I don't understand")
    action();
 }

async function enterRoom(dir){ //dir = north,east,south,west
        if(currentRoom[dir]){
           currentRoom= nextRoom[currentRoom[dir]];
           console.log("\n"+currentRoom.description + '\n');
        } else console.log('\n Cannot go that way')
}
async function pickup(item){
    if(currentRoom.items.includes(item)){
        let i= currentRoom.items.indexOf(item);
        console.log(`\nyou picked up ${currentRoom.items[i]}`);
        player.inventory.push(hasItem[currentRoom.items[i]]);
        currentRoom.items.splice(i,1);
    } else console.log('\nitem unavailable')
}
async function drop(item){
if (player.inventory.includes(item)){
    let i= player.inventory.indexOf(item);
    console.log(`\nyou dropped ${player.inventory[i].name}`);
    currentRoom.items.push(player.inventory[i].name.toString())
    console.log(currentRoom.items)
    player.inventory.splice(i,1);
    }
}
async function examine(item){
    if (player.inventory.includes(item)){
        console.log(item.description)
    } else console.log("\nYou don't have that item")
}



    /**tweak this to make more sense for the zorkington project
     * make items have a description!  'inspect sword'
     * --------->>>>items should be an array maybe?  or an object with more than one;
     rooms need an inventory! ARRAY
     Inventory, AND instructions
     maybe roses at a win condition
     
     */