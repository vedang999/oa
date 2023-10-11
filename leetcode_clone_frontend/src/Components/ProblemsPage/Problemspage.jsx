import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import "./Problemspage.css"
import {backendUrl} from "../constants.js";


const ProblemsPage = () => {
  const [CodeSeg, setCodeSeg] = useState("") ;
  const { pid } = useParams() ;
  const cleanId = pid.substring(1) ;
  const [problem, setProblem] = useState(null);
  const [submission, setSubmission] = useState("");
  const [previousSubmissions, setPreviousSubmissions] = useState([]);

    const init = async () => {
      const response = await fetch(`${backendUrl}/problem/` + cleanId, {
        method: "GET",
      });
      const submissionsResponse = await fetch(`${backendUrl}/submissions/` + cleanId, {
        method: "GET",
        headers: {
          "authorization": `Bearer ${localStorage.getItem('auth-token')}`,
        }
      });
      const json = await response.json();
      const submissionsJson = await submissionsResponse.json();
      console.log(submissionsJson);
      setProblem(json.problem);
      setPreviousSubmissions(submissionsJson.submissions);

    }

  useEffect(() => {
    init();
  }, [])
  // console.log(cleanId) ;
  const handleKey = (event) => {
    if (event.key == "Tab"){
      event.preventDefault() ;
      const { selectionStart , selectionEnd , value } = event.target ;
      const val = value.substring(0,selectionStart) + "\t" + value.substring(selectionStart) ;
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd = selectionStart+1;
    }
    setCodeSeg(event.value) ;
  }
  return (
    <div>

      {
        problem? (
          <div id="problempage" className='flex-row'>
            <div className="ques">
              <h1>{problem.title}</h1> 
               <div className='desc'><h2>Description</h2>
              <p>{problem.description}</p></div>
              <div className='inout'><code>Input : {problem.exampleIn}</code><br/>
              <code>Output : {problem.exampleOut}</code> </div>
            </div>
            <div className="code">
              <h1>Code Here</h1>
              <div className='code-form'>
                <textarea onChange={(e) => setSubmission(e.target.value)} name="SolvedCode" onKeyDown={ (event) => handleKey(event) }></textarea>
                <button type="submit" id="submit" onClick={async () => {
                  console.log(cleanId,submission,localStorage.getItem("auth-token"));
                  const response = await fetch(`${backendUrl}/submission`, {
                    method: "POST",
                    headers: {
                      "authorization": `Bearer ${localStorage.getItem('auth-token')}`,
                      "Content-Type": "application/json", // Set the content type to JSON
                    },
                    
                    body: JSON.stringify({
                      problemId: cleanId,
                      submission: submission
                    })
                  });

                  const json = await response.json();
                  console.log(json);

                }}>SubmitCode</button>
              </div>
            </div>
          </div>
        ) :
        (<div>The searched Question Doesn't exist</div>)
      }
      <div className="previous-submissions">
        <h2>Previous Submissions</h2>
        <ul>
          {previousSubmissions.map((submission) => (
            <li key={submission.createdAt}>
              <p>Timestamp: {submission.createdAt}</p>
              <p>Status: {submission.status === 'AC' ? 'Accepted' : 'Not Accepted'}</p>
              <p>Code: <code>{submission.submission}</code></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  )
}

export default ProblemsPage