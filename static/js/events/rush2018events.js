"use strict";

const HOUSE_ADDRESS = "372 Memorial Dr, Cambridge, MA 02139";
const TDC_HOUSE_NAME = "TDC House";
const rushEvents = [{
  name: "TDHouse",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Yes, this event is passed.",
  date: "2018-08-29",
  time: "17:20:00",
  duration: "00:03:00",
  category: ["Other"]
}, {
  name: "Car Smash",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Start off RUSH with our annual TDC CAR SMASH! We'll provide the " + "hammers, bats, and other tools for smashing. Just make sure to bring " + "your inner Hulk.",
  date: "2018-09-01",
  time: "12:00:00",
  duration: "04:00:00",
  category: ["Other"]
}, {
  name: "Dance Lessons with The Dance Crew",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Need to dust off those sweet dance moves before the rush parties? " + "Give us two hours and we'll turn you into a hip hop master. Taught " + "by TDC's finest dancers!",
  date: "2018-09-01",
  time: "20:00:00",
  duration: "02:00:00",
  category: ["Art", "Culture"]
}, {
  name: "TDC presents: FOAM PARTY",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Come to MIT's only annual foam party! Yes, with real foam. Headlined " + "by live music from TDC's Frikin Shark, followed by DJ Fiid and DJ " + "Moonshine. Be sure to bring your favorite swimsuit.",
  date: "2018-09-01",
  time: "22:00:00",
  duration: "03:00:00",
  category: ["Party"]
}, {
  name: "Think, Design, Create: An Intro to Making",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Come discover TDC's maker culture at our very own makerspace! Combine " + "Arduinos, wood and acrylic for a truly amazing experience. You get to " + "keep anything you make!",
  date: "2018-09-02",
  time: "12:00:00",
  duration: "04:00:00",
  category: ["Maker"]
}, {
  name: "X1 Racing",
  location_name: "X1 Racing",
  location: "290 Wood Rd, Braintree, MA 02184",
  description: "Mario Kart not cutting it out for you? Come put your driver skills to " + "the test with the best kart racing experience in New England. Must be " + "18 years old and have a valid US driver's license.",
  date: "2018-09-02",
  time: "16:00:00",
  duration: "04:00:00",
  category: ["Jaunt"]
}, {
  name: "TDC Arcade and Smash Tournament",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Want to try your hand at a brand new Switch and a complete preorder " + "of Super Smash Bros. Ultimate? Enter the tournament for the chance " + "to win! Not good at Smash? We will have other video games for you to " + "play!",
  date: "2018-09-02",
  time: "21:00:00",
  duration: "02:00:00",
  category: ["Casual"]
}, {
  name: "McKevin's Burgers and Shakes",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "What could be better than having your own miniature restaurant at " + "the fraternity? We'll have burgers, wings, milkshakes, fries, the " + "list goes on! This is the best restaurant in Memorial Drive, " + "especially around this time of night. Did I mention everything on " + "the menu is free!? Order online at mckevins.herokuapp.com",
  date: "2018-09-02",
  time: "22:00:00",
  duration: "03:00:00",
  category: ["Dinner", "Food"]
}, {
  name: "Jet Ski and Beach Trip",
  location_name: "Beach",
  location: "???",
  description: "Let’s go to the beach and catch a wave! Come with us to Old Orchard " + "Beach in Maine, where there are roller coasters, arcades, and awesome " + "food. Oh we can't forget about jet skis! Prepare to ride the waves at " + "high speed!",
  date: "2018-09-03",
  time: "09:00:00",
  duration: "08:00:00",
  category: ["Jaunt"]
}, {
  name: "Theta Delta Chi presents: Casino Royale",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Casino Night! Poker, Texas Hold'Em, and Blackjack! Come check it " + "out. Don't know how to play them? We'll show you!",
  date: "2018-09-03",
  time: "21:00:00",
  duration: "02:00:00",
  category: ["Casual"]
}, {
  name: "TDChocolate Factory",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Come to our CHOCOLATE MANIA! We'll have a TON of brownies, cupcakes, " + "milkshakes, and so much more! It's going to get CRAZY!",
  date: "2018-09-03",
  time: "21:00:00",
  duration: "02:00:00",
  category: ["Food", "Other"]
}, {
  name: "Late Night IHOP",
  location_name: "IHOP",
  location: "16 Eliot St #18, Cambridge, MA 02138",
  description: "Want to see what the whole IHOb deal is? Come join us for pancakes " + "and burgers at the #1 place for college late night food binges.",
  date: "2018-09-03",
  time: "23:30:00",
  duration: "01:30:00",
  category: ["Dinner", "Food"]
}, {
  name: "Paintball",
  location_name: "Boston Paintball, Ashland",
  location: "120 Pond St, Ashland, MA 01721",
  description: "Come with us to Boston Paintland Ashland, where we will duke it out " + "in Apocalypse City. Only the strongest will survive!",
  date: "2018-09-04",
  time: "11:45:00",
  duration: "05:00:00",
  category: ["Jaunt"]
}, {
  name: "Steak and Lobster",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "The coursework of champions requires the banquet of champions. Come " + "enjoy a final feast before you're swamped with psets",
  date: "2018-09-04",
  time: "18:00:00",
  duration: "02:00:00",
  category: ["Dinner"]
}, {
  name: "Target Run",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "The semester starts the next day so get your last minute back to " + "school specials out of the way. While supplies last!",
  date: "2018-09-04",
  time: "20:00:00",
  duration: "02:00:00",
  category: ["Jaunt"]
}, {
  name: "Midnight Sailing",
  location_name: "MIT Sailing Pavilion",
  location: HOUSE_ADDRESS,
  description: "Need to soothe your nerves before the start of the semester? Come " + "with us for a relaxing night on the Charles River.",
  date: "2018-09-04",
  time: "22:00:00",
  duration: "02:00:00", // todo - does it end at 12pm or 12am?
  category: ["Athletic", "Sport"]
}, {
  name: "Escape the Room",
  location_name: "Escape the Room",
  location: "33 West St, Boston, MA 02111",
  description: "Want to escape that 8.01 lecture you that has you struggling? We " + "got you covered with Escape the Room.",
  date: "2018-09-05",
  time: "17:30:00",
  duration: "04:30:00",
  category: ["Jaunt"]
}, {
  name: "Late Night Buffet",
  location_name: TDC_HOUSE_NAME,
  location: HOUSE_ADDRESS,
  description: "Come enjoy a late night buffet filled with burgers, milkshakes, " + "and wings! You know, just the usual.",
  date: "2018-09-05",
  time: "22:00:00",
  duration: "02:00:00",
  category: ["Dinner"]
}, {
  name: "Boat Cruise (Invite Only)",
  location_name: "Boston Harbor",
  location: "1 Seaport Ln, Boston, MA 02210",
  description: "Hope you are enjoying your first week of classes! But put that " + "aside for now, it’s time to get dressed as we gather on a boat and " + "cruise around the Boston Harbor in style.",
  date: "2018-09-06",
  time: "18:00:00",
  duration: "05:00:00",
  category: ["Jaunt"]
}, {
  name: "Bid Dinner (Invite Only)",
  location_name: "Fogo de Chao",
  location: "200 Dartmouth St, Boston, MA 02116",
  description: "Come join us for a special dinner. Enjoy Boston's best desserts, " + "appetizers and entrees all in one night!",
  date: "2018-09-06",
  time: "17:00:00",
  duration: "04:00:00",
  category: ["Dinner", "Food"]
}];