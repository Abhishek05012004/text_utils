import React, { useState } from 'react'





export default function TextForm(props) {
    const handleUpClick = () => {
        // console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to upper case", "success");
    }

    const handleLoClick = () => {
        // console.log("Uppercase was clicked" + text);
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lower case", "success");
    }

    const handleCopy = () => {
        var text = document.getElementById("myBox");
        text.select();
        document.getSelection().removeAllRanges();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to clipboard!", "success");
    }

    const handleClearClick = () => {
        // console.log("Uppercase was clicked" + text);
        let newText = '';
        setText(newText)
        props.showAlert("Text cleared", "success");
    }

    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Your message is being spoken", "success");
    }

    const handleOnChange = (event) => {
        // console.log("On Change");
        setText(event.target.value);
    }

    const handleReverse = (event) => {
        /* Convert string to array*/
        let strArr = text.split("");
        /* Reverse array*/
        strArr = strArr.reverse();
        /* Convert array to string*/
        let newText = strArr.join("");
        setText(newText);
        props.showAlert("Your text has been reversed", "success");
    };

    const handleLightTheme = () => {
        document.querySelector('body').style.backgroundColor = "white";
        document.querySelector('body').style.color = "#042743";
        props.showAlert("Light theme is applied", "success");
    }
    const handleDarkTheme = () => {
        document.querySelector('body').style.backgroundColor = "#042743";
        document.querySelector('body').style.color = "white";
        props.showAlert("Dark theme is applied", "success");
    }

    const handleExtraSpaces = ()=>{
    let newText = text.replace(/\s+/g, ' ').trim();
        setText(newText)
        props.showAlert("Extra space is removed", "success");
    }

    const replaceString=()=>{
    let repval=prompt("Enter the word to be replaced:")
    let tobereplaced= new RegExp(repval,'g');
    let toreplace=prompt("Enter the text that you want to replace with:");
    let newText= text.replace(tobereplaced,toreplace);
        setText(newText);
        props.showAlert("String is replaced", "success");
    }

    const capitalFirstLetter = ()=>{
        let words = text.split(" ")
        let uppercaseword = ' '
        words.forEach(element => {
           uppercaseword += element.charAt(0).toUpperCase() + element.slice(1) + " "
        });
        setText(uppercaseword)
        props.showAlert("First letter is set to capital", "success");
    }

    // const handleExtraSpaces = ()=>{
    //     let words = text.split(' ');
    //     let joinedWords = '';
    //     // console.log(words);
    //     words.forEach((elem)=>{
    //         if(elem[0] != undefined){
    //             joinedWords += elem + " ";
    //             console.log(joinedWords);
    //         }
    //     })
    //     setText(joinedWords);
    // }

    
  
    const [text, setText] = useState('');
    // text = 'new text'; //Wrong way to change the state
    // setText = ('new text'); //Wrong way to change the state
    return (
        <>
            <div className="container" style={{color:props.mode ==='light' ? '#042743':'white'}}>
                <h1 className='mb-4'>{props.heading} </h1>
                <div className="mb-3">
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode ==='dark' ? 'black':'white' , color:props.mode ==='light' ? '#042743':'white'}} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleUpClick}>Convert to UpperCase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleLoClick}>Convert to LowerCase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleReverse}>Reverse the Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleLightTheme}>Light mode</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleDarkTheme}>Dark mode</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleExtraSpaces}>Remove extra spaces</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={capitalFirstLetter}>First letter capital</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={replaceString}>Replace string</button>
                <button disabled={text.length===0} type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
            </div>
            <div className="container my-3" style={{color:props.mode ==='light' ? '#042743':'white'}}>
                <h2>Your Text Summary</h2>
                <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length}Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Nothing to preview!"}</p>

            </div>


        </>

      
    
  )
}
