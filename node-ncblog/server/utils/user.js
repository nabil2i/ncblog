import User from "../models/user.js";

export const makeUsername = async (name) => {
  const username = name.split(' ').join('').toLowerCase();

  if (!(await usernameExists(username))) {
    return username;
  } else {
    const randomUsername = username + Math.random().toString(9).slice(-4);
    // const randomUsername = username + Math.floor(Math.random() * 1000);
    return makeUsername(randomUsername);
  }
}

export const makeNames = (name) => {
  const parts = name.split(' ')
  const firstname = parts[0];
  const lastname = parts.slice(1).join(' ');
  return {
    firstname, lastname
  }
}

async function usernameExists(username) {

  const user = await User.findOne({ username }).lean().exec();

  return user ? true : false
}


export const generatePassword = () => {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
}