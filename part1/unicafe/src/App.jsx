import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({text, value}) => {
  if(text.toLowerCase().includes('percent') === true){
    return(
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
  else{
    return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const Statistics = ({statistic}) => {
  if(statistic.total === 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else{
    return(
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text='Good:' value={statistic.good}/>
            <StatisticsLine text='Neutral:' value={statistic.neutral}/>
            <StatisticsLine text='Bad:' value={statistic.bad}/>
            <StatisticsLine text='Total:' value={statistic.total}/>
            <StatisticsLine text='Average:' value={statistic.average}/>
            <StatisticsLine text='Percent Positive:' value={statistic.posPercent}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [average, setAverage] = useState(0);
  const [posPercent, setPosPercent] = useState(0);


  const getAverage = (array) => {
    let length = array.length;
    let sum = 0;
    for (let i=0; i < array.length; i++){
      sum += array[i];
    }
    let calc = sum / length;
    setAverage(calc)
  }

  const getPositivePercent = (array) => {
    let positive = 0;
    for(let i=0; i < array.length; i++){
      if(array[i] === 1){
        positive+=1;
      }
    }

    let calc = (positive / array.length)*100;
    setPosPercent(calc);
  }
  
  const handleGoodClick = () => {
    const updatedAll = allClicks.concat(1);
    setAll(updatedAll);
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + bad + neutral);
    getAverage(updatedAll);
    getPositivePercent(updatedAll);
  };

  const handleNeutralClick = () => {
    const updatedAll = allClicks.concat(0);
    setAll(updatedAll);
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(updatedNeutral + bad + good);
    getAverage(updatedAll);
    getPositivePercent(updatedAll);
  };

  const handleBadClick = () => {
    const updatedAll = allClicks.concat(-1);
    setAll(updatedAll);
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(updatedBad + good + neutral);
    getAverage(updatedAll);
    getPositivePercent(updatedAll);
  };


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Statistics statistic={{good: good, bad: bad, neutral: neutral, total: total, average: average, posPercent: posPercent}}/>
    </div>
  );
};

export default App;
