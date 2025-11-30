import { useState } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Label, Input, InputGroup, Alert } from 'reactstrap';

import './index.css';

// Custom hook to handle input
function useCalc() {
  const [timeHrs, setTimeHrs] = useState(""); // State hook for timeHrs
  const [timeMin, setTimeMin] = useState(""); // State hook for timeMin
  const [timeSec, setTimeSec] = useState(""); // State hook for timeSec
  const [dist, setDist] = useState(""); // State hook for dist
  const [paceMin, setPaceMin] = useState(""); // State hook for paceMin
  const [paceSec, setPaceSec] = useState(""); // State hook for paceSec
  const [distUnit, setDistUnit] = useState("mi"); // State hook for distUnit
  const [paceUnit, setPaceUnit] = useState("min/mi"); // State hook for paceUnit
  const [invalidInput, setInvalidInput] = useState(false); // State hook for invalidInput

  // Called from calc onSubmit
  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    convert();
  }

  function handleTimeHrsChange(event) {
    event.persist();
    setTimeHrs(event.target.value);
  }
  function handleTimeMinChange(event) {
    event.persist();
    setTimeMin(event.target.value);
  }
  function handleTimeSecChange(event) {
    event.persist();
    setTimeSec(event.target.value);
  }
  function handleTimeReset(event) {
    event.persist();
    setTimeHrs("");
    setTimeMin("");
    setTimeSec("");
  }
  function handleDistChange(event) {
    event.persist();
    setDist(event.target.value);
  }
  function handleDistReset(event) {
    event.persist();
    setDist("");
  }
  function handlePaceMinChange(event) {
    event.persist();
    setPaceMin(event.target.value);
  }
  function handlePaceSecChange(event) {
    event.persist();
    setPaceSec(event.target.value);
  }
  function handlePaceReset(event) {
    event.persist();
    setPaceMin("");
    setPaceSec("");
  }
  function handleDistUnitChange(unit) { setDistUnit(unit); }
  function handlePaceUnitChange(unit) { setPaceUnit(unit); }
  function handleInvalidInput() {
    setInvalidInput(!invalidInput);
  }

  function convert() {
    // Force integer type
    let tHrs = timeHrs*1;
    let tMin = timeMin*1;
    let tSec = timeSec*1;
    let d = dist*1;
    let pMin = paceMin*1;
    let pSec = paceSec*1;
    let p = (pMin*60)+pSec;
    let t = tHrs*60*60 + tMin*60 + tSec;

    // Check for valid input
    if (t === 0 && d === 0 && p === 0) {
      handleInvalidInput();
      return;
    }

    // Calculate time
    if (t === 0) {
      // Convert distance to miles
      if (distUnit === "m") {
        d = d*0.000621371;
      } else if (distUnit === "km") {
        d = d*1000;
        d = d*0.000621371;
      }

      // Convert pace to sec/mi
      if (paceUnit === "min/km") {
        p = p/0.621371;
      }

      let t = d*p;
      if (t >= 60) {
        tSec = t % 60;
        tMin = Math.floor(t / 60);

        if (tMin >= 60) {
          tHrs = Math.floor(tMin / 60);
          tMin = tMin % 60;

          setTimeHrs(tHrs);
          setTimeMin(tMin);
          setTimeSec(Number.parseFloat(tSec).toFixed(2));
        } else {
          setTimeMin(tMin);
          setTimeSec(Number.parseFloat(tSec).toFixed(2));
        }
      } else {
        setTimeSec(Number.parseFloat(t).toFixed(2));
      }
    }

    // Calculate pace
    if (pMin === 0 && pSec === 0) {
      // Convert distance to miles
      if (distUnit === "m") {
        d = d*0.000621371;
      } else if (distUnit === "km") {
        d = d*1000;
        d = d*0.000621371;
      }

      p = t/d;

      if (paceUnit === "min/km") {
        p = p*0.621371;
      }

      if (t >= 60) {
        pSec = p % 60;
        pMin = Math.floor(p / 60);

        setPaceMin(pMin);
        setPaceSec(Number.parseFloat(pSec).toFixed(2));
      } else {
        setPaceSec(Number.parseFloat(p).toFixed(2));
      }
    }

    // Calculate distance
    if (d === 0) {
      // Convert pace to sec/mi
      if (paceUnit === "min/km") {
        p = p/0.621371;
      }

      d = t/p;

      if (distUnit === "m") {
        d = d/0.000621371;
      } else if (distUnit === "km") {
        d = d/0.000621371;
        d = d/1000;
      }

      setDist(Number.parseFloat(d).toFixed(2));
    }
  }

  // Returns from the custom hook
  return {
    timeHrs, handleTimeHrsChange,
    timeMin, handleTimeMinChange,
    timeSec, handleTimeSecChange, handleTimeReset,
    dist, handleDistChange, handleDistReset,
    paceMin, handlePaceMinChange,
    paceSec, handlePaceSecChange, handlePaceReset,
    distUnit, handleDistUnitChange,
    paceUnit, handlePaceUnitChange,
    handleSubmit, invalidInput, handleInvalidInput
  };
}

