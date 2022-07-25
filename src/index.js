import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import FlipMove from "react-flip-move";
import { Leaderboard } from '../src/database';
import style from '../src/style.css';

function sortData(data) {
  return data.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score;
    } else {
      return b.score - a.score;
    }
  })
}

const ListShuffler = () => {
  var [data, setData] = useState(Leaderboard);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      let mydata = data;
      for (let v in mydata) {
        mydata[randomIntFromInterval(0, 9)].score = randomIntFromInterval(10000, 99999)
        break;
      }
      mydata = sortData(mydata);
      setData(mydata);
      setCount(prevCount => prevCount + 1);
    }, 2500);
  }, []);

  return (
    <React.Fragment>
      <ul className="listing">
        <FlipMove
          staggerDelayBy={150}
          appearAnimation="accordionVertical"
          enterAnimation="fade"
          leaveAnimation="fade"
        >
          {
            data.map((d, index) => (
              <li key={d.userID} className="leaderboard">
                <div>
                  <div className="num_list">
                    <span>{index + 1}</span>
                    <mark className='d-flex flex-row'>
                      <div>
                        <img className='img-fluid img-thumbnail img-profile' src={d.picture} alt="" />
                      </div>
                      <div className='ps-3'>
                        {d.displayName}
                      </div>
                    </mark>
                  </div>
                  <small style={{'color':'red'}}>
                    {d.score}pt
                  </small>
                </div>
              </li>
            )
            )
          }

        </FlipMove>
      </ul>
    </React.Fragment>
  );
};
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

ReactDOM.render(<ListShuffler />, document.querySelector("#root"));
