import User from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


// logout user
const logout = async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await User.findOne({where:{ phone: phone }});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.token = null;
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};
// user CAN recieve notifactions
const receiveNotifications = async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await User.findOne({where:{ phone: phone }});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.receiveNotifications = true;
    await user.save();
    res.status(200).json({ message: "Notifications enabled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error enabling notifications" });
  }
}

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
};

const singledigit = async (req, res) => {
  const { betDigit, betAmount } = req.body;

  if (betDigit === undefined || betAmount === undefined || typeof betAmount !== 'number') {
    return res.status(400).json({ message: "Invalid request body. Bet digit and bet amount are required." });
  }

  if (typeof betDigit !== 'number' || betDigit < 1 || betDigit > 6) {
    return res.status(400).json({ message: "Invalid bet digit. Bet digit must be between 1 and 6." });
  }

  try {
    const rolledDigit = rollDice();
    let resultMessage = `You bet on ${betDigit}. The dice rolled ${rolledDigit}. `;
    let result = "lose";
    let winnings = 0;

    if (rolledDigit === betDigit) {
      result = "win";
      winnings = betAmount * 5; // Example: 5x winnings
      resultMessage += `You win ${winnings}!`;
    } else {
      resultMessage += "You lose.";
    }

    res.status(200).json({
      message: resultMessage,
      rolledDigit,
      result,
      winnings,
    });
  } catch (error) {
    console.error("Error playing dice game:", error);
    res.status(500).json({ message: "Error playing dice game", error: error.message });
  }
};
// 
// controllers/jodiGameController.js

const rollTwoDice = () => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  return { dice1, dice2, sum: dice1 + dice2 };
};

const jodidigit = async (req, res) => {
  const { betSum, betAmount } = req.body;

  if (betSum === undefined || betAmount === undefined || typeof betAmount !== 'number') {
    console.error("Invalid request body: betSum or betAmount missing or betAmount is not a number.");
    return res.status(400).json({ message: "Invalid request body. Bet sum and bet amount are required." });
  }

  if (typeof betSum !== 'number' || betSum < 2 || betSum > 12) {
    console.error("Invalid bet sum: must be a number between 2 and 12.");
    return res.status(400).json({ message: "Invalid bet sum. Bet sum must be a number between 2 and 12." });
  }

  try {
    const rolledDice = rollTwoDice();
    let resultMessage = `You bet on sum ${betSum}. Dice rolled ${rolledDice.dice1} and ${rolledDice.dice2}, sum ${rolledDice.sum}. `;
    let result = "lose";
    let winnings = 0;

    if (rolledDice.sum === betSum) {
      result = "win";
      winnings = betAmount * 10; // Adjust winnings multiplier as needed
      resultMessage += `You win ${winnings}!`;
    } else {
      resultMessage += "You lose.";
    }

    res.status(200).json({
      message: resultMessage,
      rolledDice,
      result,
      winnings,
    });
  } catch (error) {
    console.error("Error playing jodi game:", error, "Request Body:", req.body);
    res.status(500).json({ message: "Error playing jodi game", error: error.message });
  }
};
// controllers/singlePanaController.js

const generateCard = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  const suit = suits[Math.floor(Math.random() * suits.length)];
  const rank = ranks[Math.floor(Math.random() * ranks.length)];

  const card = `${rank} of ${suit}`;
  console.log(`Generated Card: ${card}`); // Added log
  return card;
};

const singlepatti = async (req, res) => {
  const { betCard, betAmount } = req.body;

  console.log(`Request received for singlepatti game. Bet Card: ${betCard}, Bet Amount: ${betAmount}`); // Added log

  if (betCard === undefined || betAmount === undefined || typeof betAmount !== 'number') {
    console.error("Invalid request body: betCard or betAmount missing or betAmount is not a number.");
    return res.status(400).json({ message: "Invalid request body. Bet card and bet amount are required." });
  }

  if (typeof betCard !== 'string') {
    console.error("Invalid bet card: must be a string.");
    return res.status(400).json({ message: "Invalid bet card. Bet card must be a string." });
  }

  try {
    const rolledCard = generateCard();
    let resultMessage = `You bet on ${betCard}. The card drawn was ${rolledCard}. `;
    let result = "lose";
    let winnings = 0;

    if (rolledCard === betCard) {
      result = "win";
      winnings = betAmount * 52; // Adjust winnings multiplier as needed
      resultMessage += `You win ${winnings}!`;
    } else {
      resultMessage += "You lose.";
    }

    console.log(`Game Result: ${result}. Winnings: ${winnings}`); // Added log

    res.status(200).json({
      message: resultMessage,
      rolledCard,
      result,
      winnings,
    });
  } catch (error) {
    console.error("Error playing single pana game:", error, "Request Body:", req.body);
    res.status(500).json({ message: "Error playing single pana game", error: error.message });
  }
};
export { logout, receiveNotifications, singledigit ,jodidigit,singlepatti };