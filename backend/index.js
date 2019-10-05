async function createFakeUsers() {
  let annieUser = new User({
    firstName: "annie",
    lastName: "su",
    email: "annie@gmail.com",
    password: "hello"
  });
  await annieUser.save();
  console.log("Added annie");

  let gautamUser = new User({
    firstName: "gautam",
    lastName: "narayan",
    email: "gautam@gmail.com",
    password: "goodbye"
  });
  await gautamUser.save();
  console.log("Added gautaum");

  let katieUser = new User({
    firstName: "katie",
    lastName: "jiang",
    email: "katie@gmail.com",
    password: "helloooooo"
  });
  await katieUser.save();
  console.log("Added katie");
}
