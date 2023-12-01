import { useState } from 'react';
import Button from "./Button";
import Display from "./Display";

export default function Buttons() {
  const [xResult,setxResult] = useState("0");
  const [xMode,setxMode]=useState(2);

  function handleClick(i){
    const operators= "+-x/";
    let button=i;
    let formula=xResult;
    let last = formula.substring(formula.length-1);
    let result=0;
    // C button
    if (button == "C"){
      // switch mode to initial page
      setxResult("0");
      setxMode(1); 
      return;
    }
    // = button
    if (button== "="){
        // remove the last letter if it is an operator
        if (operators.indexOf(last)>-1) { 
            formula=formula.substring(0,formula.length-1);
        }
        formula=formula.replaceAll("x","*"); // change x with * to use eval() function
        result=eval(formula);
        setxResult(result.toString());
        // switch mode to ready for a new calculation.
        setxMode(2);
        return;
    }
    // operator buttons
    if (operators.indexOf(button)>-1){
        if (operators.indexOf(last)>-1){ // replace the last operator with the click button 
            formula=formula.substring(0,formula.length-1);
        }
        setxMode(1);; // this is the new calculation status
        setxResult(formula+button);
        return;
    }
    // first click a number after loading initial page
    if ((last =="0" && formula.length==1)){
        setxResult(button);
        setxMode(1);
        return;
    }
    // numberic buttons
    if (operators.indexOf(button)<0){
        if (xMode==2) { // begin a new calculation
          setxResult(button);
          setxMode(1);
        }else{
          setxResult(xResult+button);
        }
        return;
    }
  }
  return (
    <>
      <Display xResult = {xResult} />
      <div className= "container">

        <Button value={'7'} onButtonClick={() => handleClick('7')} />
        <Button value={'8'} onButtonClick={() => handleClick('8')} />
        <Button value={'9'} onButtonClick={() => handleClick('9')} />
        <Button value={'+'} onButtonClick={() => handleClick('+')} />

        <Button value={'4'} onButtonClick={() => handleClick('4')} />
        <Button value={'5'} onButtonClick={() => handleClick('5')} />
        <Button value={'6'} onButtonClick={() => handleClick('6')} />
        <Button value={'-'} onButtonClick={() => handleClick('-')} />

        <Button value={'1'} onButtonClick={() => handleClick('1')} />
        <Button value={'2'} onButtonClick={() => handleClick('2')} />
        <Button value={'3'} onButtonClick={() => handleClick('3')} />
        <Button value={'x'} onButtonClick={() => handleClick('x')} />

        <Button value={'C'} onButtonClick={() => handleClick('C')} />
        <Button value={'0'} onButtonClick={() => handleClick('0')} />
        <Button value={'='} onButtonClick={() => handleClick('=')} />
        <Button value={'/'} onButtonClick={() => handleClick('/')} />
      </div>
    </>
  );
}


