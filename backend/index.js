const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
var jwt = require("jsonwebtoken");
//const { auth } = require("./middleware");
const axios = require("axios");

const auth = require("./auth");
const bcrypt = require("bcryptjs");
const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
const dbConnect = require("./db/dbconnect");

const ProblemsModel = require("./models/problems");
const SubmissionsModel = require("./models/submissions");
const UserModel = require("./models/User");
const JWT_SECRET = "secret";
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "hello world",
  });
});

// const sampleProblems = [{
// 	title: "Sample Problem",
// 	problemId: "1",
// 	difficulty: "Easy",
//   acceptance: "50.5%",
// 	description: "This is a sample problem description.",
// 	exampleIn: "Input for the sample problem",
// 	exampleOut: "Output for the sample problem",
//   },{ title: "Sample Problem",
//   problemId: "2",
//   difficulty: "Easy",
//   acceptance: "62.3%",
//   description: "This is a sample problem2 description.",
//   exampleIn: "Input for the sample problem2",
//   exampleOut: "Output for the sample problem2",
// },{ title: "Sample Problem3",
// problemId: "3",
// difficulty: "Medium",
// acceptance: "44.6%",
// description: "This is a sample problem3 description.",
// exampleIn: "Input for the sample problem3",
// exampleOut: "Output for the sample problem3",
// },{ title: "Sample Problem6",
// problemId: "6",
// difficulty: "Hard",
// acceptance: "32.8%",
// description: "Tis is a sample problem6 description.",
// exampleIn: "Input for the sample problem6",
// exampleOut: "Output for the sample problem6",
// },{ title: "Sample Problem5",
// problemId: "5",
// difficulty: "Medium",
// acceptance: "38.8%",
// description: "This is a sample problem5 description.",
// exampleIn: "Input for the sample problem5",
// exampleOut: "Output for the sample problem5",
// },{ title: "Sample Problem4",
// problemId: "4",
// difficulty: "Hard",
// acceptance: "36.4%",
// description: "This is a sample problem4 description.",
// exampleIn: "Input for the sample problem4",
// exampleOut: "Output for the sample problem4",
// },
// ];

// async function saveSampleProblems() {
// 	try {
// 	  for (const problemData of sampleProblems) {
// 		const { problemId } = problemData;
// 		const existingProblem = await ProblemsModel.findOne({ problemId });
  
// 		if (existingProblem) {
// 		  console.log(`Problem with problemId '${problemId}' already exists. Skipping...`);
// 		  continue;
// 		}
  
// 		const sampleProblem = new ProblemsModel(problemData);
// 		await sampleProblem.save();
// 		console.log(`Sample problem '${sampleProblem.title}' saved successfully!`);
// 	  }
// 	} catch (error) {
// 	  console.error(error);
// 	}
//   }
  
//   saveSampleProblems();

app.get("/problems", async (req, res) => {
  const problems = await ProblemsModel.find();

  res.json({
    problems: problems,
  });
});

app.get("/problem/:id", async (req, res) => {
  const id = req.params.id;
  const problem = await ProblemsModel.findOne({ problemId: id });

  if (!problem) {
    return res.status(411).json({});
  }
  res.json({
    problem,
  });
});

app.get("/me", auth, async (req, res) => {
  const user = UserModel.find({
    userId : req.userId
  });
  res.json({ user });
});

// app.get("/submissions/:problemId", auth, async (req, res) => {
//   console.log("hello");
//   const problemId = req.params.problemId;
//   console.log(req.id ,problemId);
//   const submissions = await SubmissionsModel.find({
//       problemId : problemId,
//       _id : req.id
//   });
//   console.log(submissions);
//   res.json({
//     submissions,
//   });
// });
app.get("/submissions/:problemId", auth, async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const _id = req.id; // Use req.userId to get the user's ID from the authentication middleware.

    const user = await UserModel.findOne({ _id }); // Assuming 'userId' is the field in UserModel representing user IDs.
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter the user's submissions based on the problemId.
    const userSubmissions = user.submissions.filter(submission => submission.problemId === problemId);
    // console.log(userSubmissions);

    res.status(200).json({ submissions: userSubmissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/submission", auth, async (req, res) => {
  const isCorrect = Math.random() < 0.5;
  // console.log("auth done");
  const problemId = req.body.problemId;
  const submission = req.body.submission;
  // const compilationBackendUrl = 'http://localhost:3010';
  //   // Make an HTTP POST request to the compilation server
  //   const compilationResponse = await axios.post(`${compilationBackendUrl}/compile`, {
  //     code: submission,
  //     language: 'c', // Specify the programming language
  //   });

  //   // Handle the compilation result
  //   if (compilationResponse.status === 200) {
  //     console.log('Compilation successful');
  //     console.log(compilationResponse.data); // You can log the compilation result
  //   } else {
  //     console.error('Compilation Error:', compilationResponse.data);
  //   }
  // console.log(problemId,submission);
  let status = isCorrect ? "WA" : "AC";

  const newSubmission = new SubmissionsModel({
		submission: submission,
		problemId: problemId,
		userId: req.id,
		status: status,
	});
  await newSubmission.save();

      // Retrieve the user from the UserModel
      const user = await UserModel.findOne({ _id: req.id });

      if (user) {
        // Append the new submission to the user's profile
        user.submissions.push(newSubmission);
        await user.save();
      }
      else{
        console.log("not found");
      }

	return res.json({
    status: status,
	});
});

dbConnect();
// async function saveDefaultUserAndSubmission() {
//   try {
//     const existingDefaultUser = await UserModel.findOne({ email: 'default2@example.com' });

//     if (!existingDefaultUser) {
//       const defaultUser = new UserModel({
//         email: 'default2@example.com',
//         password: 'password123', // You can change this to a secure password
//       });

//       await defaultUser.save();
//       console.log('Default user saved successfully!');

//       const defaultSubmission = new SubmissionsModel({
//         submission: 'Default submission content',
//         problemId: '1', // Replace with a valid problemId
//         userId: defaultUser._id, // Link the submission to the default user using the _id field
//         status: 'AC', // Set the status as needed (Accepted, Wrong Answer, etc.)
//       });

//       await defaultSubmission.save();
//       console.log('Default submission saved successfully!');
//     }
//   } catch (error) {
//     console.error('Error saving default user and submission:', error);
//   }
// }

// // Call the function to save the default user and submission during setup
// saveDefaultUserAndSubmission();
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received email:", email);
    console.log("Received password:", password);
    const encryptedPassword =password;

    const existingEmail = await UserModel.findOne({
      email: email,
    });

    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    const newUser = new UserModel({
      email: email,
      password: encryptedPassword,
    });

    await newUser.save();

    console.log("User created!");
    console.log(newUser.toJSON());
    return res.json({
      msg: "Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    console.log(user.id);
    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res.header('auth-token', token).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login failed" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