function Calculator(props) {
  const {timeHrs, handleTimeHrsChange, timeMin, handleTimeMinChange, timeSec, handleTimeSecChange, handleTimeReset,
    dist, handleDistChange, handleDistReset, paceMin, handlePaceMinChange, paceSec, handlePaceSecChange, handlePaceReset,
    distUnit, handleDistUnitChange, paceUnit, handlePaceUnitChange, handleSubmit, invalidInput, handleInvalidInput} = useCalc();

  return (
    // Renders the calculator
    <div>
      <h1 className="titleText">Pace Calculator <i className="mx-2 fas fa-running"></i></h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Time</Label>
          <InputGroup>
            <Input value={timeHrs} onChange={handleTimeHrsChange} name="timeHrs" type="number" placeholder="Hrs" />
            <h3>:</h3>
            <Input value={timeMin} onChange={handleTimeMinChange} name="timeMin" type="number" placeholder="Min" />
            <h3>:</h3>
            <Input value={timeSec} onChange={handleTimeSecChange} name="timeSec" type="number" placeholder="Sec" />
            <Button className="resetButton" color="danger" onClick={handleTimeReset}>Reset</Button>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Distance</Label>
          <InputGroup>
            <Input value={dist} onChange={handleDistChange} name="dist" type="number" placeholder="Distance" />
            <ButtonGroup className="unitButton">
              <Button color="secondary" onClick={() => handleDistUnitChange("mi")} active={distUnit === "mi"}>mi</Button>
              <Button color="secondary" onClick={() => handleDistUnitChange("m")} active={distUnit === "m"}>m</Button>
              <Button color="secondary" onClick={() => handleDistUnitChange("km")} active={distUnit === "km"}>km</Button>
            </ButtonGroup>
            <Button className="resetButton" color="danger" onClick={handleDistReset}>Reset</Button>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label>Pace</Label>
          <InputGroup>
            <Input value={paceMin} onChange={handlePaceMinChange} name="paceMin" type="number" placeholder="Min" />
            <h3>:</h3>
            <Input value={paceSec} onChange={handlePaceSecChange} name="paceSec" type="number" placeholder="Sec" />
            <ButtonGroup className="unitButton">
              <Button color="secondary" onClick={() => handlePaceUnitChange("min/mi")} active={paceUnit === "min/mi"}>min/mi</Button>
              <Button color="secondary" onClick={() => handlePaceUnitChange("min/km")} active={paceUnit === "min/km"}>min/km</Button>
            </ButtonGroup>
            <Button className="resetButton" color="danger" onClick={handlePaceReset}>Reset</Button>
          </InputGroup>
        </FormGroup>

        <InputGroup>
            <Button className="convertButton" type="submit" color="primary">Convert</Button>
            { invalidInput && <Alert className="invalidInputAlert" color="danger">Invalid input. You must provide two values. <span className="closeAlert" onClick={handleInvalidInput}>&#x2715;</span></Alert> }
          </InputGroup>
      </Form>
    </div>
  );
}

export default Calculator;
